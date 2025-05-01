import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const DUMMY_USER_ID = 1;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      const { name } = req.body;

      const existing = await prisma.champion.findFirst({
        where: { name, userId: DUMMY_USER_ID },
      });

      if (existing) {
        await prisma.champion.delete({
          where: { id: existing.id },
        });
        return res.status(200).json({ removed: true, name });
      } else {
        const created = await prisma.champion.create({
          data: {
            name,
            rating: Math.floor(Math.random() * 100),
            user: { connect: { id: DUMMY_USER_ID } },
          },
        });
        return res.status(201).json(created);
      }
    }

    if (req.method === "GET") {
      if (req.url?.includes("/top")) {
        const top = await prisma.champion.findMany({
          where: { userId: DUMMY_USER_ID },
          orderBy: { rating: "desc" },
          take: 3,
        });
        return res.status(200).json(top);
      }

      const all = await prisma.champion.findMany({
        where: { userId: DUMMY_USER_ID },
      });
      return res.status(200).json(all);
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (error: any) {
    console.error("API /favorites error:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
