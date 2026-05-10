import Link from "next/link";

export const metadata = {
  title: "Privacy notice",
  description: "How Music Tech Studio handles personal data.",
};

export default function PrivacyPage() {
  return (
    <main className="bg-[var(--background)] text-[var(--foreground)] min-h-screen px-5 py-12 md:py-20">
      <article className="max-w-2xl mx-auto leading-relaxed">
        <Link
          href="/"
          className="inline-block mb-8 text-sm text-[var(--foreground)]/60 hover:text-[var(--foreground)]/90 transition-colors"
        >
          ← Back to home
        </Link>

        <h1 className="text-3xl md:text-4xl font-semibold mb-2">Privacy notice</h1>
        <p className="text-sm text-[var(--foreground)]/50 mb-10">Last updated: 10 May 2026</p>

        <section className="my-8">
          <h2 className="text-xl font-semibold mb-3">Who we are</h2>
          <p className="text-[var(--foreground)]/80">
            Music Tech Studio is operated by Mike Lehnert, a Music Technology teacher.
            For the purposes of UK GDPR and PECR, Music Tech Studio is the <strong>data controller</strong> for personal data collected through this site.
          </p>
          <p className="text-[var(--foreground)]/80 mt-2">
            Contact: <a href="mailto:privacy@musictechstudio.co.uk" className="text-[#FF6B35] hover:underline">privacy@musictechstudio.co.uk</a>
          </p>
        </section>

        <section className="my-8">
          <h2 className="text-xl font-semibold mb-3">What we collect</h2>
          <p className="text-[var(--foreground)]/80">
            Nothing. This is an information-only site. We don't run analytics on it and don't accept form submissions.
          </p>
        </section>

        <section className="my-8">
          <h2 className="text-xl font-semibold mb-3">Sub-processors</h2>
          <ul className="list-disc list-inside text-[var(--foreground)]/80 space-y-1">
            <li><strong>Vercel</strong> (Frankfurt, EU) — hosting</li>
          </ul>
          <p className="text-[var(--foreground)]/80 mt-2">
            We do not sell or rent personal data, and we do not share data with advertisers.
          </p>
        </section>

        <section className="my-8">
          <h2 className="text-xl font-semibold mb-3">Cookies</h2>
          <p className="text-[var(--foreground)]/80">None set by this site.</p>
        </section>

        <section className="my-8">
          <h2 className="text-xl font-semibold mb-3">Your rights</h2>
          <p className="text-[var(--foreground)]/80">
            Under UK GDPR you have the right to access, correct, delete, restrict, export, or object to processing of your personal data.
            To exercise any of these, email <a href="mailto:privacy@musictechstudio.co.uk" className="text-[#FF6B35] hover:underline">privacy@musictechstudio.co.uk</a>.
            You also have the right to complain to the{" "}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[#FF6B35] hover:underline">
              UK Information Commissioner's Office
            </a>.
          </p>
        </section>

        <section className="my-8">
          <h2 className="text-xl font-semibold mb-3">Other Music Tech Studio services</h2>
          <p className="text-[var(--foreground)]/80">
            For privacy details on the grades dashboard, interactive resources, or studio bookings, see the privacy notice on each respective subdomain.
          </p>
        </section>

        <section className="my-8">
          <h2 className="text-xl font-semibold mb-3">Changes to this notice</h2>
          <p className="text-[var(--foreground)]/80">
            We update this page when we change how we handle data. The "last updated" date reflects the most recent change.
          </p>
        </section>
      </article>
    </main>
  );
}
