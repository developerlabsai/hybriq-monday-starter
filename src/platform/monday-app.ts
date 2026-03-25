import express from "express";
import { hybriq } from "../hybriq.js";
import { boardAutomation } from "../agents/board-automation.js";
import { itemSummarizer } from "../agents/item-summarizer.js";
import { statusReporter } from "../agents/status-reporter.js";

export const app = express();
app.use(express.json());

app.get("/", (_req, res) => { res.json({ status: "ok", app: "hybriq-monday-starter" }); });

app.post("/webhooks/monday", async (req, res) => {
  try {
    // Monday.com webhook challenge
    if (req.body.challenge) { res.json({ challenge: req.body.challenge }); return; }
    const result = await boardAutomation(hybriq, JSON.stringify(req.body.event));
    console.log("[hybriq] Board automation:", result);
    res.sendStatus(200);
  } catch (error) {
    console.error("[hybriq] Webhook failed:", error);
    res.sendStatus(500);
  }
});

app.post("/api/summarize-item", async (req, res) => {
  try {
    const result = await itemSummarizer(hybriq, JSON.stringify(req.body));
    res.json({ summary: result });
  } catch (error) {
    console.error("[hybriq] Summarizer failed:", error);
    res.status(500).json({ error: "Summarization failed" });
  }
});

app.post("/api/generate-report", async (req, res) => {
  try {
    const result = await statusReporter(hybriq, JSON.stringify(req.body));
    res.json({ report: result });
  } catch (error) {
    console.error("[hybriq] Reporter failed:", error);
    res.status(500).json({ error: "Report generation failed" });
  }
});
