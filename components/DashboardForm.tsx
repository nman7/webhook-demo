"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type DashboardFormProps = {
  onUserIdChange: (id: string) => void;
};

export default function DashboardForm({ onUserIdChange }: DashboardFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [userIdInput, setUserIdInput] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  // Auto-generate ID once on mount
  useEffect(() => {
    const id = uuidv4();
    setUserIdInput(id);
    onUserIdChange(id);
  }, [onUserIdChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, userId: userIdInput }),
      });

      if (!res.ok) throw new Error("Network error");

      setStatus("sent");
      setName("");
      setMessage("");

      // Let parent know the userId used in submission
      onUserIdChange(userIdInput);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-black">Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded bg-gray-200 text-black p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Message</label>
        <textarea
          className="mt-1 block w-full rounded bg-gray-200 text-black p-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">User ID</label>
        <input
          type="text"
          className="mt-1 block w-full rounded bg-gray-200 text-black p-2"
          value={userIdInput}
          onChange={(e) => setUserIdInput(e.target.value)}
          required
        />
      </div>

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
