export interface KnowledgeItem {
  id: string
  title: string
  category: "国旗" | "国歌" | "开国大典" | "政治制度" | "文化建设" | "经济发展" | "科技创新" | "教育事业" | "国际关系"
  content: string
  historicalDate?: string
  relatedFigures?: string[]
  significance: string
  funFacts?: string[]
  imageDescription?: string
}

export const knowledgeDatabase: Record<string, KnowledgeItem> = {
  五星红旗设计知识: {
    id: "五星红旗设计知识",
    title: "五星红旗的设计理念",
    category: "国旗",
    content:
      "五星红旗由曾联松设计，红色象征革命，大五角星代表中国共产党的领导，四颗小五角星代表工人、农民、小资产阶级和民族资产阶级四个阶级的大团结。",
    historicalDate: "1949年9月",
    relatedFigures: ["曾联松", "毛泽东"],
    significance: "五星红旗体现了中国共产党领导下的人民大团结，是新中国的重要象征。",
    funFacts: [
      "曾联松是上海的一名普通职员，他的设计从2992件作品中脱颖而出",
      "国旗的长宽比例为3:2，这个比例经过精心计算",
      "四颗小星各有一个角尖正对大星的中心点，象征人民围绕在党的周围",
    ],
    imageDescription: "鲜艳的五星红旗在天安门广场上空飘扬",
  },
  国旗象征意义: {
    id: "国旗象征意义",
    title: "五星红旗的深层含义",
    category: "国旗",
    content:
      "五星红旗不仅是国家标识，更承载着深刻的政治寓意。红色代表革命和热血，五颗星星的排列体现了中国共产党领导下的人民民主专政。",
    historicalDate: "1949年10月1日",
    relatedFigures: ["毛泽东", "周恩来"],
    significance: "国旗的每一个元素都体现了新中国的政治理念和人民当家作主的本质。",
    funFacts: [
      "国旗首次升起时，毛泽东主席亲自按动电钮",
      "升旗仪式成为每年国庆节的重要仪式",
      "五星红旗在联合国总部升起标志着新中国的国际地位",
    ],
    imageDescription: "毛泽东主席在天安门城楼上按动升旗电钮的历史瞬间",
  },
  设计讨论过程: {
    id: "设计讨论过程",
    title: "国旗设计的民主过程",
    category: "国旗",
    content:
      "国旗设计经过了广泛的征集和民主讨论。从全国征集到的近3000件作品中，经过专家评审和政治协商，最终确定了五星红旗方案。",
    historicalDate: "1949年7月-9月",
    relatedFigures: ["曾联松", "张治中", "马叙伦"],
    significance: "体现了新中国民主决策的过程，人民参与国家象征的确定。",
    funFacts: [
      "征集活动通过报纸向全国发布",
      "评审过程中考虑了政治寓意、艺术美感和制作可行性",
      "最初的设计稿经过了多次修改完善",
    ],
    imageDescription: "政协会议上讨论国旗设计方案的场景",
  },
  国歌历史知识: {
    id: "国歌历史知识",
    title: "《义勇军进行曲》的创作背景",
    category: "国歌",
    content:
      "《义勇军进行曲》创作于1935年，由田汉作词、聂耳作曲。这首歌原为电影《风云儿女》的主题歌，后来成为抗日战争时期的战歌，激励了无数中华儿女。",
    historicalDate: "1935年",
    relatedFigures: ["田汉", "聂耳", "袁牧之"],
    significance: "体现了中华民族不屈不挠的斗争精神，成为民族精神的象征。",
    funFacts: ["聂耳在创作这首歌时年仅23岁", "田汉在狱中写下了歌词", "这首歌在抗日战争中广为传唱，鼓舞了民族士气"],
    imageDescription: "聂耳在创作《义勇军进行曲》时的情景",
  },
  国歌历史意义: {
    id: "国歌历史意义",
    title: "国歌的精神内涵",
    category: "国歌",
    content:
      "《义勇军进行曲》成为国歌，体现了新中国对革命传统的继承和对奋斗精神的弘扬。歌词中的'起来！不愿做奴隶的人们'体现了人民当家作主的理念。",
    historicalDate: "1949年9月27日",
    relatedFigures: ["毛泽东", "周恩来", "郭沫若"],
    significance: "国歌承载着民族记忆，激励人民为国家富强而奋斗。",
    funFacts: [
      "1982年正式写入宪法成为国歌",
      "在重要场合奏响时，全体人员需肃立致敬",
      "国歌教育成为爱国主义教育的重要内容",
    ],
    imageDescription: "开国大典上军乐队演奏国歌的庄严场面",
  },
  国歌讨论过程: {
    id: "国歌讨论过程",
    title: "国歌选择的民主协商",
    category: "国歌",
    content:
      "在国歌的选择过程中，政协代表们进行了充分讨论。有人认为应该创作新歌，有人坚持选择《义勇军进行曲》。最终通过民主协商达成一致。",
    historicalDate: "1949年9月",
    relatedFigures: ["毛泽东", "周恩来", "徐悲鸿"],
    significance: "体现了新中国民主协商的政治制度和集体决策的智慧。",
    funFacts: [
      "讨论过程中考虑了歌曲的历史意义和现实适用性",
      "最终决定暂时采用，后来正式确定",
      "这一决策过程成为民主决策的典型案例",
    ],
    imageDescription: "政协会议上代表们讨论国歌选择的热烈场面",
  },
  开国大典筹备知识: {
    id: "开国大典筹备知识",
    title: "开国大典的精心筹备",
    category: "开国大典",
    content:
      "开国大典的筹备工作从1949年9月开始，涉及会场布置、安全保卫、参会人员安排、仪式流程等多个方面。每一个细节都经过精心设计。",
    historicalDate: "1949年9月-10月",
    relatedFigures: ["周恩来", "聂荣臻", "罗瑞卿"],
    significance: "体现了新中国的组织能力和对这一历史时刻的重视。",
    funFacts: [
      "天安门广场进行了大规模整修",
      "制作了巨大的毛泽东画像悬挂在天安门城楼上",
      "安排了30万人参加典礼，组织工作极其复杂",
    ],
    imageDescription: "工人们在天安门广场进行开国大典前的紧张筹备工作",
  },
  开国大典布置知识: {
    id: "开国大典布置知识",
    title: "天安门广场的节日盛装",
    category: "开国大典",
    content:
      "为了开国大典，天安门广场经过了精心布置。红旗飘扬，鲜花盛开，标语横幅营造出庄严喜庆的氛围。每一处布置都体现了新中国的精神面貌。",
    historicalDate: "1949年10月1日",
    relatedFigures: ["周恩来", "彭真"],
    significance: "广场布置体现了新中国的政治理念和人民的喜悦心情。",
    funFacts: ["使用了数万面红旗装饰广场", "鲜花主要来自北京郊区的花农贡献", "标语内容经过精心设计，体现时代特色"],
    imageDescription: "装饰一新的天安门广场，红旗招展，鲜花盛开",
  },
  大典安保知识: {
    id: "大典安保知识",
    title: "开国大典的安全保障",
    category: "开国大典",
    content:
      "开国大典的安全保卫工作极其重要，涉及人员安全、会场秩序、设备保护等多个方面。安保人员制定了详细的安全预案，确保典礼顺利进行。",
    historicalDate: "1949年10月1日",
    relatedFigures: ["罗瑞卿", "杨奇清"],
    significance: "为新中国成立这一重要时刻提供了坚实的安全保障。",
    funFacts: ["安保工作从几个月前就开始准备", "制定了多套应急预案", "安保人员分布在广场的各个角落"],
    imageDescription: "安保人员在开国大典现场维护秩序的场景",
  },
  人民参与意识: {
    id: "人民参与意识",
    title: "人民当家作主的体现",
    category: "政治制度",
    content: "开国大典不仅是政治仪式，更是人民的节日。30万普通民众的参与，体现了新中国人民当家作主的本质特征。",
    historicalDate: "1949年10月1日",
    relatedFigures: ["毛泽东", "朱德"],
    significance: "体现了社会主义制度下人民的主体地位和参与意识。",
    funFacts: [
      "参与者包括工人、农民、学生、知识分子等各界人士",
      "许多人从外地赶来参加这一历史时刻",
      "人民的热情参与展现了对新政权的拥护",
    ],
    imageDescription: "各界人民群众在天安门广场欢庆新中国成立",
  },
  国际交往礼仪: {
    id: "国际交往礼仪",
    title: "新中国的国际形象",
    category: "国际关系",
    content: "开国大典邀请了国际友人参加，体现了新中国对外开放的态度。这些国际友人的参与和见证，有助于世界了解新中国。",
    historicalDate: "1949年10月1日",
    relatedFigures: ["周恩来", "陈毅"],
    significance: "展现了新中国的国际视野和开放姿态。",
    funFacts: [
      "邀请了多个国家的外交官和友好人士",
      "国际友人的报道帮助世界了解新中国",
      "体现了新中国独立自主的外交政策",
    ],
    imageDescription: "国际友人在开国大典上见证历史时刻",
  },
  开国大典完整体验: {
    id: "开国大典完整体验",
    title: "历史时刻的完整记录",
    category: "开国大典",
    content:
      "1949年10月1日下午3时，开国大典正式开始。毛泽东主席宣告中华人民共和国成立，五星红旗升起，国歌奏响，礼炮齐鸣，30万人欢声雷动。",
    historicalDate: "1949年10月1日",
    relatedFigures: ["毛泽东", "朱德", "刘少奇", "周恩来"],
    significance: "标志着中华民族从此站立起来，开启了新的历史纪元。",
    funFacts: ["典礼持续了约2个小时", "全国各地同时举行庆祝活动", "这一时刻通过广播传遍全国"],
    imageDescription: "毛泽东主席在天安门城楼上宣告新中国成立的历史瞬间",
  },
  国旗制作工艺: {
    id: "国旗制作工艺",
    title: "第一面国旗的制作过程",
    category: "国旗",
    content:
      "第一面在开国大典上升起的五星红旗由北京缝纫工人赵文瑞制作。她用了整整一夜的时间，精心缝制了这面具有历史意义的国旗。",
    historicalDate: "1949年9月30日",
    relatedFigures: ["赵文瑞"],
    significance: "体现了普通劳动者对新中国成立的贡献和参与。",
    funFacts: ["使用的是当时最好的红色绸缎", "五颗星星都是手工缝制", "制作过程体现了工匠精神"],
    imageDescription: "赵文瑞在灯下精心缝制第一面五星红旗",
  },
  国歌演奏历史: {
    id: "国歌演奏历史",
    title: "国歌的首次正式演奏",
    category: "国歌",
    content:
      "在开国大典上，《义勇军进行曲》作为代国歌首次在正式场合演奏。军乐队的演奏庄严肃穆，全场肃立，体现了对国歌的尊重。",
    historicalDate: "1949年10月1日",
    relatedFigures: ["罗浪"],
    significance: "确立了国歌在国家仪式中的重要地位。",
    funFacts: ["军乐队经过了长时间的排练", "演奏时全场30万人肃立致敬", "这次演奏成为国歌演奏的标准"],
    imageDescription: "开国大典上军乐队演奏国歌的庄严场面",
  },
  民主决策过程: {
    id: "民主决策过程",
    title: "新中国的民主协商传统",
    category: "政治制度",
    content:
      "新中国成立过程中的各项重大决策，都体现了民主协商的精神。从国旗国歌的选择到政府组成，都经过了充分的讨论和协商。",
    historicalDate: "1949年9月",
    relatedFigures: ["毛泽东", "周恩来", "李济深"],
    significance: "奠定了新中国民主决策的传统和制度基础。",
    funFacts: ["政协会议体现了统一战线的重要作用", "各党派人士都参与了讨论", "决策过程体现了集体智慧"],
    imageDescription: "政协代表们在会议上进行民主协商的场景",
  },
  大典组织经验: {
    id: "大典组织经验",
    title: "大型活动的组织智慧",
    category: "开国大典",
    content:
      "开国大典的成功举办，积累了组织大型国家活动的宝贵经验。从人员安排到流程设计，每个环节都体现了组织者的智慧。",
    historicalDate: "1949年10月1日",
    relatedFigures: ["周恩来", "彭真"],
    significance: "为后来的国庆庆典和重大活动提供了经验借鉴。",
    funFacts: ["制定了详细的时间表和流程图", "各部门协调配合，分工明确", "应急预案考虑周全"],
    imageDescription: "组织者们在讨论开国大典具体安排的会议场面",
  },
  人民民主专政理念: {
    id: "人民民主专政理念",
    title: "新中国的政治制度基础",
    category: "政治制度",
    content:
      "人民民主专政是新中国的国体，体现了人民当家作主的本质。在人民内部实行民主，对敌对势力实行专政，保障了人民的根本利益。",
    historicalDate: "1949年",
    relatedFigures: ["毛泽东", "刘少奇"],
    significance: "确立了新中国的政治制度基础和治国理念。",
    funFacts: ["这一理念写入了《共同纲领》", "体现了马克思主义国家学说的中国化", "为社会主义建设提供了政治保障"],
    imageDescription: "人民代表大会会议场景，体现人民当家作主",
  },
  国际视角下的新中国: {
    id: "国际视角下的新中国",
    title: "世界眼中的新中国",
    category: "国际关系",
    content:
      "新中国的成立引起了国际社会的广泛关注。国际友人和媒体的报道，让世界了解了中国人民的伟大胜利和新中国的崭新面貌。",
    historicalDate: "1949年10月",
    relatedFigures: ["斯特朗", "斯诺"],
    significance: "提升了中国的国际地位和影响力。",
    funFacts: ["多国媒体报道了开国大典", "国际友人的见证增加了报道的可信度", "新中国的成立改变了世界政治格局"],
    imageDescription: "国际记者在开国大典现场进行报道",
  },
  新中国经济建设: {
    id: "新中国经济建设",
    title: "从一穷二白到繁荣富强",
    category: "经济发展",
    content: "新中国成立后，面临着经济基础薄弱的困难局面。通过几代人的艰苦奋斗，中国从农业国发展成为世界第二大经济体。",
    historicalDate: "1949年以后",
    relatedFigures: ["陈云", "李富春"],
    significance: "创造了人类发展史上的经济奇迹。",
    funFacts: ["第一个五年计划奠定了工业基础", "改革开放释放了经济活力", "新时代经济发展质量不断提升"],
    imageDescription: "新中国早期工业建设的热火朝天场面",
  },
  新中国教育发展: {
    id: "新中国教育发展",
    title: "教育事业的跨越式发展",
    category: "教育事业",
    content:
      "新中国成立后，教育事业得到了前所未有的发展。从扫盲运动到义务教育普及，再到高等教育的蓬勃发展，为国家建设培养了大批人才。",
    historicalDate: "1949年以后",
    relatedFigures: ["马叙伦", "蒋南翔"],
    significance: "为国家现代化建设提供了强有力的人才支撑。",
    funFacts: ["扫盲运动让数亿人摆脱了文盲", "恢复高考改变了无数人的命运", "义务教育的普及提高了全民素质"],
    imageDescription: "新中国早期的扫盲班学习场景",
  },
  文化传承理念: {
    id: "文化传承理念",
    title: "继承与发展中华文化",
    category: "文化建设",
    content: "新中国在文化建设中坚持继承优秀传统文化与发展社会主义先进文化相结合，形成了独具特色的文化发展道路。",
    historicalDate: "1949年以后",
    relatedFigures: ["郭沫若", "茅盾"],
    significance: "保持了文化的连续性，增强了民族文化自信。",
    funFacts: ["保护了大量文物古迹", "传统艺术得到传承和发展", "形成了社会主义文化体系"],
    imageDescription: "传统文化与现代文明相结合的文化活动场面",
  },
  科技强国战略: {
    id: "科技强国战略",
    title: "向科学技术现代化进军",
    category: "科技创新",
    content: "新中国确立了科技强国的发展战略，从'向科学进军'到建设创新型国家，科技创新成为国家发展的重要驱动力。",
    historicalDate: "1956年以后",
    relatedFigures: ["钱学森", "邓稼先"],
    significance: "推动了国家现代化进程，提升了综合国力。",
    funFacts: ["'两弹一星'展现了中国科技实力", "载人航天实现了飞天梦想", "高铁、5G等技术领先世界"],
    imageDescription: "科学家们在实验室进行科技创新研究",
  },
  建设使命感: {
    id: "建设使命感",
    title: "建设社会主义现代化国家",
    category: "经济发展",
    content: "新中国成立后，全国人民怀着强烈的使命感投入到社会主义建设中。每个人都为国家的发展贡献自己的力量。",
    historicalDate: "1949年以后",
    relatedFigures: ["雷锋", "王进喜"],
    significance: "形成了全民建设的强大合力。",
    funFacts: ["涌现出无数建设英雄", "艰苦奋斗成为时代精神", "集体主义精神得到弘扬"],
    imageDescription: "建设者们在工地上挥汗如雨的劳动场面",
  },
  文化建设思考: {
    id: "文化建设思考",
    title: "社会主义文化建设的思考",
    category: "文化建设",
    content: "新中国的文化建设需要处理好传统与现代、民族与世界的关系，建设具有中国特色的社会主义文化。",
    historicalDate: "1949年以后",
    relatedFigures: ["周扬", "夏衍"],
    significance: "为文化发展指明了方向。",
    funFacts: ["提出了'百花齐放、百家争鸣'方针", "重视文艺为人民服务", "促进了文化的繁荣发展"],
    imageDescription: "文化工作者讨论文化建设方向的会议场面",
  },
  科技发展思考: {
    id: "科技发展思考",
    title: "科技现代化的战略思考",
    category: "科技创新",
    content: "新中国确立了科技现代化的发展目标，强调科技是第一生产力，要走自主创新的发展道路。",
    historicalDate: "1950年代以后",
    relatedFigures: ["聂荣臻", "周培源"],
    significance: "为科技发展奠定了战略基础。",
    funFacts: ["制定了科技发展长远规划", "重视基础科学研究", "培养了大批科技人才"],
    imageDescription: "科技工作者在研究所进行科学研究",
  },
}

export function getKnowledgeItem(id: string): KnowledgeItem | null {
  return knowledgeDatabase[id] || null
}

export function getKnowledgeByCategory(category: KnowledgeItem["category"]): KnowledgeItem[] {
  return Object.values(knowledgeDatabase).filter((item) => item.category === category)
}

export function getAllKnowledgeItems(): KnowledgeItem[] {
  return Object.values(knowledgeDatabase)
}

export function getKnowledgeCategories(): KnowledgeItem["category"][] {
  return ["国旗", "国歌", "开国大典", "政治制度", "文化建设", "经济发展", "科技创新", "教育事业", "国际关系"]
}
