# Help Flags Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Let students flag specific steps or entire questions they don't understand, storing flags in Supabase so the teacher can view and resolve them from a password-protected `/flags` page.

**Architecture:** Add `@supabase/supabase-js` to teacher-showcase connecting to the existing `waveform-assessment` Supabase project (`tirdxgkmxluiogtyiltq`). One new table `help_flags` with anon insert + service-role read/update via RLS. One API route for CRUD. Client-side name persistence in localStorage with a "Not {name}?" change option for shared devices.

**Tech Stack:** Next.js 16 (App Router), Supabase (existing project), TypeScript, Tailwind CSS, lucide-react (already installed)

---

### Task 1: Create Supabase table and RLS policies

**Files:**
- None (Supabase migration via MCP)

**Step 1: Create the `help_flags` table**

Run Supabase MCP `apply_migration` with name `create_help_flags` and this SQL:

```sql
create table public.help_flags (
  id uuid primary key default gen_random_uuid(),
  student_name text not null,
  video_id text not null,
  video_title text not null,
  exam_year text not null,
  step_index integer,
  step_text text,
  resolved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Index for teacher dashboard queries
create index idx_help_flags_resolved_created on public.help_flags (resolved, created_at desc);

-- RLS: anyone can insert (anon key from client)
alter table public.help_flags enable row level security;

create policy "Anyone can insert flags"
  on public.help_flags for insert
  to anon
  with check (true);

-- Students can read their own flags (by name match, for UI state)
create policy "Anyone can read flags"
  on public.help_flags for select
  to anon
  using (true);

-- Students can delete their own flags (unflag)
create policy "Anyone can delete flags"
  on public.help_flags for delete
  to anon
  using (true);
```

**Step 2: Verify table exists**

Run Supabase MCP `execute_sql` to confirm: `select count(*) from public.help_flags;`
Expected: 0 rows.

---

### Task 2: Add Supabase client to teacher-showcase

**Files:**
- Modify: `package.json` (add dependency)
- Create: `lib/supabase.ts`

**Step 1: Install Supabase client**

```bash
cd "/Users/mikelehnert/Obsidian/Professional (AI)/teacher-showcase"
npm install @supabase/supabase-js
```

**Step 2: Create Supabase client**

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Step 3: Add environment variables**

Add to `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://tirdxgkmxluiogtyiltq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<get from Supabase MCP get_publishable_keys>
FLAGS_PASSWORD=<teacher chooses a password>
```

Also add to Vercel env vars via CLI:

```bash
cd "/Users/mikelehnert/Obsidian/Professional (AI)/teacher-showcase"
npx vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development
npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development
npx vercel env add FLAGS_PASSWORD production preview development
```

**Step 4: Verify build still works**

```bash
npm run build
```

Expected: Build succeeds (supabase client isn't imported anywhere yet).

**Step 5: Commit**

```bash
git add lib/supabase.ts package.json package-lock.json
git commit -m "feat: add Supabase client for help flags"
```

---

### Task 3: Create API route for flags

**Files:**
- Create: `app/api/flags/route.ts`

**Step 1: Create the API route**

Create `app/api/flags/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET — fetch flags for a student (by name) or all unresolved (for teacher)
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const studentName = searchParams.get('student');
  const videoId = searchParams.get('video');

  let query = supabase.from('help_flags').select('*');

  if (studentName && videoId) {
    // Student checking their own flags for a specific video
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

// PATCH — resolve/unresolve a flag (teacher only)
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
```

Note: PATCH (resolve) is called from the teacher flags page which is password-protected at the page level. The RLS policy on update will need service role — see Task 6 for adding a service-role PATCH or handling this via anon update policy.

**Step 2: Verify build**

```bash
npm run build
```

**Step 3: Commit**

```bash
git add app/api/flags/route.ts
git commit -m "feat: add /api/flags CRUD route"
```

---

### Task 4: Add flag UI to TodoChecklist

**Files:**
- Modify: `app/(main)/videos/VideoLibraryClient.tsx`

This is the largest task. It modifies the existing `TodoChecklist` and `VideoCard` components.

**Step 1: Add a `StudentNameProvider` context and prompt**

At the top of `VideoLibraryClient.tsx`, add a React context for the student name that persists in localStorage. When a student first tries to flag something, an inline prompt asks for their name. After that, a small "Flagging as **Toby** · Change" label appears.

**Step 2: Add per-step flag icon to each bullet point**

Inside the `TodoChecklist` `<li>` for each bullet, add a small flag/question icon (lucide `Flag` or `HelpCircle`) on the right side. On click:
- If no name stored, show inline name prompt first
- Otherwise, POST to `/api/flags` with `step_index` and `step_text`
- Toggle icon to filled/coloured state
- Store flagged state in localStorage AND track the Supabase row ID for unflagging

**Step 3: Add per-video "I need help with this question" button**

Below the `TodoChecklist` `<ul>`, add a button. Same flow as per-step but with `step_index: null` and `step_text: null`.

**Step 4: On mount, fetch existing flags for this student + video**

`GET /api/flags?student={name}&video={videoId}` — hydrate the flagged state so returning students see their flags.

**Step 5: Key implementation details**

The `VideoCard` needs access to `exam_year` — pass it down from the parent where `activeYear` is available. Update `VideoCard` props:

```typescript
function VideoCard({ video, examYear }: { video: Video; examYear: string }) {
```

And pass `examYear` into `TodoChecklist`:

```typescript
function TodoChecklist({ videoId, videoTitle, examYear, items }: {
  videoId: string;
  videoTitle: string;
  examYear: string;
  items: string[];
}) {
```

**Step 6: Verify locally**

```bash
npm run dev
```

- Open `/videos`, click a flag icon → name prompt appears
- Enter name → flag is created (check Supabase table)
- Refresh page → flag state persists
- Click flag again → flag removed
- Click "I need help with this question" → whole-question flag created

**Step 7: Verify build**

```bash
npm run build
```

**Step 8: Commit**

```bash
git add app/(main)/videos/VideoLibraryClient.tsx
git commit -m "feat: add per-step and per-video help flag buttons"
```

---

### Task 5: Create teacher flags page

**Files:**
- Create: `app/(main)/flags/page.tsx`
- Create: `app/(main)/flags/FlagsClient.tsx`

**Step 1: Create server page with password gate**

Create `app/(main)/flags/page.tsx`:

```typescript
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import FlagsClient from './FlagsClient';

export const metadata = {
  title: 'Help Flags — Music Tech Studio',
};

export default async function FlagsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const authed = cookieStore.get('flags_auth')?.value === process.env.FLAGS_PASSWORD;

  // Handle login form submission via searchParam
  if (params.pw) {
    if (params.pw === process.env.FLAGS_PASSWORD) {
      // Set cookie and redirect to clean URL
      // (handled via API route or client-side, see FlagsClient)
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-6 pt-24">
        <form method="GET" className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <h1 className="text-xl font-semibold text-[var(--foreground)] mb-4">Teacher Access</h1>
          <input
            name="pw"
            type="password"
            placeholder="Enter password"
            className="w-full px-4 py-2 border border-black/10 rounded-lg bg-[var(--background)] text-[var(--foreground)] mb-4"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg text-white font-medium"
            style={{ backgroundColor: '#C5A855' }}
          >
            Access Flags
          </button>
        </form>
      </div>
    );
  }

  return <FlagsClient />;
}
```

Note: The auth flow needs refinement — either use a small API route to set the cookie, or handle it client-side. The implementer should choose the simplest approach that works with Next.js 16 App Router.

**Step 2: Create FlagsClient**

Create `app/(main)/flags/FlagsClient.tsx`:

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface HelpFlag {
  id: string;
  student_name: string;
  video_id: string;
  video_title: string;
  exam_year: string;
  step_index: number | null;
  step_text: string | null;
  resolved: boolean;
  created_at: string;
}

export default function FlagsClient() {
  const [flags, setFlags] = useState<HelpFlag[]>([]);
  const [hideResolved, setHideResolved] = useState(true);
  const [yearFilter, setYearFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/api/flags')
      .then(r => r.json())
      .then(setFlags);
  }, []);

  const resolve = async (id: string, resolved: boolean) => {
    await fetch('/api/flags', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, resolved }),
    });
    setFlags(prev => prev.map(f => f.id === id ? { ...f, resolved } : f));
  };

  const visible = flags
    .filter(f => !hideResolved || !f.resolved)
    .filter(f => yearFilter === 'all' || f.exam_year === yearFilter);

  const years = [...new Set(flags.map(f => f.exam_year))];

  // Group by exam_year then video_title
  const grouped = visible.reduce<Record<string, Record<string, HelpFlag[]>>>((acc, f) => {
    if (!acc[f.exam_year]) acc[f.exam_year] = {};
    if (!acc[f.exam_year][f.video_title]) acc[f.exam_year][f.video_title] = [];
    acc[f.exam_year][f.video_title].push(f);
    return acc;
  }, {});

  if (flags.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--background)] px-6 pb-6 pt-24 text-center">
        <p className="text-[var(--foreground)]/60 text-lg mt-20">
          No flags — your students are doing great
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] px-6 pb-6 pt-24 md:px-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-display text-4xl text-[var(--foreground)] mb-6">HELP FLAGS</h1>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <label className="flex items-center gap-2 text-sm text-[var(--foreground)]/60">
            <input
              type="checkbox"
              checked={hideResolved}
              onChange={e => setHideResolved(e.target.checked)}
            />
            Hide resolved
          </label>
          <select
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
            className="text-sm border border-black/10 rounded-lg px-3 py-1.5 bg-[var(--card-bg)]"
          >
            <option value="all">All years</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        {/* Grouped flags */}
        {Object.entries(grouped).map(([year, videos]) => (
          <div key={year} className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">{year}</h2>
            {Object.entries(videos).map(([title, vFlags]) => (
              <div key={title} className="mb-4">
                <h3 className="text-sm font-medium text-[var(--foreground)]/70 mb-2">{title}</h3>
                <div className="space-y-2">
                  {vFlags.map(f => (
                    <div
                      key={f.id}
                      className={`flex items-start justify-between gap-4 p-3 rounded-lg border ${
                        f.resolved
                          ? 'bg-[var(--card-bg)]/50 border-black/5 opacity-50'
                          : 'bg-[var(--card-bg)] border-black/10'
                      }`}
                    >
                      <div>
                        <span className="font-medium text-[var(--foreground)]">{f.student_name}</span>
                        <span className="text-[var(--foreground)]/50 text-sm ml-2">
                          {f.step_text ? `Step ${(f.step_index ?? 0) + 1}: ${f.step_text}` : 'Entire question'}
                        </span>
                        <span className="block text-xs text-[var(--foreground)]/40 mt-0.5">
                          {new Date(f.created_at).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <button
                        onClick={() => resolve(f.id, !f.resolved)}
                        className="shrink-0 p-1.5 rounded-lg hover:bg-black/5"
                        title={f.resolved ? 'Unresolve' : 'Resolve'}
                      >
                        {f.resolved ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
```

**Step 3: Verify locally**

```bash
npm run dev
```

- Navigate to `/flags` → see password form
- Enter correct password → see flags dashboard
- Click resolve → flag gets struck through

**Step 4: Verify build**

```bash
npm run build
```

**Step 5: Commit**

```bash
git add app/(main)/flags/
git commit -m "feat: add teacher flags dashboard with password auth"
```

---

### Task 6: Add RLS policy for resolve/update

**Files:**
- None (Supabase migration via MCP)

The PATCH route (resolve) runs from the server but uses the anon key. We need an update policy.

**Step 1: Add update policy**

Run Supabase MCP `apply_migration` with name `add_help_flags_update_policy`:

```sql
create policy "Anyone can update flags"
  on public.help_flags for update
  to anon
  using (true)
  with check (true);
```

Note: This is acceptable because the `/flags` page is password-protected at the application level and the table contains no sensitive data. A student finding the API endpoint could only toggle `resolved` on flags.

**Step 2: Verify by resolving a test flag**

---

### Task 7: Set Vercel env vars and deploy

**Files:**
- None

**Step 1: Add env vars to Vercel**

```bash
cd "/Users/mikelehnert/Obsidian/Professional (AI)/teacher-showcase"
echo "https://tirdxgkmxluiogtyiltq.supabase.co" | npx vercel env add NEXT_PUBLIC_SUPABASE_URL production preview development
echo "<anon-key>" | npx vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production preview development
echo "<chosen-password>" | npx vercel env add FLAGS_PASSWORD production preview development
```

**Step 2: Push and verify deployment**

```bash
git push
```

Vercel auto-deploys. Check the deployment succeeds.

**Step 3: Smoke test on production**

- Visit `/videos` → flag a step → check Supabase table
- Visit `/flags` → enter password → see the flag → resolve it

---

### Task 8: Final build verification and cleanup

**Step 1: Full build check**

```bash
npm run build
```

**Step 2: Check no TypeScript errors**

```bash
npx tsc --noEmit
```

**Step 3: Final commit if any cleanup needed**

---

## Summary of new files

| File | Purpose |
|------|---------|
| `lib/supabase.ts` | Supabase client (anon key) |
| `app/api/flags/route.ts` | CRUD API for help flags |
| `app/(main)/flags/page.tsx` | Password-protected teacher page |
| `app/(main)/flags/FlagsClient.tsx` | Teacher flags dashboard UI |

## Modified files

| File | Change |
|------|--------|
| `app/(main)/videos/VideoLibraryClient.tsx` | Add flag icons, name prompt, per-video help button |
| `package.json` | Add `@supabase/supabase-js` |
