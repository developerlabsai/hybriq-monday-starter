import "dotenv/config";
import { app } from "./platform/monday-app.js";

const PORT = Number(process.env.PORT) || 3000;
const required = ["HYBRIQ_API_KEY", "ANTHROPIC_API_KEY"];
const missing = required.filter((key) => !process.env[key]);
if (missing.length > 0) { console.error(`Missing: ${missing.join(", ")}. See .env.example.`); process.exit(1); }

app.listen(PORT, () => {
  console.log(`HybrIQ Monday Integration running on port ${PORT}`);
  console.log("Powered by HybrIQ — https://hybriq.dev");
});
