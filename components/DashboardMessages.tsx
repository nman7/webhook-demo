// components/DashboardMessages.tsx
"use client";

import { useEffect, useRef, useState } from "react";

type Msg = {
  name: string;
  message: string;
  timestamp: number;
};

export default function DashboardMessages({ userId }: { userId: string }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  // keep track of timers so we can clear them on unmount
  const timers = useRef<Map<number, NodeJS.Timeout>>(new Map());

  // 1) Fetch new messages every 3s and append any you haven't seen
  useEffect(() => {
    if (!userId) return;
    let active = true;

    async function fetchMessages() {
      const res = await fetch(`/api/messages?userId=${userId}`);
      const data: Msg[] = await res.json();
      if (!active) return;

      setMsgs(current => {
        const existingTs = new Set(current.map(m => m.timestamp));
        const additions = data.filter(m => !existingTs.has(m.timestamp));
        return [...current, ...additions];
      });
    }

    fetchMessages();
    const iv = setInterval(fetchMessages, 3000);
    return () => {
      active = false;
      clearInterval(iv);
    };
  }, [userId]);

  // 2) Whenever msgs changes, set a 10s timeout to remove each new message
  useEffect(() => {
    msgs.forEach(msg => {
      if (!timers.current.has(msg.timestamp)) {
        const t = setTimeout(() => {
          setMsgs(current => current.filter(m => m.timestamp !== msg.timestamp));
          timers.current.delete(msg.timestamp);
        }, 10_000); // 10 seconds

        timers.current.set(msg.timestamp, t);
      }
    });

    // cleanup all timers on unmount
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current.clear();
    };
  }, [msgs]);

  if (!msgs.length) {
    return <p className="text-gray-500">No recent messages.</p>;
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
