import { NextRequest, NextResponse } from "next/server";

type Msg = { name: string; message: string; userId: string; timestamp: number };

// Safely extend globalThis to store messages in memory
interface GlobalWithStore {
  _MSG_STORE?: Map<string, Msg[]>;
}

const globalWithStore = globalThis as GlobalWithStore;
const store: Map<string, Msg[]> = globalWithStore._MSG_STORE ?? new Map();
globalWithStore._MSG_STORE = store;

// GET: Return messages for a specific userId
export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId") || "";
  const list = store.get(userId) ?? [];
  return NextResponse.json(list);
}

// POST: Store a new message
export async function POST(req: NextRequest) {
  const { name, message, userId } = (await req.json()) as Msg;

  if (!name || !message || !userId) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const msg: Msg = { name, message, userId, timestamp: Date.now() };
  const current = store.get(userId) ?? [];
  store.set(userId, [...current, msg]);

  return NextResponse.json({ success: true });
}
