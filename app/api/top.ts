import { prisma } from "../../src/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const DUMMY_USER_ID = 1;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();

  try {
    const top = await prisma.champion.findMany({
        where: {
          userId: DUMMY_USER_ID,
          rating: { not: null },
        },
        orderBy: { rating: "desc" }, // 3 → 🥇 först
        take: 3,
      });
      

    return res.status(200).json(top);
  } catch (err: any) {
    console.error("Failed to fetch top champions", err);
    return res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
