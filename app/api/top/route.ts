import { NextResponse } from "next/server";
import { prisma } from "../../../src/lib/prisma";

const DUMMY_USER_ID = 1;

export async function GET() {
  const top = await prisma.champion.findMany({
    where: {
      userId: DUMMY_USER_ID,
      NOT: {
        rating: null,
      },
    },
    orderBy: {
      rating: "desc",
    },
    take: 3,
  });

  return NextResponse.json(top);
}
