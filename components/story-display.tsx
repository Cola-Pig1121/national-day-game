"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { StoryScene, StoryChoice } from "@/lib/story-data"

interface StoryDisplayProps {
  scene: StoryScene
  onChoiceSelect: (choice: StoryChoice) => void
  onRestart?: () => void
  isLoading?: boolean
}

export function StoryDisplay({ scene, onChoiceSelect, isLoading = false }: StoryDisplayProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleChoiceClick = async (choice: StoryChoice) => {
    setIsTransitioning(true)

    setTimeout(() => {
      onChoiceSelect(choice)
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <div className="space-y-4 sm:space-y-6 fade-in">
      <Card className="sketch-border bg-card/90 backdrop-blur-sm">
        <CardContent className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-primary mb-4">{scene.title}</h2>
            {scene.year && (
              <p className="text-sm text-muted-foreground mb-4">
                {scene.year} · {scene.location}
              </p>
            )}
          </div>

          <div className="bg-muted/30 p-6 rounded-lg border-l-4 border-primary/50 mb-6">
            <p className="text-lg leading-relaxed text-foreground">{scene.content}</p>
          </div>

          {scene.historicalFact && (
            <div className="bg-accent/10 p-4 rounded-lg border border-accent/30 mb-6">
              <p className="text-sm text-muted-foreground leading-relaxed">💡 {scene.historicalFact}</p>
            </div>
          )}

          {scene.isEnding ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎉</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-primary">故事完成</h3>
              <p className="text-muted-foreground">你已经了解了这段历史的精彩片段</p>
            </div>
          ) : (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold mb-4">接下来你会选择做……</h3>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-primary/40 rounded-full animate-spin animation-delay-150"></div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-lg font-medium text-primary">正在思考中...</p>
                    <p className="text-sm text-muted-foreground">正在基于历史资料生成精彩剧情</p>
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce animation-delay-100"></div>
                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce animation-delay-200"></div>
                  </div>
                </div>
              ) : (
                scene.choices.map((choice, index) => (
                  <Button
                    key={choice.id}
                    variant="outline"
                    disabled={isTransitioning || isLoading}
                    className={`w-full p-3 sm:p-4 h-auto text-left justify-start bg-card/50 hover:bg-primary/5 border-primary/20 hover:border-primary/40 transition-all ${
                      isTransitioning || isLoading ? "opacity-50" : ""
                    }`}
                    onClick={() => handleChoiceClick(choice)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-full text-left">
                      <div className="font-medium mb-1 text-foreground text-sm sm:text-base">{choice.text}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground">{choice.description}</div>
                      {choice.score && (
                        <div className="text-xs text-primary/70 mt-1 flex items-center gap-1">
                          <span className="inline-block w-2 h-2 bg-primary/60 rounded-full"></span>
                          评分: {choice.score}/10
                        </div>
                      )}
                    </div>
                  </Button>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}