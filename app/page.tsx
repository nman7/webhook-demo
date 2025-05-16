// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="h-screen flex items-center justify-center bg-indigo-50">
      <div className="max-w-md text-center space-y-6">
        <h1 className="text-4xl font-bold text-indigo-600">Webhook Demo</h1>
        <p className="text-gray-700">
          Submit messages with a User ID and see them in real time.
        </p>
        <Link
          href="/dashboard"
          className="inline-block rounded bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
        >
          Go to Dashboard
        </Link>
      </div>
    </main>
  );
}
