import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";
import { z } from "zod";

const QuerySchema = z.object({
    query: z.string().optional().transform(s => s ?? ""),
    sort: z.enum(["asc", "desc"]).optional().transform(s => s ?? "desc")
  });

type Article = { id: string; title: string; date: string; summary: string };

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "GET") {
      res.setHeader("Allow", "GET");
      return res.status(405).json({ error: "Method not allowed" });
    }

    const parsed = QuerySchema.safeParse(req.query);
    if (!parsed.success) {
      return res.status(400).json({ error: parsed.error.format() });
    }
    const { query, sort } = parsed.data;

    const filePath = path.join(process.cwd(), "public", "articles.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    const articles: Article[] = JSON.parse(raw);


    const q = query.trim().toLowerCase();
    let filtered = articles.filter(a => {
        if (!q) return true;
        return (
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q)
        );
      });

    filtered.sort((a, b) => {
        const da = new Date(a.date).getTime();
        const db = new Date(b.date).getTime();
        return sort === "asc" ? da - db : db - da;
    });
    
    return res.status(200).json({ results: filtered });
  } catch (err) {
    console.error("API articles error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
