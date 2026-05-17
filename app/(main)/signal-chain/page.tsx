export const metadata = {
  title: 'Signal Chain Builder — Music Tech Studio',
  description:
    'Interactive teaching tool for A-Level Music Technology (Edexcel 9MT0). Build mixing chains from 19 effects rendered as Eurorack hardware, or diagnose seven broken-chain scenarios anchored to PEF examiner language. Covers spec areas 1.9, 1.11, 1.12 and 2.3 Signals.',
};

export default function SignalChainPage() {
  return (
    <div className="h-[calc(100vh-4rem)] w-full">
      <iframe
        src="/signal-chain/index.html"
        title="Signal Chain Builder"
        className="w-full h-full border-0 block"
      />
    </div>
  );
}
