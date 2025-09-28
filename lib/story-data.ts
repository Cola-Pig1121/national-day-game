export interface StoryChoice {
  id: string
  text: string
  description: string
  nextSceneId: string
  points: number
  score?: number
  knowledgeGained?: string
  requirement?: string // 需要特定条件才能选择
}

export interface StoryScene {
  id: string
  title: string
  content: string
  backgroundImage?: string
  choices: StoryChoice[]
  isEnding?: boolean
  historicalFact?: string
  year?: string
  location?: string
  characterPerspective?: string // 角色视角
}

export const storyData: Record<string, StoryScene> = {
  "scene-1": {
    id: "scene-1",
    title: "历史的转折点",
    year: "1949年9月21日",
    location: "北京中南海怀仁堂",
    content:
      "中国人民政治协商会议第一届全体会议即将召开。毛泽东主席庄严宣布：'占人类总数四分之一的中国人从此站立起来了！'这将是决定新中国命运的重要时刻。",
    historicalFact:
      "中国人民政治协商会议第一届全体会议于1949年9月21日至30日在北平召开，通过了《中国人民政治协商会议共同纲领》。",
    choices: [
      {
        id: "choice-1a",
        text: "关注国旗设计",
        description: "了解五星红旗的诞生过程",
        nextSceneId: "scene-2a",
        points: 10,
      },
      {
        id: "choice-1b",
        text: "见证开国大典",
        description: "参与10月1日的历史时刻",
        nextSceneId: "scene-2b",
        points: 10,
      },
    ],
  },
  "scene-2a": {
    id: "scene-2a",
    title: "五星红旗的诞生",
    year: "1949年9月",
    location: "北京",
    content:
      "曾联松设计的五星红旗方案从近3000件应征稿中脱颖而出。红色象征革命，大五角星代表中国共产党，四颗小五角星代表工人、农民、小资产阶级和民族资产阶级四个阶级。",
    historicalFact: "五星红旗的设计者曾联松是上海的一名普通职员，他的设计在征集到的2992件作品中被选中。",
    choices: [
      {
        id: "choice-2a1",
        text: "见证国旗升起",
        description: "在开国大典上见证五星红旗第一次升起",
        nextSceneId: "ending-flag",
        points: 15,
      },
    ],
  },
  "scene-2b": {
    id: "scene-2b",
    title: "开国大典",
    year: "1949年10月1日",
    location: "北京天安门广场",
    content:
      "下午3时整，开国大典正式开始。毛泽东主席庄严宣告：'中华人民共和国中央人民政府今天成立了！'30万人齐声欢呼，这一刻标志着中华民族从此站立起来了！",
    historicalFact:
      "1949年10月1日，中华人民共和国成立，这一天被定为国庆节。从此，每年的10月1日成为全国各族人民隆重欢庆的节日。",
    choices: [
      {
        id: "choice-2b1",
        text: "感受历史时刻",
        description: "深深感受这个改变中国命运的伟大时刻",
        nextSceneId: "ending-ceremony",
        points: 20,
      },
    ],
  },
  "ending-flag": {
    id: "ending-flag",
    title: "五星红旗永远飘扬",
    content:
      "你见证了五星红旗第一次在天安门广场升起的神圣时刻。从那一刻起，这面旗帜就成为了中华人民共和国的象征，代表着人民当家作主的新时代。每年的10月1日，当五星红旗再次升起时，都在提醒我们铭记这个伟大的历史时刻。",
    isEnding: true,
    historicalFact:
      "五星红旗不仅是国家的象征，更承载着中华民族的希望和梦想。每一次升旗仪式都是对历史的致敬和对未来的憧憬。",
    choices: [],
  },
  "ending-ceremony": {
    id: "ending-ceremony",
    title: "人民站起来了",
    content:
      "你亲身经历了开国大典这一历史性时刻。30万人的欢呼声响彻云霄，五星红旗冉冉升起，《义勇军进行曲》奏响。这一刻，中华民族真正站立起来了，开启了新中国建设的伟大征程。",
    isEnding: true,
    historicalFact: "开国大典标志着中华人民共和国的正式成立，从此中国人民成为国家的主人，开始了社会主义建设的新时代。",
    choices: [],
  },
}

export function getScene(sceneId: string): StoryScene | null {
  return storyData[sceneId] || null
}

export function getInitialScene(): StoryScene {
  return storyData["scene-1"]
}

// 获取所有可能的结局
export function getAllEndings(): StoryScene[] {
  return Object.values(storyData).filter((scene) => scene.isEnding)
}

// 根据选择路径计算最终评价
export function calculateFinalRating(
  score: number,
  knowledgeCount: number,
): {
  title: string
  description: string
  level: "bronze" | "silver" | "gold" | "platinum"
} {
  const totalPoints = score + knowledgeCount * 5

  if (totalPoints >= 80) {
    return {
      title: "历史学者",
      description: "你对国庆节的历史有着深入的了解，是真正的历史专家！",
      level: "platinum",
    }
  } else if (totalPoints >= 60) {
    return {
      title: "历史爱好者",
      description: "你对国庆节的历史有很好的了解，继续探索吧！",
      level: "gold",
    }
  } else if (totalPoints >= 40) {
    return {
      title: "历史探索者",
      description: "你开始了解国庆节的历史，还有更多精彩等待发现！",
      level: "silver",
    }
  } else {
    return {
      title: "历史新手",
      description: "这是一个很好的开始，继续学习历史知识吧！",
      level: "bronze",
    }
  }
}
