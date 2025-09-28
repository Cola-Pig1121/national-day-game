import { OpenAI } from "openai";

export const aiClient = new OpenAI({
  baseURL: process.env.HF_BASE_URL || "https://api-inference.modelscope.cn/v1",
  apiKey: process.env.HF_TOKEN || "",
});

// 默认模型可通过环境变量覆盖
export const DEFAULT_AI_MODEL =
  process.env.HF_MODEL || "Qwen/Qwen2.5-32B-Instruct";