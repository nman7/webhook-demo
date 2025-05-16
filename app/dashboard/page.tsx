// app/dashboard/page.tsx
"use client";

import { useState } from "react";
import DashboardForm from "@/components/DashboardForm";
import DashboardMessages from "@/components/DashboardMessages";

export default function DashboardPage() {
  const [userId, setUserId] = useState("");

  return (
    <main className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
        <DashboardForm onUserIdChange={setUserId} />
        {userId && <DashboardMessages userId={userId} />}
      </div>
    </main>
  );
}
