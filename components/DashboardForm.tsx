// components/DashboardForm.tsx
"use client";

import { useState, useEffect } from "react";

type DashboardFormProps = {
  onUserIdChange: (id: string) => void;
};

export default function DashboardForm({ onUserIdChange }: DashboardFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // 1) Auto-generate on first render
  useEffect(() => {
    const generated = Math.floor(Date.now() / 1000).toString();
    setUserId(generated);
    onUserIdChange(generated);
  }, [onUserIdChange]);

  // 2) Tell parent whenever it changes
  useEffect(() => {
    onUserIdChange(userId);
  }, [userId, onUserIdChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, userId }),
      });
      if (!res.ok) throw new Error("Network response was not OK");

      setStatus("sent");
      setName("");
      setMessage("");
      // keep the same userId so you can keep posting under this session
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-black">Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded bg-gray-200 text-black p-2"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-black">Message</label>
        <textarea
          className="mt-1 block w-full rounded bg-gray-200 text-black p-2"
          value={message}
          onChange={e => setMessage(e.target.value)}
          required
        />
      </div>

      {/* User ID */}
      <div>
        <label className="block text-sm font-medium text-black">User ID</label>
        <input
          type="text"
          className="mt-1 block w-full rounded bg-gray-200 text-black p-2"
          value={userId}
          onChange={e => setUserId(e.target.value)}
          required
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded bg-indigo-600 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
      >
        {status === "sending"
          ? "Sending..."
          : status === "sent"
          ? "Sent!"
          : status === "error"
          ? "Try Again"
          : "Send"}
      </button>
    </form>
  );
}
