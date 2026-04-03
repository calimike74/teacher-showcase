import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
