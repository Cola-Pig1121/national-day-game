import { aiClient, DEFAULT_AI_MODEL } from "@/lib/openai";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import * as knowledge from "@/lib/knowledge-data";
import * as staticStory from "@/lib/story-data";

export interface AIChoice {
  id: string;
  text: string;
  description: string;
  points: number;
}

export interface AIScene {
  id: string;
  title: string;
  content: string;
  isEnding?: boolean;
  historicalFact?: string;
  year?: string;
  location?: string;
  choices: AIChoice[];
}

export interface AIRequestBody {
  history: Array<{ sceneId: string; choiceId?: string; summary?: string }>;
  selectedChoiceId?: string;
}

export interface AIResponse {
  scene: AIScene;
}

function buildSystemPrompt() {
  // 将知识库与静态故事数据摘要化，防止提示过长
  const knowledgeSummary = JSON.stringify(knowledge).slice(0, 8000);
  const storySummary = JSON.stringify(staticStory.storyData).slice(0, 6000);

  return [
    "你是一个中文爱国主题的历史文字冒险引擎。",
    "任务：以中华人民共和国成立与国旗诞生为主线，生成分段剧情（每段结尾给出三个选项，包含分数points）。",
    "要求：",
    "- 严格使用真实历史人物与事件（如：毛泽东、周恩来、朱德、曾联松、许广平等），人名准确。",
    "- 内容要教育性、感染力并贴合主题，体现国庆意义与国旗设计过程。",
    "- 参考知识与资料（已在上下文提供），但不要编造违背史实的情节。",
    "- 严格按照历史时间线发展剧情，不要出现时间错乱的情况。",
    "- 每段剧情末尾生成三个选项：text、description、points（整数），合理、积极向上、贴合主题。",
    "- 当认为到达故事合理结尾时，返回 isEnding=true，并将三个选项之一为\"结束故事（结束探索）\"的选项；用户选择后即终止。",
    "",
    "输出必须是 JSON：",
    "{",
    '  "scene": {',
    '    "id": "ai-scene-<递增编号或唯一ID>",',
    '    "title": "当前段落标题",',
    '    "content": "段落正文（可含适当情感和对话）",',
    '    "historicalFact": "可选：相关史实简述",',
    '    "year": "可选年份",',
    '    "location": "可选地点",',
    '    "isEnding": false 或 true,',
    '    "choices": [',
    '      { "id": "choice-1", "text": "...", "description": "...", "points": 10 },',
    '      { "id": "choice-2", "text": "...", "description": "...", "points": 15 },',
    '      { "id": "choice-3", "text": "...", "description": "...", "points": 20 }',
    "    ]",
    "  }",
    "}",
    "",
    "注意：只输出 JSON，不要输出其他文本。",
    "",
    "以下为知识与参考数据摘要：",
    `知识库: ${knowledgeSummary}`,
    `静态故事数据: ${storySummary}`,
  ].join("\n");
}

export async function generateNextScene(reqBody: AIRequestBody, onChunk?: (chunk: string) => void): Promise<AIScene> {
  const messages: ChatCompletionMessageParam[] = [
    { role: "system", content: buildSystemPrompt() },
    {
      role: "user",
      content: JSON.stringify({
        history: reqBody.history ?? [],
        selectedChoiceId: reqBody.selectedChoiceId ?? null,
        instruction:
          "基于以上历史与知识，继续生成下一段剧情（若无历史则生成开场）。严格输出规范 JSON。请严格按照历史时间线发展剧情，不要出现时间错乱的情况。",
      }),
    },
  ];

  const stream = await aiClient.chat.completions.create({
    model: DEFAULT_AI_MODEL,
    messages,
    stream: true,
    extra_body: {
      enable_thinking: true,
    },
  } as any) as any;

  let fullContent = "";
  let doneThinking = false;

  for await (const chunk of stream) {
    const thinkingChunk = chunk.choices?.[0]?.delta?.reasoning_content;
    const answerChunk = chunk.choices?.[0]?.delta?.content;
    
    if (thinkingChunk && !doneThinking) {
      // 思考过程，不输出
      continue;
    } else if (answerChunk) {
      if (!doneThinking) {
        doneThinking = true;
      }
      fullContent += answerChunk;
      
      // 如果提供了回调函数，则发送块数据
      if (onChunk) {
        onChunk(answerChunk);
      }
    }
  }

  let parsed: AIResponse | null = null;
  try {
    parsed = JSON.parse(fullContent);
  } catch {
    // 尝试提取 JSON 子串
    const match = fullContent.match(/\{[\s\S]*\}/);
    if (match) {
      parsed = JSON.parse(match[0]);
    }
  }

  if (!parsed?.scene) {
    throw new Error("AI 未返回有效的场景 JSON");
  }

  // 保证 choices 至少三个
  if (!parsed.scene.choices || parsed.scene.choices.length < 3) {
    throw new Error("AI 返回的选项不足三个");
  }

  return parsed.scene;
}