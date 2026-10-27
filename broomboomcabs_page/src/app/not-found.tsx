import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h2 className="text-3xl font-extrabold text-slate-900 mb-2">404 - Page Not Found</h2>
      <p className="text-slate-600 mb-6">The page you are looking for does not exist.</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-amber-400 text-slate-950 font-bold hover:bg-amber-500 transition"
      >
        Return to Home
      </Link>
    </div>
  );
}

