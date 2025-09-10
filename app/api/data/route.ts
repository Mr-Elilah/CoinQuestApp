// Робота з API Mongo DB

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ data: "Some sample data" });
}
