import { NextRequest, NextResponse } from "next/server";

type Msg = {
  name: string;
  message: string;
  userId: string;
  timestamp: number;
};

interface GlobalWithStore {
  _MSG_STORE?: Map<string, Msg[]>;
}

const globalWithStore = globalThis as GlobalWithStore;
const store: Map<string, Msg[]> = globalWithStore._MSG_STORE ?? new Map();
globalWithStore._MSG_STORE = store;

export async function POST(req: NextRequest) {
  const { name, message, userId } = (await req.json()) as Msg;

  const entry: Msg = {
    name,
    message,
    userId,
    timestamp: Date.now(),
  };

  const list = store.get(userId) ?? [];
  list.push(entry);
  store.set(userId, list);

  return NextResponse.json({ success: true });
}
