import { NextResponse } from "next/server";

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

export async function GET() {
  const all = Array.from(store.entries()).map(([userId, msgs]) => ({
    userId,
    msgs,
  }));
  return NextResponse.json(all);
}
