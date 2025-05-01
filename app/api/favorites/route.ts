import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma"; // justera vägen om behövs

const DUMMY_USER_ID = 1;

export async function POST(req: NextRequest) {
  const { name, rating } = await req.json();

  const existing = await prisma.champion.findFirst({
    where: { name, userId: DUMMY_USER_ID },
  });

  if (existing && typeof rating === "number") {
    const updated = await prisma.champion.update({
      where: { id: existing.id },
      data: { rating },
    });
    return NextResponse.json(updated);
  }

  if (existing && typeof rating !== "number") {
    await prisma.champion.delete({
      where: { id: existing.id },
    });
    return NextResponse.json({ removed: true, name });
  }

  const created = await prisma.champion.create({
    data: {
      name,
      rating: typeof rating === "number" ? rating : null,
      user: { connect: { id: DUMMY_USER_ID } },
    },
  });

  return NextResponse.json(created);
}

export async function GET() {
  const all = await prisma.champion.findMany({
    where: { userId: DUMMY_USER_ID },
  });
  return NextResponse.json(all);
}
