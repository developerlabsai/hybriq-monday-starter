import type { HybrIQSDK } from "@hybriq/sdk";
import { config } from "../config.js";

const SYSTEM_PROMPT = `You are a status report generator for Monday.com. Analyze board data and produce a structured status report with: items by status group, overdue items with risk assessment, blockers with suggested resolutions, and a narrative summary for stakeholders. Keep under 400 words.`;

export async function statusReporter(sdk: HybrIQSDK, boardData: string): Promise<string> {
  const result = await sdk.execute({
    model: config.defaultModel,
    messages: [{ role: "user", content: `Generate a status report from this board data:\n\n${boardData}` }],
    systemPrompt: SYSTEM_PROMPT,
    maxTokens: config.maxTokens,
    metadata: { ...config.metadata, agent: "status-reporter" },
  });
  return result.response;
}
