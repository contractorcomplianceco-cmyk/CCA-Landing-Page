import { Router, type IRouter } from "express";
import { CreateLeadBody } from "@workspace/api-zod";
import { db, leadsTable } from "@workspace/db";

const router: IRouter = Router();

router.post("/leads", async (req, res) => {
  const parsed = CreateLeadBody.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: "Invalid input" });
    return;
  }

  const [lead] = await db
    .insert(leadsTable)
    .values(parsed.data)
    .returning();

  if (!lead) {
    res.status(500).json({ error: "Failed to create lead" });
    return;
  }

  req.log.info({ leadId: lead.id }, "New compliance review request");

  res.status(201).json({
    id: lead.id,
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    service: lead.service,
    state: lead.state,
    createdAt: lead.createdAt.toISOString(),
  });
});

export default router;
