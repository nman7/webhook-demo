// components/DashboardForm.tsx
"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

type DashboardFormProps = {
  onUserIdChange: (id: string) => void;
};

export default function DashboardForm({ onUserIdChange }: DashboardFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] =
    useState<"idle" | "sending" | "sent" | "error">("idle");

  // Generate an initial UUID on mount
  useEffect(() => {
    const initial = uuidv4();
    setUserId(initial);
    onUserIdChange(initial);
  }, [onUserIdChange]);

  // Keep parent in sync if the user manually edits the ID
  useEffect(() => {
    onUserIdChange(userId);
  }, [userId, onUserIdChange]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // 1) Pick a new UUID for this submission
    const nextId = uuidv4();
    setUserId(nextId);
    onUserIdChange(nextId);

    try {
      // 2) POST using that fresh nextId
      const res = await fetch(process.env.NEXT_PUBLIC_WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, userId: nextId }),
      });
      if (!res.ok) throw new Error("Network response was not OK");

      setStatus("sent");
      setName("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 shadow-lg rounded-lg p-6 space-y-6 max-w-md mx-auto md:max-w-lg"
    >
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-black">Name</label>
        <input
          type="text"
          className="mt-1 block w-full rounded border border-gray-300 bg-gray-100 text-black p-3
                     focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-black">Message</label>
        <textarea
          className="mt-1 block w-full rounded border border-gray-300 bg-gray-100 text-black p-3
                     focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
      </div>

      {/* User ID */}
      <div>
        <label className="block text-sm font-medium text-black">User ID</label>
        <input
          type="text"
          className="mt-1 block w-full rounded border border-gray-300 bg-gray-100 text-black p-3
                     focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-lg bg-indigo-600 py-3 text-white font-semibold
                   hover:bg-indigo-700 transition-colors disabled:opacity-50"
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
