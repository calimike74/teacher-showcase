import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import FlagsClient from './FlagsClient';

export const metadata = {
  title: 'Help Flags — Music Tech Studio',
};

export default async function FlagsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const cookieStore = await cookies();
  const authed = cookieStore.get('flags_auth')?.value === process.env.FLAGS_PASSWORD;

  if (authed) return <FlagsClient />;

  const params = await searchParams;

  async function login(formData: FormData) {
    'use server';
    const pw = formData.get('pw') as string;
    if (pw === process.env.FLAGS_PASSWORD) {
      const c = await cookies();
      c.set('flags_auth', pw, { httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 30 });
      redirect('/flags');
    }
    redirect('/flags?error=1');
  }

  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-6 pt-24">
      <form action={login} className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-xl font-semibold text-[var(--foreground)] mb-4">Teacher Access</h1>
        {params.error && (
          <p className="text-red-500 text-sm mb-3">Incorrect password. Try again.</p>
        )}
        <input
          name="pw"
          type="password"
          placeholder="Enter password"
          className="w-full px-4 py-2 border border-black/10 rounded-lg bg-[var(--background)] text-[var(--foreground)] mb-4 outline-none focus:ring-2 focus:ring-[#C5A855]"
          autoFocus
        />
        <button
          type="submit"
          className="w-full py-2 rounded-lg text-white font-medium cursor-pointer"
          style={{ backgroundColor: '#C5A855' }}
        >
          Access Flags
        </button>
      </form>
    </div>
  );
}
