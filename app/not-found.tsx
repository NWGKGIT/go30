import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <p className="font-mono text-text-muted text-sm mb-2">404</p>
        <h1 className="text-xl font-black text-text-primary mb-4">Page not found</h1>
        <Link href="/" className="btn-primary inline-flex">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
