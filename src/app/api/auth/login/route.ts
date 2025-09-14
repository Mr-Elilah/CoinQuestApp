// Логіка логінізації КОРИСТУВАЧА
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // В будущем нужно подключить БД и проверку пользователя

  const body = await req.json();
  return NextResponse.json({ MessageChanne: "Login success", body });
}
