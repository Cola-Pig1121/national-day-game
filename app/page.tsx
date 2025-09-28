"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, RotateCcw } from "lucide-react"
import { StoryDisplay } from "@/components/story-display"
import type { StoryScene } from "@/lib/story-data"


export default function NationalDayStory() {
  const [gameStarted, setGameStarted] = useState(false)
  const [showLoadingScreen, setShowLoadingScreen] = useState(false)
  const [currentScene, setCurrentScene] = useState<StoryScene | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [streamedContent, setStreamedContent] = useState("")



  const resetStory = () => {
    setGameStarted(false)
    setShowLoadingScreen(false)
    setCurrentScene(null)
    setError(null)
    setIsLoading(false)
    setStreamedContent("")
  }

  // 使用 AI 生成开场
  const startAIAdventure = async () => {
    setError(null)
    setGameStarted(true)
    setShowLoadingScreen(true)
    setStreamedContent("")
    setCurrentScene(null) // 确保清空之前的场景
    
    try {
      const response = await fetch("/api/ai-adventure", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ history: [] }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("响应体为空");
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let done = false
      let accumulatedContent = ""

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone
        
        if (value) {
          const chunk = decoder.decode(value, { stream: true })
          accumulatedContent += chunk
          
          // 检查是否收到结束标记
          if (accumulatedContent.includes('[DONE]')) {
            // 移除结束标记
            const contentWithoutDone = accumulatedContent.replace('[DONE]', '')
            
            // 解析JSON
            let parsed
            try {
              parsed = JSON.parse(contentWithoutDone)
            } catch {
              // 尝试提取 JSON 子串
              const match = contentWithoutDone.match(/\{[\s\S]*\}/)
              if (match) {
                parsed = JSON.parse(match[0])
              }
            }
            
            if (!parsed?.scene) {
              throw new Error("AI 未返回有效的场景 JSON")
            }
            
            setCurrentScene({
              id: parsed.scene.id,
              title: parsed.scene.title,
              content: parsed.scene.content,
              historicalFact: parsed.scene.historicalFact,
              year: parsed.scene.year,
              location: parsed.scene.location,
              isEnding: parsed.scene.isEnding,
              choices: parsed.scene.choices.map((c: any) => ({
                id: c.id,
                text: c.text,
                description: c.description,
                points: c.points,
                nextSceneId: "ai-next",
              })),
            } as StoryScene)
            
            break
          } else if (accumulatedContent.includes('[ERROR]')) {
            const errorContent = accumulatedContent.split('[ERROR]')[1]
            throw new Error(errorContent || "生成故事时发生错误")
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成故事时发生错误")
      setGameStarted(false)
    } finally {
      setShowLoadingScreen(false)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background paper-texture">
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <img src="/images/story-bg.png" alt="故事背景" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-4 sm:py-8">
        {!gameStarted ? (<>
          <div className="max-w-2xl mx-auto text-center fade-in">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 gentle-float">国庆节的故事</h1>
              <p className="text-lg text-muted-foreground mb-8">1949年，一个改变中国命运的年份...</p>
            </div>

            <Card className="sketch-border bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="w-24 h-24 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <Play className="w-12 h-12 text-primary" />
                  </div>
                  <p className="text-muted-foreground">通过互动故事，了解中华人民共和国成立的历史时刻</p>
                </div>

              </CardContent>
            </Card>
          </div>
          {/* 固定剧情序章卡片与选项 */}
          <div className="flex justify-center mt-8">
            <Button
              onClick={startAIAdventure}
              disabled={false}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 min-w-[300px] relative overflow-hidden"
            >
              开始AI生成的国庆主题故事
            </Button>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <p className="font-medium">生成失败</p>
              <p>{error}</p>
              <Button 
                variant="outline" 
                size="sm" 
                className="mt-2"
                onClick={() => {
                  setError(null)
                  startAIAdventure()
                }}
              >
                重试
              </Button>
            </div>
          )}
        </>
        ) : showLoadingScreen ? (
          // 专门的加载画面
          <div className="max-w-2xl mx-auto text-center fade-in">
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-primary mb-6 gentle-float">正在生成故事...</h1>
              <p className="text-lg text-muted-foreground mb-8">正在为您创作一个精彩的历史故事</p>
            </div>

            <Card className="sketch-border bg-card/80 backdrop-blur-sm p-8">
              <div className="flex flex-col items-center justify-center py-12 space-y-6">
                <div className="relative">
                  <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-primary/40 rounded-full animate-spin animation-delay-150"></div>
                </div>
                
                <div className="space-y-4 w-full max-w-md">
                  <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full animate-progress"></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="space-y-2">
                      <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xl">📜</span>
                      </div>
                      <p className="text-sm text-muted-foreground">搜集史料</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xl">✍️</span>
                      </div>
                      <p className="text-sm text-muted-foreground">创作故事</p>
                    </div>
                    <div className="space-y-2">
                      <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-xl">🎨</span>
                      </div>
                      <p className="text-sm text-muted-foreground">润色细节</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center space-y-2">
                  <p className="text-lg font-medium text-primary">正在思考中...</p>
                  <p className="text-sm text-muted-foreground">正在基于历史资料生成精彩剧情</p>
                </div>
                
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-primary/60 rounded-full animate-bounce"></div>
                  <div className="w-3 h-3 bg-primary/60 rounded-full animate-bounce animation-delay-100"></div>
                  <div className="w-3 h-3 bg-primary/60 rounded-full animate-bounce animation-delay-200"></div>
                </div>
              </div>
            </Card>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="mb-4 text-right">
              <Button variant="outline" size="sm" onClick={resetStory} className="bg-card/80 backdrop-blur-sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                重新开始
              </Button>
            </div>

            {currentScene && (
              <StoryDisplay
                scene={currentScene}
                isLoading={isLoading}
                onChoiceSelect={async (choice) => {
                  // 如果当前场景是结尾且选择包含"结束"，直接重置
                  if (currentScene?.isEnding && choice.text.includes("结束")) {
                    resetStory()
                    return
                  }
                  
                  setIsLoading(true)
                  setError(null)
                  setStreamedContent("") // 清空之前的内容
                  
                  try {
                    const response = await fetch("/api/ai-adventure", {
                      method: "POST",
                      headers: { 
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        history: [{ sceneId: currentScene!.id, choiceId: choice.id }],
                        selectedChoiceId: choice.id,
                      }),
                    })

                    if (!response.ok) {
                      throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    if (!response.body) {
                      throw new Error("响应体为空");
                    }

                    const reader = response.body.getReader()
                    const decoder = new TextDecoder()
                    let done = false
                    let accumulatedContent = ""

                    while (!done) {
                      const { value, done: readerDone } = await reader.read()
                      done = readerDone
                      
                      if (value) {
                        const chunk = decoder.decode(value, { stream: true })
                        accumulatedContent += chunk
                        setStreamedContent(prev => prev + chunk) // 实时更新流式内容
                        
                        // 检查是否收到结束标记
                        if (accumulatedContent.includes('[DONE]')) {
                          // 移除结束标记
                          const contentWithoutDone = accumulatedContent.replace('[DONE]', '')
                          
                          // 解析JSON
                          let parsed
                          try {
                            parsed = JSON.parse(contentWithoutDone)
                          } catch {
                            // 尝试提取 JSON 子串
                            const match = contentWithoutDone.match(/\{[\s\S]*\}/)
                            if (match) {
                              parsed = JSON.parse(match[0])
                            }
                          }
                          
                          if (!parsed?.scene) {
                            throw new Error("AI 未返回有效的场景 JSON")
                          }
                          
                          setCurrentScene({
                            id: parsed.scene.id,
                            title: parsed.scene.title,
                            content: parsed.scene.content,
                            historicalFact: parsed.scene.historicalFact,
                            year: parsed.scene.year,
                            location: parsed.scene.location,
                            isEnding: parsed.scene.isEnding,
                            choices: parsed.scene.choices.map((c: any) => ({
                              id: c.id,
                              text: c.text,
                              description: c.description,
                              points: c.points,
                              nextSceneId: "ai-next",
                            })),
                          } as StoryScene)
                          
                          break
                        } else if (accumulatedContent.includes('[ERROR]')) {
                          const errorContent = accumulatedContent.split('[ERROR]')[1]
                          throw new Error(errorContent || "生成故事时发生错误")
                        }
                      }
                    }
                  } catch (err) {
                    setError(err instanceof Error ? err.message : "生成下一场景时发生错误")
                    setStreamedContent("") // 清空流式内容
                  } finally {
                    setIsLoading(false)
                  }
                }}
                onRestart={resetStory}
              />
            )}
          </div>
        )}
      </div>
      
      {/* 稳健IT社作品声明 */}
      <footer className="relative z-10 py-4 text-center text-sm text-muted-foreground">
        <div className="container mx-auto px-4">
          <p> 稳健IT社 出品</p>
        </div>
      </footer>
    </div>
  )
}
