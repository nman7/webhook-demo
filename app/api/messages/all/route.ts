// app/api/messages/all/route.ts
import { NextResponse } from "next/server";

type Msg = { name: string; message: string; userId: string; timestamp: number };

// Make TypeScript aware of our global in-memory store
declare global {
  var _MSG_STORE: Map<string, Msg[]> | undefined;
}

// Initialize or reuse in-memory store
const store = globalThis._MSG_STORE ?? new Map<string, Msg[]>();
globalThis._MSG_STORE = store;

export async function GET() {
  const all = Array.from(store.entries()).map(([userId, msgs]) => ({
    userId,
    msgs,
  }));
  return NextResponse.json(all);
}
