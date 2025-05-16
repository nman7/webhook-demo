// app/api/messages/route.ts
import { NextRequest, NextResponse } from "next/server";

type Msg = { name: string; message: string; userId: string; timestamp: number };

// Initialize or reuse the same store
// @ts-ignore
const store: Map<string, Msg[]> = global._MSG_STORE ?? new Map();
// @ts-ignore
global._MSG_STORE = store;

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") || "";
  const list = store.get(userId) ?? [];
  return NextResponse.json(list);
}
