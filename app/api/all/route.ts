// app/api/messages/all/route.ts
import { NextResponse } from "next/server";

// @ts-ignore
const store: Map<string, Msg[]> = global._MSG_STORE ?? new Map();
// @ts-ignore
global._MSG_STORE = store;

export async function GET() {
  const all = Array.from(store.entries()).map(([userId, msgs]) => ({
    userId,
    msgs,
  }));
  return NextResponse.json(all);
}
