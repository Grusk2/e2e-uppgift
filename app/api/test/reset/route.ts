import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    await prisma.champion.deleteMany({});
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to reset test DB", error);
    return NextResponse.json({ error: "Failed to reset DB" }, { status: 500 });
  }
}
