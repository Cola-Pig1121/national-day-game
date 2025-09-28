import { NextRequest } from "next/server";
import { generateNextScene, AIRequestBody } from "@/lib/ai-adventure";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as AIRequestBody;
    
    // 设置流式响应头
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();
    
    // 发送初始响应头
    const headers = new Headers();
    headers.set('Content-Type', 'text/plain; charset=utf-8');
    headers.set('Cache-Control', 'no-cache');
    headers.set('Connection', 'keep-alive');
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Access-Control-Allow-Methods', 'POST');
    headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    // 开始生成场景
    generateNextScene(body, (chunk) => {
      // 将每个块发送到客户端
      writer.write(encoder.encode(chunk));
    }).then((scene) => {
      // 发送结束标记
      writer.write(encoder.encode('\n[DONE]'));
      writer.close();
    }).catch((error) => {
      writer.write(encoder.encode(`\n[ERROR]${error.message}`));
      writer.close();
    });
    
    // 返回流式响应
    return new Response(readable, { headers });
  } catch (error) {
    return Response.json({ 
      success: false, 
      error: String(error),
      scene: null 
    }, { status: 500 });
  }
}