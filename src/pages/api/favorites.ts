import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const DUMMY_USER_ID = 1;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { name, rating } = req.body;

    if (req.method === "POST") {
      const existing = await prisma.champion.findFirst({
        where: { name, userId: DUMMY_USER_ID },
      });

      if (existing && typeof rating === "number") {
        const updated = await prisma.champion.update({
          where: { id: existing.id },
          data: { rating },
        });
        return res.status(200).json(updated);
      }
      
      

      // ❌ Ta bort favorit
      if (existing && typeof rating !== "number") {
        await prisma.champion.delete({
          where: { id: existing.id },
        });
        return res.status(200).json({ removed: true, name });
      }

      // ⭐ Skapa ny favorit utan rating
      const created = await prisma.champion.create({
        data: {
          name,
          rating: typeof rating === "number" ? rating : null,
          user: { connect: { id: DUMMY_USER_ID } },
        },
      });
      return res.status(201).json(created);
    }

    if (req.method === "GET") {
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
