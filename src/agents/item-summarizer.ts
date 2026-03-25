import type { HybrIQSDK } from "@hybriq/sdk";
import { config } from "../config.js";

const SYSTEM_PROMPT = `You are an item activity summarizer for Monday.com. Summarize updates, comments, and status changes into a concise briefing. Highlight key decisions and pending actions.`;

export async function itemSummarizer(sdk: HybrIQSDK, activityData: string): Promise<string> {
  const result = await sdk.execute({
    model: config.defaultModel,
    messages: [{ role: "user", content: `Summarize this item's activity:\n\n${activityData}` }],
    systemPrompt: SYSTEM_PROMPT,
    maxTokens: config.maxTokens,
    metadata: { ...config.metadata, agent: "item-summarizer" },
  });
  return result.response;
}
