// app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";

type Msg = { name: string; message: string; userId: string; timestamp: number };

// Make TypeScript aware of our global in-memory store
declare global {
  var _MSG_STORE: Map<string, Msg[]> | undefined;
}

// Initialize or reuse in-memory store
const store = globalThis._MSG_STORE ?? new Map<string, Msg[]>();
globalThis._MSG_STORE = store;

export async function POST(req: NextRequest) {
  const { name, message, userId } = (await req.json()) as Msg;
  const entry: Msg = { name, message, userId, timestamp: Date.now() };
  const list = store.get(userId) ?? [];
  list.push(entry);
  store.set(userId, list);
  return NextResponse.json({ success: true });
}