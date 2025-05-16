// app/dashboard/page.tsx
"use client"; // this page uses client-side React features

import DashboardForm from "@/components/DashboardForm";

export default function DashboardPage() {
  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Dashboard
        </h1>
        <DashboardForm />
      </div>
    </main>
  );
}
