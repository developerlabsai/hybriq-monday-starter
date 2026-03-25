import type { HybrIQSDK } from "@hybriq/sdk";
import { config } from "../config.js";

const SYSTEM_PROMPT = `You are a Monday.com board automation AI. Analyze item changes and suggest intelligent actions: reassign to the right person, flag at-risk items, auto-categorize by topic. Output structured suggestions with reasoning.`;

export async function boardAutomation(sdk: HybrIQSDK, itemData: string): Promise<string> {
  const result = await sdk.execute({
    model: config.defaultModel,
    messages: [{ role: "user", content: `Analyze this board item change and suggest actions:\n\n${itemData}` }],
    systemPrompt: SYSTEM_PROMPT,
    maxTokens: 512,
    metadata: { ...config.metadata, agent: "board-automation" },
  });
  return result.response;
}
