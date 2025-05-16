// components/DashboardMessages.tsx
"use client";

import { useEffect, useState } from "react";

type Msg = {
  name: string;
  message: string;
  timestamp: number;
};

export default function DashboardMessages({ userId }: { userId: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);

  useEffect(() => {
    if (!userId) return;
    let active = true;

    async function fetchMessages() {
      const res = await fetch(`/api/messages?userId=${userId}`);
      const data: Msg[] = await res.json();
      if (active) setMsgs(data);
    }

    fetchMessages();
    const iv = setInterval(fetchMessages, 3000);
    return () => {
      active = false;
      clearInterval(iv);
    };
  }, [userId]);

  if (!msgs.length) {
    return <p className="text-gray-500">No messages yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {msgs.map((m, i) => (
        <li key={i} className="p-3 bg-gray-200 text-black rounded">
          <p className="font-medium">{m.name}</p>
          <p className="mt-1">{m.message}</p>
          <p className="mt-1 text-xs text-gray-500">
            {new Date(m.timestamp).toLocaleTimeString()}
          </p>
        </li>
      ))}
    </ul>
  );
}
