import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const TEACHER_EMAIL = process.env.TEACHER_EMAIL;
const FROM = process.env.RESEND_FROM_EMAIL || 'Music Tech Studio <noreply@musictechstudio.co.uk>';

// GET — fetch flags. If student+video params, fetch that student's flags for a video.
// Otherwise fetch all (for teacher dashboard).
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const studentName = searchParams.get('student');
  const videoId = searchParams.get('video');

  let query = supabase.from('help_flags').select('*');

  if (studentName && videoId) {
    query = query.eq('student_name', studentName).eq('video_id', videoId);
  }

  const { data, error } = await query.order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// POST — create a flag
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { student_name, video_id, video_title, exam_year, step_index, step_text } = body;

  if (!student_name || !video_id || !video_title || !exam_year) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const { data, error } = await supabase.from('help_flags').insert({
    student_name,
    video_id,
    video_title,
    exam_year,
    step_index: step_index ?? null,
    step_text: step_text ?? null,
  }).select().single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Send instant email notification to teacher
  if (resend && TEACHER_EMAIL) {
    const stepDetail = step_text
      ? `<strong>Step ${(step_index ?? 0) + 1}:</strong> ${step_text}`
      : '<strong>Entire question</strong>';

    resend.emails.send({
      from: FROM,
      to: TEACHER_EMAIL,
      subject: `🚩 ${student_name} needs help — ${video_title} (${exam_year})`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 500px;">
          <h2 style="color: #1a1a2e; margin-bottom: 4px;">${student_name} flagged a question</h2>
          <p style="color: #666; margin-top: 0;">${video_title} — ${exam_year}</p>
          <div style="background: #fff5f5; border-left: 4px solid #e11d48; padding: 12px 16px; border-radius: 4px;">
            ${stepDetail}
          </div>
          <p style="margin-top: 16px;">
            <a href="https://musictechstudio.co.uk/flags" style="color: #C5A855; text-decoration: underline;">View all flags</a>
          </p>
        </div>
      `,
    }).catch(() => {}); // fire-and-forget, don't block the response
  }

  return NextResponse.json(data);
}

// DELETE — remove a flag (unflag)
export async function DELETE(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const id = searchParams.get('id');

  if (!id) return NextResponse.json({ error: 'Missing flag id' }, { status: 400 });

  const { error } = await supabase.from('help_flags').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// PATCH — resolve/unresolve a flag
export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const { id, resolved } = body;

  if (!id || typeof resolved !== 'boolean') {
    return NextResponse.json({ error: 'Missing id or resolved' }, { status: 400 });
  }

  const { error } = await supabase.from('help_flags').update({ resolved }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
