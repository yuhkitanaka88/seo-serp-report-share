(() => {
  "use strict";

  const ROUTE = normalizeRoute(window.PROTOTYPE_ROUTE || location.pathname);
  const ROOT = window.PROTOTYPE_ROOT || "./";

  const categoryPages = {
    language: {
      route: "/business/lag-list/",
      title: "言語・ツール別研修",
      short: "言語・ツール",
      icon: "</>",
      description: "Java、Python、生成AI、ChatGPT、Claudeなど、習得したい技術やツールから研修を探します。",
      examples: ["生成AI・ChatGPT", "Python", "Java", "Claude"]
    },
    hierarchy: {
      route: "/business/hie-list/",
      title: "階層別研修",
      short: "階層",
      icon: "↗",
      description: "内定者、新入社員、若手、管理職など、受講者の成長段階に合わせて研修を探します。",
      examples: ["内定者", "新入社員", "全社員", "管理職"]
    },
    theme: {
      route: "/business/thm-list/",
      title: "テーマ別研修",
      short: "テーマ",
      icon: "◎",
      description: "AI・データ分析、DX、業務効率化、セキュリティなど、解決したい課題から研修を探します。",
      examples: ["AI・データ分析", "DX", "業務効率化", "セキュリティ"]
    },
    occupation: {
      route: "/business/occ-list/",
      title: "職種別研修",
      short: "職種",
      icon: "♙",
      description: "AIエンジニア、データサイエンティスト、PMなど、育成したい職種から研修を探します。",
      examples: ["AIエンジニア", "データ人材", "PM", "Webエンジニア"]
    }
  };

  const deliveryPages = {
    customize: {
      route: "/business/customize/",
      title: "カスタマイズ研修",
      icon: "✦",
      summary: "企業の課題、対象者、期間、技術環境に合わせて研修を個別設計します。",
      features: ["課題・到達目標から設計", "オンライン・現地・ハイブリッド", "既存研修の組み合わせ", "進捗・成果のレポート"]
    },
    package: {
      route: "/business/package-it/",
      title: "パッケージ研修",
      icon: "▦",
      summary: "標準化された育成人材像とカリキュラムを、企業単位で導入します。",
      features: ["育成人材像が明確", "導入検討がしやすい", "標準カリキュラム", "複数名の一括育成"]
    },
    open: {
      route: "/open/",
      title: "公開講座",
      icon: "◉",
      summary: "開催日が決まった講座へ、1名から参加できる研修形態です。",
      features: ["1名から参加", "開催日・定員制", "他社受講者と合同", "すぐに申し込み可能"]
    }
  };


  const seoFacetRoutes = [
    {
      route: "/business/ai-training/online/",
      title: "オンラインAI研修",
      shortTitle: "オンライン",
      keyword: "AI研修 オンライン",
      description: "オンラインで実施できる法人向けAI研修を、対象者・目的・ツール別に比較する候補ページです。",
      filters: { formats: ["オンライン"] },
      indexable: false,
      canonical: "https://codecamp.jp/business/ai-training/online/",
      status: "candidate",
      reason: "案Aの幹構造には含めない。SVは限定的で実施形式属性のため、独自内容・広告根拠が揃うまでnoindex候補。"
    },
    {
      route: "/business/ai-training/for-engineers/",
      title: "エンジニア向けAI研修",
      shortTitle: "エンジニア向け",
      keyword: "エンジニア向けAI研修",
      description: "AI開発、生成AIエンジニア、AI駆動開発に関連する研修を比較する候補ページです。",
      filters: { audiences: ["エンジニア"] },
      indexable: false,
      canonical: "https://codecamp.jp/business/ai-training/for-engineers/",
      status: "candidate",
      reason: "静的URLは確保するが、専用カリキュラム・事例・FAQ・検索需要が揃うまではnoindex。"
    },
    {
      route: "/business/ai-training/for-all-employees/",
      title: "全社員向けAI研修",
      shortTitle: "全社員向け",
      keyword: "全社員向けAI研修",
      description: "AIリテラシーと生成AI業務活用を中心に、全社員向け研修を比較する候補ページです。",
      filters: { audiences: ["全社員"] },
      indexable: false,
      canonical: "https://codecamp.jp/business/ai-training/for-all-employees/",
      status: "candidate",
      reason: "全社員向け固有の導入事例・研修設計・FAQが不足する段階ではnoindex。"
    },
    {
      route: "/business/ai-training/for-new-employees/",
      title: "新入社員向けAI研修",
      shortTitle: "新入社員向け",
      keyword: "新入社員 AI研修",
      description: "新入社員向けのAIリテラシー・生成AI活用研修を比較する候補ページです。",
      filters: { audiences: ["新入社員"] },
      indexable: false,
      canonical: "https://codecamp.jp/business/ai-training/for-new-employees/",
      status: "candidate",
      reason: "検索需要と専用商品が確認できるまでnoindex。新入社員属性だけで薄いページを作らない。"
    }
  ];

  const staticFilterDestinations = [
    { label: "AI研修", route: "/business/ai-training/", canonical: "https://codecamp.jp/business/ai-training/", indexable: true, aiState: {} },
    { label: "生成AI研修", route: "/business/lag-generative-ai-chatgpt/", canonical: "https://codecamp.jp/business/lag-generative-ai-chatgpt/", indexable: true, aiState: { tools: "生成AI" } },
    { label: "ChatGPT研修", route: "/business/lag-ai-chatgpt/", canonical: "https://codecamp.jp/business/lag-ai-chatgpt/", indexable: true, aiState: { tools: "ChatGPT" } },
    { label: "Claude研修", route: "/business/claude/", canonical: "https://codecamp.jp/business/claude/", indexable: true, aiState: { tools: "Claude" } },
    { label: "AIリテラシー研修", route: "/business/thm-ai-literacy/", canonical: "https://codecamp.jp/business/thm-ai-literacy/", indexable: true, aiState: { goals: "AIリテラシー" } },
    { label: "AIエンジニア研修", route: "/business/occ-ai-engineer/", canonical: "https://codecamp.jp/business/occ-ai-engineer/", indexable: true, aiState: { goals: "AI開発", audiences: "エンジニア" } },
    ...seoFacetRoutes.map((item) => ({
      label: item.title,
      route: item.route,
      canonical: item.canonical,
      indexable: item.indexable,
      aiState: Object.fromEntries(Object.entries(item.filters).map(([key, values]) => [key, values[0]]))
    }))
  ];

  const trainings = [
    {
      id: "generative-ai",
      route: "/business/lag-generative-ai-chatgpt/",
      title: "生成AIビジネス活用研修",
      icon: "✦",
      status: "existing",
      primaryCategory: "language",
      categories: ["language", "theme", "hierarchy"],
      summary: "生成AIの基礎から、業務課題に合わせたプロンプト設計・活用までを実践します。",
      heroLead: "生成AIを理解するだけでなく、実際の業務で使い成果につなげる法人向け研修です。",
      themes: ["生成AI", "AI活用", "業務効率化"],
      tools: ["ChatGPT", "Gemini", "生成AI"],
      audiences: ["全社員", "新入社員", "非エンジニア"],
      roles: ["人事", "営業", "企画", "管理部門"],
      goals: ["AIリテラシー", "業務活用", "業務効率化"],
      delivery: ["customize", "package"],
      formats: ["オンライン", "現地", "ハイブリッド"],
      level: "入門〜実践",
      duration: "2か月〜（調整可）",
      keywords: { primary: "生成AI研修", secondary: ["生成AI活用研修", "AI活用研修", "法人向け生成AI研修"] },
      outcomes: ["生成AIの仕組みとリスクを説明できる", "目的に応じたプロンプトを設計できる", "自社業務へ生成AIを適用できる", "チーム内で安全な活用ルールを共有できる"],
      curriculum: [
        ["生成AIの基礎と利用上の注意", "生成AI・LLMの基本構造、得意・不得意、情報管理と著作権などを理解します。"],
        ["プロンプト設計", "要件、前提、出力形式、検証条件を整理し、再利用できるプロンプトを設計します。"],
        ["業務ユースケース演習", "文章作成、調査、分析、企画、会議準備など、自社に近い課題で演習します。"],
        ["定着とガバナンス", "研修後に継続活用するためのルール、共有方法、成果確認の考え方を整理します。"]
      ],
      related: ["chatgpt", "claude", "automation", "ai-literacy"],
      openCourses: ["generative-ai-for-business"]
    },
    {
      id: "chatgpt",
      route: "/business/lag-ai-chatgpt/",
      title: "ChatGPT基礎・実践研修",
      icon: "GPT",
      status: "existing",
      primaryCategory: "language",
      categories: ["language", "theme", "hierarchy"],
      summary: "ChatGPTの基本操作、プロンプト、タスク自動化を業務別の演習で習得します。",
      heroLead: "ChatGPT固有の機能とプロンプト設計に焦点を当てた、企業向けの基礎・実践研修です。",
      themes: ["生成AI", "業務効率化"],
      tools: ["ChatGPT"],
      audiences: ["全社員", "新入社員", "非エンジニア"],
      roles: ["営業", "人事", "企画", "管理部門"],
      goals: ["業務活用", "業務効率化"],
      delivery: ["customize", "package"],
      formats: ["オンライン", "現地", "ハイブリッド"],
      level: "基礎〜実践",
      duration: "1日〜2か月",
      keywords: { primary: "ChatGPT研修", secondary: ["ChatGPT活用研修", "法人向けChatGPT研修", "ChatGPT講習"] },
      outcomes: ["ChatGPTの機能を業務に応じて使い分けられる", "精度を高めるプロンプトを作成できる", "定型業務を効率化できる", "出力を検証し安全に利用できる"],
      curriculum: [
        ["ChatGPTの基本", "画面操作、モデルの特徴、ファイル利用、出力の検証方法を学びます。"],
        ["プロンプト基礎", "役割、制約、文脈、出力形式を指定する基本パターンを習得します。"],
        ["業務効率化演習", "メール、議事録、調査、資料構成、表データの整理などを実践します。"],
        ["チーム活用", "テンプレート共有、利用ルール、成果の振り返り方法を設計します。"]
      ],
      related: ["generative-ai", "claude", "automation"],
      openCourses: ["generative-ai-for-business"]
    },
    {
      id: "claude",
      route: "/business/claude/",
      title: "Claude実践研修",
      icon: "C",
      status: "existing",
      primaryCategory: "language",
      categories: ["language", "theme", "occupation"],
      summary: "Claudeによる業務活用からClaude Code・MCPを使ったAI駆動開発まで学びます。",
      heroLead: "全社員向けの業務活用と、エンジニア向けのAI駆動開発を目的別に設計できる研修です。",
      themes: ["生成AI", "AI開発", "業務効率化"],
      tools: ["Claude", "Claude Code", "MCP"],
      audiences: ["全社員", "エンジニア"],
      roles: ["エンジニア", "企画", "管理部門"],
      goals: ["業務活用", "AI開発", "開発効率化"],
      delivery: ["customize", "package"],
      formats: ["オンライン", "現地", "ハイブリッド"],
      level: "基礎〜応用",
      duration: "1日〜2か月",
      keywords: { primary: "Claude研修", secondary: ["Claude Code研修", "Claude活用研修", "法人向けClaude研修"] },
      outcomes: ["Claudeの特性を理解して業務へ適用できる", "長文・ファイルを活用した作業を効率化できる", "Claude Codeによる開発フローを実践できる", "MCPを含む連携方法を理解できる"],
      curriculum: [
        ["Claudeの基本と業務活用", "文書作成、分析、情報整理などのユースケースを学びます。"],
        ["AIコワーク", "複雑なタスクを分解し、Claudeと協働して成果物を作成します。"],
        ["Claude Code", "コード理解、修正、テスト、レビューの開発フローを実践します。"],
        ["MCPと連携", "外部データやツールと接続する基本設計、安全性、運用上の注意を学びます。"]
      ],
      related: ["generative-ai", "chatgpt", "ai-engineer"],
      openCourses: ["ai-editor-coding-intensive"]
    },
    {
      id: "ai-data",
      route: "/business/thm-ai-data-analysis/",
      title: "AI・データ分析研修",
      icon: "∑",
      status: "existing",
      primaryCategory: "theme",
      categories: ["theme", "occupation"],
      summary: "AI・機械学習・統計・データ活用の基礎を理解し、企画や意思決定に活用します。",
      heroLead: "AIとデータ分析の基本から、活用テーマの設計・判断までを体系的に学ぶ研修です。",
      themes: ["AI・データ分析", "機械学習", "データ活用"],
      tools: ["AI", "機械学習", "統計"],
      audiences: ["全社員", "企画担当", "エンジニア"],
      roles: ["企画", "データ人材", "エンジニア"],
      goals: ["AIリテラシー", "データ活用", "企画・判断"],
      delivery: ["customize", "package"],
      formats: ["オンライン", "現地", "ハイブリッド"],
      level: "入門〜実践",
      duration: "1日〜3か月",
      keywords: { primary: "AI・データ分析研修", secondary: ["機械学習研修", "AIデータ分析研修", "データ分析研修"] },
      outcomes: ["AIと機械学習の基本を説明できる", "データ分析の進め方を理解できる", "活用可能な業務テーマを判断できる", "分析結果を意思決定に利用できる"],
      curriculum: [
        ["AI・機械学習の基礎", "AI、機械学習、生成AIの違いと代表的な利用例を整理します。"],
        ["データ分析の基礎", "データの種類、前処理、集計、可視化、統計の基本を学びます。"],
        ["活用テーマの設計", "自社課題に対してAI・データ分析が適するかを判断します。"],
        ["意思決定と評価", "分析結果の読み方、評価指標、過信を避けるための注意点を学びます。"]
      ],
      related: ["python-data", "data-engineer", "dx"],
      openCourses: ["ai-machine-learning-camp"]
    },
    {
      id: "python-data",
      route: "/business/thm-python-data-science/",
      title: "Pythonデータサイエンス研修",
      icon: "Py",
      status: "existing",
      primaryCategory: "theme",
      categories: ["theme", "language", "occupation"],
      summary: "Pythonを使ったデータ加工、分析、可視化、機械学習の実装を習得します。",
      heroLead: "Pythonによるデータ分析を、演習と成果物制作を通じて実務レベルまで学ぶ研修です。",
      themes: ["データ分析", "機械学習", "データサイエンス"],
      tools: ["Python", "Pandas", "機械学習"],
      audiences: ["エンジニア", "データ人材"],
      roles: ["データ人材", "エンジニア"],
      goals: ["データ活用", "AI開発"],
      delivery: ["customize", "package"],
      formats: ["オンライン", "現地", "ハイブリッド"],
      level: "基礎〜実践",
      duration: "2か月〜",
      keywords: { primary: "Pythonデータサイエンス研修", secondary: ["Pythonデータ分析研修", "Python機械学習研修"] },
      outcomes: ["Pythonでデータを加工できる", "集計・可視化を実装できる", "機械学習モデルを試作できる", "分析結果を説明できる"],
      curriculum: [
        ["Python・Pandas", "データ読み込み、加工、集計の基本を実装します。"],
        ["可視化・統計", "グラフ作成と基本統計量を使ってデータを理解します。"],
        ["機械学習", "代表的な教師あり学習を実装し、評価指標を確認します。"],
        ["分析プロジェクト", "実データに近い課題を使って分析レポートを作成します。"]
      ],
      related: ["ai-data", "python", "data-engineer"],
      openCourses: ["ai-machine-learning-camp"]
    },
    {
      id: "automation",
      route: "/business/thm-automation/",
      title: "業務効率化・自動化研修",
      icon: "⚙",
      status: "existing",
      primaryCategory: "theme",
      categories: ["theme", "hierarchy"],
      summary: "業務プロセスを整理し、生成AI・GAS・各種ツールを使って改善・自動化します。",
      heroLead: "ツールを学ぶだけでなく、業務整理から改善施策の実装までを行う研修です。",
      themes: ["業務効率化", "自動化", "生成AI"],
      tools: ["生成AI", "GAS", "自動化"],
      audiences: ["全社員", "非エンジニア"],
      roles: ["管理部門", "営業", "人事", "企画"],
      goals: ["業務効率化", "業務活用"],
      delivery: ["customize", "package"],
      formats: ["オンライン", "現地", "ハイブリッド"],
      level: "入門〜実践",
      duration: "1日〜2か月",
      keywords: { primary: "業務効率化研修", secondary: ["業務改善研修", "自動化研修", "AI業務効率化研修"] },
      outcomes: ["業務を可視化できる", "改善対象を選定できる", "生成AIやGASで自動化を試作できる", "効果を評価し継続改善できる"],
      curriculum: [
        ["業務プロセスの整理", "現状業務、時間、頻度、課題を可視化します。"],
        ["改善手段の選択", "生成AI、GAS、ノーコード、既存機能の適切な使い分けを学びます。"],
        ["自動化演習", "繰り返し業務を題材に、小さな自動化を実装します。"],
        ["効果測定", "削減時間、品質、運用負荷を確認し改善計画を作成します。"]
      ],
      related: ["generative-ai", "chatgpt", "dx"],
      openCourses: ["generative-ai-for-business"]
    },
    {
      id: "data-engineer",
      route: "/business/occ-data-engineer-scientist/",
      title: "データエンジニア・データサイエンティスト研修",
      icon: "DB",
      status: "existing",
      primaryCategory: "occupation",
      categories: ["occupation", "theme", "language"],
      summary: "データ基盤、分析、統計、機械学習を体系的に学び、専門人材を育成します。",
      heroLead: "データを収集・整備・分析し、事業価値へつなげる専門人材を育成する研修です。",
      themes: ["データ分析", "データ基盤", "機械学習"],
      tools: ["SQL", "Python", "クラウド"],
      audiences: ["エンジニア", "データ人材"],
      roles: ["データ人材", "エンジニア"],
      goals: ["データ活用", "専門人材育成"],
      delivery: ["customize", "package"],
      formats: ["オンライン", "現地", "ハイブリッド"],
      level: "基礎〜応用",
      duration: "3か月〜",
      keywords: { primary: "データサイエンティスト研修", secondary: ["データエンジニア研修", "データ人材育成研修"] },
      outcomes: ["データ基盤の基本を理解できる", "SQL・Pythonでデータを扱える", "分析・機械学習を実装できる", "業務課題に対して分析提案ができる"],
      curriculum: [
        ["データ基盤", "データ収集、保存、加工、品質管理の基本を学びます。"],
        ["SQL・Python", "分析に必要なデータ抽出と加工を実装します。"],
        ["統計・機械学習", "分析・予測の代表的な手法と評価を学びます。"],
        ["プロジェクト演習", "課題設定から分析、報告までの一連の流れを実践します。"]
      ],
      related: ["python-data", "ai-data", "ai-engineer"],
      openCourses: ["generative-ai-engineer-camp"]
    },
    {
      id: "dx",
      route: "/business/dx/",
      title: "DX人材育成研修",
      icon: "DX",
      status: "existing",
      primaryCategory: "theme",
      categories: ["theme", "hierarchy", "occupation"],
      summary: "DXリテラシーから、業務変革・データ活用・推進人材育成までを体系化します。",
      heroLead: "デジタル技術を学ぶだけでなく、組織と業務を変革できるDX人材を育成します。",
      themes: ["DX", "デジタル人材", "業務変革"],
      tools: ["DX", "データ", "AI"],
      audiences: ["全社員", "管理職", "DX推進担当"],
      roles: ["企画", "管理職", "DX推進"],
      goals: ["DX推進", "人材育成", "業務変革"],
      delivery: ["customize", "package"],
      formats: ["オンライン", "現地", "ハイブリッド"],
      level: "入門〜実践",
      duration: "1日〜6か月",
      keywords: { primary: "DX研修", secondary: ["DX人材育成", "DX人材育成研修", "DX推進研修"] },
      outcomes: ["DXの目的を共通言語化できる", "業務課題をデジタル施策へ落とし込める", "DXプロジェクトを推進できる", "職種・階層別の育成計画を作成できる"],
      curriculum: [
        ["DX基礎・リテラシー", "DXの目的、事例、デジタル技術、変革の考え方を理解します。"],
        ["業務課題の発見", "顧客・業務プロセスを整理し、変革テーマを設定します。"],
        ["データ・AI活用", "データ分析、生成AI、クラウドなどの適用可能性を検討します。"],
        ["推進計画", "ロードマップ、体制、KPI、定着方法を設計します。"]
      ],
      related: ["ai-data", "automation", "generative-ai"],
      openCourses: ["generative-ai-for-business"]
    },
    {
      id: "ai-engineer",
      route: "/business/occ-ai-engineer/",
      title: "AIエンジニア研修",
      icon: "AI",
      status: "candidate",
      primaryCategory: "occupation",
      categories: ["occupation", "theme", "language"],
      summary: "LLM、RAG、AIエージェント、API連携を学び、AIアプリを開発できる人材を育成します。",
      heroLead: "生成AIを使う人材ではなく、AIアプリケーションを設計・開発・評価できる人材を育成する新設候補です。",
      themes: ["AI開発", "生成AI", "機械学習"],
      tools: ["Python", "RAG", "AIエージェント", "API"],
      audiences: ["エンジニア"],
      roles: ["AIエンジニア", "エンジニア"],
      goals: ["AI開発", "専門人材育成"],
      delivery: ["customize", "package"],
      formats: ["オンライン", "現地", "ハイブリッド"],
      level: "実践〜応用",
      duration: "2か月〜",
      keywords: { primary: "AIエンジニア研修", secondary: ["AIエンジニア育成研修", "AI開発研修", "生成AIエンジニア研修"] },
      outcomes: ["LLMアプリの構成を設計できる", "RAGを実装・評価できる", "AIエージェントを試作できる", "安全性と運用を考慮できる"],
      curriculum: [
        ["LLM・API基礎", "LLMの特性、API、トークン、構成要素を理解します。"],
        ["RAG", "検索、埋め込み、ベクトルデータベース、回答評価を実装します。"],
        ["AIエージェント", "ツール利用、ワークフロー、状態管理の基本を実践します。"],
        ["開発・評価・運用", "テスト、監視、コスト、セキュリティを含む開発プロセスを学びます。"]
      ],
      related: ["claude", "data-engineer", "python-data"],
      openCourses: ["generative-ai-engineer-camp", "ai-editor-coding-intensive"]
    },
    {
      id: "ai-literacy",
      route: "/business/thm-ai-literacy/",
      title: "AIリテラシー研修",
      icon: "i",
      status: "candidate",
      primaryCategory: "theme",
      categories: ["theme", "hierarchy"],
      summary: "全社員が生成AIを安全かつ効果的に利用するための共通知識と判断基準を学びます。",
      heroLead: "AIの基礎、利用ルール、リスク、業務活用の入口を全社員へ展開する新設候補です。",
      themes: ["AIリテラシー", "生成AI", "ガバナンス"],
      tools: ["生成AI", "ChatGPT"],
      audiences: ["全社員", "新入社員", "管理職"],
      roles: ["全職種"],
      goals: ["AIリテラシー", "安全な活用"],
      delivery: ["customize", "package"],
      formats: ["オンライン", "現地", "ハイブリッド"],
      level: "入門",
      duration: "半日〜1日",
      keywords: { primary: "AIリテラシー研修", secondary: ["生成AIリテラシー研修", "全社員向けAI研修", "AI基礎研修"] },
      outcomes: ["AI・生成AIの基本を説明できる", "利用時のリスクを判断できる", "社内ルールに沿って活用できる", "業務での利用可能性を発見できる"],
      curriculum: [
        ["AI・生成AI基礎", "AI、機械学習、生成AIの違いを理解します。"],
        ["リスクとルール", "機密情報、著作権、誤情報、説明責任を学びます。"],
        ["基本的な活用", "文章、要約、整理、アイデア出しなどを体験します。"],
        ["社内活用への接続", "自社ルールと利用シーンを確認し、次の学習へつなげます。"]
      ],
      related: ["generative-ai", "chatgpt", "dx"],
      openCourses: ["generative-ai-for-business"]
    },
    {
      id: "java",
      route: "/business/lag-java/",
      title: "Java基礎・実践研修",
      icon: "J",
      status: "existing",
      primaryCategory: "language",
      categories: ["language", "occupation", "hierarchy"],
      summary: "Java文法、オブジェクト指向、Webアプリケーション開発を段階的に学びます。",
      heroLead: "未経験者から実務に必要なJava開発スキルを育成する法人向け研修です。",
      themes: ["Web開発"], tools: ["Java", "Spring Boot"], audiences: ["新入社員", "エンジニア"], roles: ["エンジニア"], goals: ["エンジニア育成"], delivery: ["customize", "package"], formats: ["オンライン", "現地", "ハイブリッド"], level: "基礎〜実践", duration: "2か月〜", keywords: { primary: "Java研修", secondary: ["Java新人研修", "Spring Boot研修"] }, outcomes: ["Java文法を理解できる", "オブジェクト指向で設計できる", "Webアプリを開発できる"], curriculum: [["Java基礎", "文法と基本APIを学びます。"], ["オブジェクト指向", "クラス設計と責務分割を学びます。"], ["Web開発", "Spring Bootを使ってアプリを開発します。"]], related: ["python", "project-manager"], openCourses: ["engineer-foundation-camp"]
    },
    {
      id: "python",
      route: "/business/lag-python/",
      title: "Python基礎・実践研修",
      icon: "Py",
      status: "existing",
      primaryCategory: "language",
      categories: ["language", "occupation", "hierarchy"],
      summary: "Python文法からWeb・データ活用への応用までを習得します。",
      heroLead: "Pythonを初めて学ぶ方が、実務でコードを書ける状態を目指す研修です。",
      themes: ["プログラミング"], tools: ["Python"], audiences: ["新入社員", "エンジニア"], roles: ["エンジニア", "データ人材"], goals: ["エンジニア育成"], delivery: ["customize", "package"], formats: ["オンライン", "現地", "ハイブリッド"], level: "基礎〜実践", duration: "2か月〜", keywords: { primary: "Python研修", secondary: ["Python法人研修", "Python新人研修"] }, outcomes: ["Python文法を理解できる", "簡単なプログラムを設計できる", "データ処理へ応用できる"], curriculum: [["Python基礎", "文法と標準機能を学びます。"], ["設計・テスト", "関数、クラス、テストを学びます。"], ["応用演習", "Webまたはデータ活用へ応用します。"]], related: ["python-data", "java"], openCourses: ["engineer-foundation-camp"]
    },
    {
      id: "security",
      route: "/business/thm-security/",
      title: "情報セキュリティ研修",
      icon: "◆",
      status: "existing",
      primaryCategory: "theme",
      categories: ["theme", "hierarchy"],
      summary: "情報資産を守るための基本知識と、職場で必要な判断・行動を学びます。",
      heroLead: "全社員からエンジニアまで、役割に合わせたセキュリティ知識を習得します。",
      themes: ["セキュリティ"], tools: ["情報セキュリティ"], audiences: ["全社員", "新入社員"], roles: ["全職種", "エンジニア"], goals: ["リテラシー"], delivery: ["customize", "package"], formats: ["オンライン", "現地", "ハイブリッド"], level: "入門〜実践", duration: "半日〜", keywords: { primary: "情報セキュリティ研修", secondary: ["セキュリティ研修", "新入社員セキュリティ研修"] }, outcomes: ["代表的な脅威を理解できる", "適切な情報管理ができる", "インシデント時に行動できる"], curriculum: [["基礎", "情報資産と脅威を学びます。"], ["日常業務", "メール、端末、クラウドの注意点を学びます。"], ["演習", "事例から判断と対応を学びます。"]], related: ["ai-literacy", "dx"], openCourses: []
    },
    {
      id: "project-manager",
      route: "/business/occ-project-manager/",
      title: "プロジェクトマネージャー育成研修",
      icon: "PM",
      status: "existing",
      primaryCategory: "occupation",
      categories: ["occupation", "hierarchy"],
      summary: "要件、計画、リスク、チームを管理し、プロジェクトを推進する力を育成します。",
      heroLead: "ITプロジェクトを計画し、関係者を巻き込みながら成果へ導く人材を育成します。",
      themes: ["プロジェクト管理"], tools: ["要件定義", "計画"], audiences: ["管理職", "エンジニア"], roles: ["PM", "エンジニア"], goals: ["マネジメント"], delivery: ["customize", "package"], formats: ["オンライン", "現地", "ハイブリッド"], level: "実践", duration: "1か月〜", keywords: { primary: "プロジェクトマネージャー研修", secondary: ["PM研修", "プロジェクト管理研修"] }, outcomes: ["計画を作成できる", "リスクを管理できる", "関係者を調整できる"], curriculum: [["計画", "目的、スコープ、日程を整理します。"], ["実行管理", "進捗、品質、リスクを管理します。"], ["チーム", "コミュニケーションと意思決定を学びます。"]], related: ["java", "dx"], openCourses: []
    },
    {
      id: "shinsotsu",
      route: "/business/shinsotsu/",
      title: "新入社員IT・プログラミング研修",
      icon: "01",
      status: "existing",
      primaryCategory: "hierarchy",
      categories: ["hierarchy", "language", "occupation"],
      summary: "新入社員に必要なIT基礎、プログラミング、チーム開発を体系的に育成します。",
      heroLead: "配属後に自走できるIT人材を育成する、新入社員向けの総合研修です。",
      themes: ["新人育成"], tools: ["Java", "Python", "Web"], audiences: ["新入社員"], roles: ["エンジニア"], goals: ["新入社員育成"], delivery: ["customize", "package"], formats: ["オンライン", "現地", "ハイブリッド"], level: "入門〜実践", duration: "2か月〜", keywords: { primary: "新入社員IT研修", secondary: ["新入社員プログラミング研修", "新人エンジニア研修"] }, outcomes: ["IT基礎を理解できる", "プログラムを実装できる", "チーム開発を経験できる"], curriculum: [["IT基礎", "コンピュータとネットワークを学びます。"], ["プログラミング", "言語基礎とアプリ開発を学びます。"], ["チーム開発", "Gitとレビューを使って開発します。"]], related: ["base", "java", "python"], openCourses: ["engineer-foundation-camp"]
    },
    {
      id: "base",
      route: "/business/base/",
      title: "内定者向けプログラミング研修",
      icon: "00",
      status: "existing",
      primaryCategory: "hierarchy",
      categories: ["hierarchy", "language"],
      summary: "入社前にプログラミングとITの基礎へ触れ、学習習慣を形成します。",
      heroLead: "内定期間を活用して、入社後のIT研修をスムーズに開始するための研修です。",
      themes: ["内定者育成"], tools: ["プログラミング"], audiences: ["内定者"], roles: ["エンジニア候補"], goals: ["内定者育成"], delivery: ["customize", "package"], formats: ["オンライン"], level: "入門", duration: "1か月〜", keywords: { primary: "内定者プログラミング研修", secondary: ["内定者IT研修"] }, outcomes: ["学習習慣を形成できる", "基本的なコードを読める", "入社後研修へ準備できる"], curriculum: [["IT入門", "ITと開発の基本を学びます。"], ["プログラミング体験", "小さな課題を実装します。"], ["学習計画", "入社までの継続学習を設計します。"]], related: ["shinsotsu", "java", "python"], openCourses: []
    }
  ];

  const openCourses = [
    { id: "generative-ai-for-business", route: "/open/generative-ai-for-business/", title: "生成AI活用 for Biz", icon: "✦", summary: "非エンジニアが生成AIを業務で活用するための実践公開講座です。", audience: "ビジネス職・管理部門", duration: "1日〜", keywords: ["生成AI公開講座", "生成AI講座"], relatedTraining: "generative-ai" },
    { id: "generative-ai-engineer-camp", route: "/open/generative-ai-engineer-camp/", title: "生成AIエンジニア養成Camp", icon: "AI", summary: "RAGやAIエージェントを使った生成AIアプリケーション開発を学びます。", audience: "エンジニア", duration: "複数日", keywords: ["生成AIエンジニア講座", "RAG講座"], relatedTraining: "ai-engineer" },
    { id: "ai-machine-learning-camp", route: "/open/ai-machine-learning-camp/", title: "AI機械学習Camp", icon: "∑", summary: "AI・機械学習の基礎と、業務での活用判断を学ぶ公開講座です。", audience: "AI初学者・企画担当", duration: "1日〜", keywords: ["AI機械学習講座", "AI基礎講座"], relatedTraining: "ai-data" },
    { id: "ai-editor-coding-intensive", route: "/open/ai-editor-coding-intensive/", title: "AIエディタ活用コーディング集中講座", icon: "</>", summary: "AIエディタを使った実装・レビュー・改善の開発フローを学びます。", audience: "エンジニア", duration: "集中講座", keywords: ["AIエディタ講座", "AIコーディング講座"], relatedTraining: "claude" },
    { id: "engineer-foundation-camp", route: "/open/engineer-foundation-camp/", title: "ITエンジニア育成Camp", icon: "01", summary: "新入社員向けの相乗り型公開研修で、IT・開発基礎を学びます。", audience: "新入社員", duration: "複数週間", keywords: ["新入社員公開研修", "ITエンジニア研修"], relatedTraining: "shinsotsu" }
  ];

  const fixedPages = {
    "/business/about/": { title: "法人向け研修事業について", eyebrow: "ABOUT", lead: "CodeCampの法人向け研修における運営体制、研修形態、実施形式をご案内します。", blocks: [["3つの研修形態", "カスタマイズ研修、パッケージ研修、公開講座を目的に合わせて選択できます。"], ["実施形式", "オンライン、現地、ハイブリッドに対応し、対象者や演習内容に合わせて設計します。"], ["学習管理", "CodeCamp Insightを活用し、進捗、課題、成果を可視化します。"]] },
    "/business/voice/": { title: "企業・法人向けIT研修の導入事例", eyebrow: "CASE STUDIES", lead: "研修の目的、対象者、実施方法、受講後の変化を事例形式で紹介します。", blocks: [["製造業のAI活用", "全社員向けAIリテラシーから部門別の業務活用まで段階的に実施。"], ["IT企業のAI駆動開発", "エンジニア向けにClaude Codeと生成AI開発の実践研修を実施。"], ["新入社員エンジニア育成", "基礎学習とチーム開発を組み合わせ、配属後の自走を支援。"]] },
    "/business/faq/": { title: "法人向け研修のよくある質問", eyebrow: "FAQ", lead: "カリキュラム、費用、実施形式、カスタマイズ、公開講座に関する主な質問です。", blocks: [["カリキュラムは変更できますか？", "カスタマイズ研修では、対象者や目的に合わせて内容・期間・演習を調整できます。"], ["オンラインと対面を組み合わせられますか？", "ハイブリッド形式として設計できます。講義、演習、発表の形式に合わせてご提案します。"], ["1名から参加できますか？", "公開講座は1名から参加できます。企業単位の導入はカスタマイズ・パッケージをご検討ください。"]] },
    "/business/codecamp-insight/": { title: "研修管理システム CodeCamp Insight", eyebrow: "LEARNING MANAGEMENT", lead: "受講進捗、課題、成果を可視化し、研修担当者向けレポートを支援します。", blocks: [["進捗の可視化", "受講状況や課題提出を一覧で確認できます。"], ["成果の確認", "テストや演習の結果を確認し、フォロー対象を発見できます。"], ["レポーティング", "研修終了後の報告に必要な情報を整理できます。"]] }
  };

  const tourSteps = [
    { route: "/business/", selector: "#ai-entry", title: "AIは一覧の条件", message: "ナビ並立の「AI研修」は置きません。研修を探すで言語・ツール=AIを選ぶと、ディレクトリURL /business/ai-training/ になります。" },
    { route: "/business/", selector: "#category-entry", title: "4つのカリキュラムカテゴリ", message: "言語・ツール、階層、テーマ、職種という4つの視点から同じ研修を発見できます。" },
    { route: "/business/training/", selector: "#masterFacetNav", title: "研修を探す（唯一の一覧入口）", message: "Trends風ファセットで絞り込みます。クエリURLは作らず、需要がある条件だけディレクトリ型URLへ遷移します。" },
    { route: "/business/ai-training/", selector: "#masterGrid", title: "AI条件のディレクトリ表現", message: "同じ一覧UXでタイトルは「AI研修を探す」。正規URLは /business/ai-training/ です。" },
    { route: "/business/lag-generative-ai-chatgpt/", selector: "#delivery-methods", title: "研修形態を選択", message: "同じカリキュラムでも、カスタマイズ、パッケージ、公開講座という異なる導入方法へ接続します。" },
    { route: "/open/", selector: "#open-courses", title: "公開講座へ接続", message: "公開講座は1名参加・日程確認という異なる検索意図を持ち、法人研修詳細と相互に接続します。" }
  ];

  const app = document.getElementById("app");
  if (!app) return;

  function normalizeRoute(value) {
    let route = String(value || "/").split("?")[0].split("#")[0];
    route = route.replace(/index\.html$/i, "");
    if (!route.startsWith("/")) route = `/${route}`;
    route = route.replace(/\/+/g, "/");
    if (!route.endsWith("/")) route += "/";
    return route;
  }

  function href(route) {
    const raw = String(route || "/");
    const hashIndex = raw.indexOf("#");
    const queryIndex = raw.indexOf("?");
    const cutPoints = [hashIndex, queryIndex].filter((value) => value >= 0);
    const pathEnd = cutPoints.length ? Math.min(...cutPoints) : raw.length;
    const pathPart = raw.slice(0, pathEnd) || "/";
    const suffix = raw.slice(pathEnd);
    const clean = normalizeRoute(pathPart).replace(/^\//, "");
    // ディレクトリURLではなくindex.htmlまで明記し、file://で直接開いても遷移可能にする。
    return `${ROOT}${clean}index.html${suffix}`;
  }


  function storageGet(key) {
    try { return window.sessionStorage.getItem(key); } catch { return null; }
  }

  function storageSet(key, value) {
    try { window.sessionStorage.setItem(key, value); } catch { /* storage unavailable */ }
  }

  function storageRemove(key) {
    try { window.sessionStorage.removeItem(key); } catch { /* storage unavailable */ }
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function trainingById(id) { return trainings.find((item) => item.id === id); }
  function courseById(id) { return openCourses.find((item) => item.id === id); }
  function isAITraining(item) {
    return item.themes.some((value) => /AI|生成AI|機械学習|データ|DX|自動化/.test(value)) || item.id === "ai-engineer" || item.id === "ai-literacy";
  }

  function icon(value) { return `<span aria-hidden="true">${escapeHtml(value)}</span>`; }
  function statusTag(item) {
    return item.status === "candidate"
      ? '<span class="tag tag-purple">新設候補</span>'
      : '<span class="tag tag-green">既存ページ</span>';
  }
  function tags(values, className = "") {
    return values.slice(0, 4).map((value) => `<span class="tag ${className}">${escapeHtml(value)}</span>`).join("");
  }

  function planALocationLabel() {
    if (ROUTE === "/business/") return "案A：/businessトップ";
    if (ROUTE === "/business/site-map/") return "案A：サイトマップ";
    if (ROUTE === "/business/ai-training/") return "案A：研修を探す（言語・ツール=AI のディレクトリURL）";
    if (ROUTE.startsWith("/business/ai-training/")) return "案A：研修を探すの下層ディレクトリ（静的LP候補）";
    if (ROUTE === "/business/training/") return "案A：研修を探す";
    const category = Object.values(categoryPages).find((item) => item.route === ROUTE);
    if (category) return `案A：4カテゴリ ＞ ${category.short}`;
    const delivery = Object.values(deliveryPages).find((item) => item.route === ROUTE);
    if (delivery) return `案A：3研修形態 ＞ ${delivery.title}`;
    if (ROUTE.startsWith("/open/")) return "案A：3研修形態 ＞ 公開講座";
    if (trainings.some((item) => item.route === ROUTE)) return "案A：研修詳細";
    return "案A：法人向け研修の関連ページ";
  }

  function shell(content, options = {}) {
    document.body.classList.add("wireframe-prototype");
    const title = options.title || "CodeCamp 法人向け研修プロトタイプ";
    const description = options.description || "CodeCampの法人向け研修サイト構造を確認する視覚プロトタイプです。";
    document.title = `${title} | CodeCamp Prototype`;
    const businessCurrent = ROUTE === "/business/" ? ' aria-current="page"' : "";
    const trainingCurrent = (
      ROUTE === "/business/training/"
      || ROUTE.startsWith("/business/ai-training/")
      || ["/business/lag-list/", "/business/hie-list/", "/business/thm-list/", "/business/occ-list/"].includes(ROUTE)
    ) ? ' aria-current="page"' : "";
    const openCurrent = ROUTE.startsWith("/open/") ? ' aria-current="page"' : "";
    const breadcrumbs = options.breadcrumbs || [];

    app.innerHTML = `
      <a class="skip-link" href="#main">本文へ移動</a>
      <header class="site-header">
        <div class="header-inner">
          <a class="brand" href="${href('/business/')}" aria-label="CodeCamp 法人向け研修トップ">
            <span class="brand-mark">C</span><span>CodeCamp Business</span>
          </a>
          <nav id="primaryNav" class="primary-nav" aria-label="主要ナビゲーション">
            <a href="${href('/business/')}"${businessCurrent}>法人向け研修</a>
            <a href="${href('/business/training/')}"${trainingCurrent}>研修を探す</a>
            <a href="${href('/business/site-map/')}">案Aサイトマップ</a>
            <a href="${href('/business/customize/')}">カスタマイズ</a>
            <a href="${href('/open/')}"${openCurrent}>公開講座</a>
            <a href="${ROOT}requirements/index.html">要件書</a>
          </nav>
          <div class="header-actions">
            <a class="button button-small requirements-link" href="${ROOT}requirements/index.html">要件書</a>
            <button id="siteMapOpen" class="button button-small" type="button">構造一覧</button>
            <a class="button button-primary button-small" href="${href('/business/faq/')}">お問い合わせ</a>
            <button id="menuButton" class="button button-small menu-button" type="button" aria-expanded="false" aria-controls="primaryNav">メニュー</button>
          </div>
        </div>
      </header>
      ${breadcrumbs.length ? `<div class="breadcrumbs-wrap"><nav class="breadcrumbs" aria-label="パンくず">${renderBreadcrumbs(breadcrumbs)}</nav></div>` : ""}
      <div class="prototype-scope" role="note"><div class="container"><strong>${escapeHtml(planALocationLabel())}</strong><span>この帯より下が利用者向けの画面イメージです。</span><a href="${href('/business/site-map/')}">案A全体を見る →</a></div></div>
      <main id="main">${content}</main>
      ${renderMobileCta(options.mobileCta)}
      ${renderFooter()}
      ${renderSiteMapDialog()}
      <button id="guideLauncher" class="guide-launcher" type="button">● 構造ガイド</button>
      <aside id="guidePanel" class="guide-panel" hidden aria-live="polite">
        <p id="guideProgress" class="guide-progress"></p>
        <h2 id="guideTitle"></h2>
        <p id="guideMessage"></p>
        <div class="guide-actions">
          <button id="guideEnd" class="button button-small" type="button">終了</button>
          <div class="guide-actions-group">
            <button id="guideBack" class="button button-small" type="button">戻る</button>
            <button id="guideNext" class="button button-primary button-small" type="button">次へ</button>
          </div>
        </div>
      </aside>
    `;
    bindGlobalInteractions();
  }

  function renderBreadcrumbs(items) {
    const all = [{ label: "トップ", route: "/business/" }, ...items];
    return all.map((item, index) => {
      const last = index === all.length - 1;
      return `${index ? '<span aria-hidden="true">›</span>' : ""}${last ? `<strong>${escapeHtml(item.label)}</strong>` : `<a href="${href(item.route)}">${escapeHtml(item.label)}</a>`}`;
    }).join("");
  }

  function renderMobileCta(config) {
    if (!config) return "";
    return `<div class="mobile-cta"><a class="button" href="${href(config.secondaryRoute || '/business/ai-training/')}">${escapeHtml(config.secondaryLabel || '関連研修')}</a><a class="button button-primary" href="${href(config.primaryRoute || '/business/faq/')}">${escapeHtml(config.primaryLabel || 'お問い合わせ')}</a></div>`;
  }

  function renderFooter() {
    return `
      <footer class="site-footer">
        <div class="container">
          <div class="footer-grid">
            <div><div class="footer-brand">CodeCamp Business</div><p class="footer-copy">現行の4カテゴリ、3研修形態、研修詳細を維持しながら、AI研修を横断的に探せる構造の視覚プロトタイプです。</p></div>
            <div class="footer-group"><h2>研修を探す</h2><a href="${href('/business/lag-list/')}">言語・ツール別</a><a href="${href('/business/hie-list/')}">階層別</a><a href="${href('/business/thm-list/')}">テーマ別</a><a href="${href('/business/occ-list/')}">職種別</a></div>
            <div class="footer-group"><h2>研修形態</h2><a href="${href('/business/customize/')}">カスタマイズ研修</a><a href="${href('/business/package-it/')}">パッケージ研修</a><a href="${href('/open/')}">公開講座</a></div>
            <div class="footer-group"><h2>設計資料</h2><a href="${href('/business/site-map/')}">案Aサイトマップ</a><a href="${ROOT}requirements/index.html">サイト構造・キーワード要件書</a><a href="${href('/business/about/')}">研修事業について</a><a href="${href('/business/faq/')}">よくある質問</a></div>
          </div>
          <div class="footer-bottom">Static visual prototype — 実際の申込・問い合わせ・保存処理は行いません。</div>
        </div>
      </footer>`;
  }

  function renderSiteMapDialog() {
    return `
      <dialog id="siteMapDialog" class="site-map-dialog">
        <div class="dialog-header"><div><p class="eyebrow">PLAN A / SITE MAP</p><h2>案Aのページ構造</h2><p class="muted">各項目をクリックすると、該当する画面イメージへ遷移します。</p></div><button id="siteMapClose" class="dialog-close" type="button" aria-label="閉じる">×</button></div>
        <div class="dialog-body">
          <nav class="dialog-tree" aria-label="案Aサイトマップ">
            <a class="dialog-tree-root" href="${href('/business/')}"><strong>/business トップ</strong><span>法人向け研修全体</span></a>
            <div class="dialog-tree-branches">
              <section><h3>研修を探す</h3><a href="${href('/business/training/')}">全研修一覧</a><a href="${href('/business/ai-training/')}">言語・ツール=AI（/business/ai-training/）</a><a href="${href('/business/lag-list/')}">言語・ツール別</a><a href="${href('/business/hie-list/')}">階層別</a><a href="${href('/business/thm-list/')}">テーマ別</a><a href="${href('/business/occ-list/')}">職種別</a></section>
              <section><h3>4カテゴリ</h3>${Object.values(categoryPages).map((item) => `<a href="${href(item.route)}">${escapeHtml(item.title)}</a>`).join("")}</section>
              <section><h3>3研修形態</h3>${Object.values(deliveryPages).map((item) => `<a href="${href(item.route)}">${escapeHtml(item.title)}</a>`).join("")}</section>
              <section><h3>主要研修詳細</h3><a href="${href('/business/lag-generative-ai-chatgpt/')}">生成AI研修</a><a href="${href('/business/lag-ai-chatgpt/')}">ChatGPT研修</a><a href="${href('/business/claude/')}">Claude研修</a><a href="${href('/business/thm-ai-data-analysis/')}">AI・データ分析研修</a></section>
            </div>
          </nav>
          <div class="dialog-actions"><a class="button button-primary" href="${href('/business/site-map/')}">案Aサイトマップを大きく見る</a><a class="button" href="${ROOT}requirements/index.html">要件書を開く</a></div>
        </div>
      </dialog>`;
  }


  function matchesRule(item, filters = {}) {
    return Object.entries(filters).every(([key, expected]) => {
      const values = Array.isArray(expected) ? expected : [expected];
      const source = item[key] || [];
      return values.some((value) => source.some((itemValue) => itemValue.includes(value) || value.includes(itemValue)));
    });
  }

  function sameState(state, expected = {}) {
    return Object.entries(state).every(([key, value]) => {
      const target = expected[key] || "すべて";
      return value === target;
    }) && Object.entries(expected).every(([key, value]) => (state[key] || "すべて") === value);
  }

  function staticDestinationForAIState(state) {
    return staticFilterDestinations.find((item) => sameState(state, item.aiState || {})) || null;
  }

  function renderSeoStatus({ route, canonical, indexable, reason, status = "approved" }) {
    return `<details class="design-inspector" aria-label="SEO URL設定">
      <summary><span><strong>設計確認</strong><small>本番の利用者画面には表示しません</small></span><span class="tag ${indexable ? 'tag-green' : 'tag-amber'}">${indexable ? 'index' : 'noindex'}</span></summary>
      <div class="design-inspector-body seo-status ${indexable ? 'is-index' : 'is-noindex'}">
        <dl><div><dt>静的URL</dt><dd><code>${escapeHtml(route)}</code></dd></div><div><dt>canonical</dt><dd><code>${escapeHtml(canonical)}</code></dd></div><div><dt>robots</dt><dd><code>${indexable ? 'index,follow' : 'noindex,follow'}</code></dd></div><div><dt>ホワイトリスト</dt><dd>${status === 'approved' ? '承認済み' : '候補・要件充足待ち'}</dd></div></dl>
        <p>${escapeHtml(reason)}</p>
      </div>
    </details>`;
  }

  function renderFacetLanding(page) {
    const items = trainings.filter(isAITraining).filter((item) => matchesRule(item, page.filters));
    const content = `
      <section class="detail-hero"><div class="container"><p class="eyebrow">AI TRAINING</p><h1>${escapeHtml(page.title)}</h1><p class="lead">${escapeHtml(page.description)}</p><div class="hero-actions"><a class="button button-primary" href="#curatedTrainings">対象研修を見る</a><a class="button" href="${href('/business/training/')}">研修を探すへ</a></div></div></section>
      <section id="curatedTrainings" class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">TRAINING LIST</p><h2>対象となる研修</h2><p class="lead">この条件に合う研修を比較できます。</p></div></div><div class="training-grid">${items.map((item) => renderTrainingCard(item)).join('')}</div>${renderSeoStatus(page)}</div></section>`;
    shell(content, { title: page.title, description: page.description, breadcrumbs: [{ label: "研修を探す", route: "/business/training/" }, { label: "AI研修を探す", route: "/business/ai-training/" }, { label: page.title, route: page.route }] });
  }

  function renderTrainingCard(item, options = {}) {
    const showKeyword = options.showKeyword !== false;
    return `
      <article class="training-card" data-training-id="${escapeHtml(item.id)}" data-categories="${escapeHtml(item.categories.join(','))}" data-themes="${escapeHtml(item.themes.join(','))}" data-audiences="${escapeHtml(item.audiences.join(','))}" data-delivery="${escapeHtml(item.delivery.join(','))}" data-formats="${escapeHtml(item.formats.join(','))}" data-status="${escapeHtml(item.status)}">
        <div class="training-card-title"><div><div class="card-icon">${icon(item.icon)}</div><h3>${escapeHtml(item.title)}</h3></div>${statusTag(item)}</div>
        <p>${escapeHtml(item.summary)}</p>
        <div class="card-meta">${tags(item.themes.slice(0, 2), "tag-blue")}${tags(item.audiences.slice(0, 1))}</div>
        ${showKeyword ? `<div class="keyword-line"><strong>主テーマ：</strong>${escapeHtml(item.keywords.primary)}</div>` : ""}
        <div class="training-actions"><a class="button button-soft button-small" href="${href(item.route)}">詳細を見る</a><a class="button button-small" href="${href('/business/faq/')}">相談する</a></div>
      </article>`;
  }

  function renderBusinessTop() {
    const aiCards = trainings.filter(isAITraining).slice(0, 4);
    const content = `
      <section class="hero">
        <div class="container hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">CORPORATE IT TRAINING</p>
            <h1>企業・法人向け<br>IT／AI人材育成研修</h1>
            <p class="lead">4つのカリキュラムカテゴリと3つの研修形態を組み合わせ、対象者・目的・技術に合った研修を設計します。</p>
            <div class="hero-actions"><a class="button button-primary" href="${href('/business/training/')}">研修を探す</a><a class="button" href="${href('/business/about/')}">研修の仕組みを見る</a></div>
            <ul class="hero-pills"><li>50件以上の研修詳細</li><li>オンライン・現地・ハイブリッド</li><li>カスタマイズ対応</li></ul>
          </div>
          <aside class="hero-visual quick-finder" aria-label="研修を探す">
            <p class="eyebrow">QUICK FINDER</p><h2>研修を探す</h2><p class="muted">探し方を選択してください。</p>
            <nav class="quick-finder-links"><a href="${href('/business/training/')}"><strong>条件から絞り込む</strong><span>言語・ツール・対象者・テーマなど（Trends風）</span></a><a href="${href('/business/lag-list/')}"><strong>言語・ツールから探す</strong><span>AI、Java、Python、ChatGPTなど</span></a><a href="${href('/business/hie-list/')}"><strong>階層から探す</strong><span>新入社員、管理職など</span></a><a href="${href('/business/thm-list/')}"><strong>テーマから探す</strong><span>DX、AI、セキュリティなど</span></a><a href="${href('/business/occ-list/')}"><strong>職種から探す</strong><span>エンジニア、PM、データ人材</span></a></nav>
          </aside>
        </div>
      </section>
      <section class="section-compact section-white"><div class="container"><div class="stats-grid"><div class="stat-card"><div class="stat-value">4</div><div class="stat-label">カリキュラムカテゴリ</div></div><div class="stat-card"><div class="stat-value">3</div><div class="stat-label">研修形態</div></div><div class="stat-card"><div class="stat-value">50+</div><div class="stat-label">研修詳細の想定</div></div><div class="stat-card"><div class="stat-value">1</div><div class="stat-label">共通データ基盤</div></div></div></div></section>
      <section id="plan-a-map" class="section section-white"><div class="container"><div class="section-heading"><div><p class="eyebrow">PLAN A / SITE MAP</p><h2>案Aのどこを見ているか確認する</h2><p class="lead">法人トップ、研修を探す、4カテゴリ、3研修形態、主要な研修詳細を一つの地図から開けます。AIはナビ並立ではなく、言語・ツール条件のディレクトリURLです。</p></div><div class="section-actions"><a class="button button-primary" href="${href('/business/site-map/')}">サイトマップを開く</a><a class="button" href="${ROOT}requirements/index.html">要件書を読む</a></div></div><div class="compact-map"><a class="compact-map-root" href="${href('/business/')}"><strong>/business トップ</strong><span>法人向け研修全体</span></a><div class="compact-map-grid"><a href="${href('/business/training/')}"><strong>研修を探す</strong><span>唯一の一覧入口。AI選択時は /business/ai-training/</span></a><a href="${href('/business/lag-list/')}"><strong>4カテゴリ</strong><span>言語・ツール／階層／テーマ／職種</span></a><a href="${href('/business/customize/')}"><strong>3研修形態</strong><span>カスタマイズ／パッケージ／公開講座</span></a><a href="${href('/business/lag-generative-ai-chatgpt/')}"><strong>研修詳細</strong><span>生成AI／ChatGPT／Claude／AI・データ分析</span></a></div></div></div></section>
      <section id="ai-entry" class="section section-blue"><div class="container"><div class="split-panel"><div class="split-panel-copy"><p class="eyebrow">AI AS A FILTER</p><h2>AIは「研修を探す」の条件</h2><p class="lead">ナビに「AI研修」は置きません。研修を探すで言語・ツール=AIを選ぶとタイトルが「AI研修を探す」になり、ディレクトリURL <code>/business/ai-training/</code> で表現します（クエリパラメータは使いません）。</p><div class="hero-actions"><a class="button button-primary" href="${href('/business/training/')}">研修を探す</a><a class="button" href="${href('/business/ai-training/')}">AI条件のディレクトリを見る</a></div></div><div class="card-grid card-grid-2">${aiCards.map((item) => `<a class="card" href="${href(item.route)}"><div class="card-icon">${icon(item.icon)}</div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p><span class="card-link">研修詳細へ →</span></a>`).join("")}</div></div></div></section>
      <section id="category-entry" class="section section-white"><div class="container"><div class="section-heading"><div><p class="eyebrow">FIND BY CATEGORY</p><h2>4つの視点から研修を探す</h2><p class="lead">カテゴリは研修を一意に収納する箱ではなく、同じ研修へ到達する複数の発見経路です。</p></div><a class="button" href="${href('/business/training/')}">すべての研修を絞り込む</a></div><div class="category-index">${Object.values(categoryPages).map((item, index) => `<a class="category-card" href="${href(item.route)}"><span class="category-number">0${index + 1}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p><ul>${item.examples.map((value) => `<li>${escapeHtml(value)}</li>`).join("")}</ul></a>`).join("")}</div></div></section>
      <section class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">DELIVERY MODEL</p><h2>3つの研修形態から導入する</h2><p class="lead">研修形態は「何を学ぶか」ではなく、「どの方式で導入・参加するか」を表します。</p></div></div><div class="card-grid">${Object.values(deliveryPages).map((item) => `<a class="card ${item.route === '/open/' ? 'card-feature' : ''}" href="${href(item.route)}"><div class="card-icon">${icon(item.icon)}</div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p><div class="card-meta">${tags(item.features.slice(0, 2))}</div><span class="card-link">詳しく見る →</span></a>`).join("")}</div></div></section>
      <section class="section section-white"><div class="container"><div class="section-heading"><div><p class="eyebrow">FEATURED TRAINING</p><h2>主要な研修詳細</h2><p class="lead">研修詳細はすべて/business直下に置き、複数カテゴリと研修形態を属性として持ちます。</p></div></div><div class="training-grid">${trainings.slice(0, 6).map((item) => renderTrainingCard(item, { showKeyword: false })).join("")}</div></div></section>
      <section class="section section-dark"><div class="container"><div class="section-heading"><div><p class="eyebrow">TRAINING SUPPORT</p><h2>研修導入を支える情報</h2><p class="lead">運営体制、導入事例、FAQ、学習管理を同じ法人研修の文脈で接続します。</p></div></div><div class="card-grid card-grid-4">${[["運営体制", "/business/about/", "研修形態と実施形式を確認"], ["導入事例", "/business/voice/", "課題・実施・成果を確認"], ["よくある質問", "/business/faq/", "導入前の疑問を解消"], ["CodeCamp Insight", "/business/codecamp-insight/", "進捗と成果を可視化"]].map(([title, route, text]) => `<a class="card" href="${href(route)}"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p><span class="card-link">詳しく見る →</span></a>`).join("")}</div></div></section>`;
    shell(content, { title: "企業・法人向けIT／AI研修", description: "CodeCamp法人向け研修トップの視覚プロトタイプ", breadcrumbs: [] });
  }

  function aiFacetGroupMarkup() {
    const groups = [
      ["goals", "目的", ["すべて", "AIリテラシー", "業務活用", "業務効率化", "AI開発", "データ活用", "DX推進"]],
      ["audiences", "対象者", ["すべて", "全社員", "新入社員", "非エンジニア", "エンジニア", "管理職"]],
      ["tools", "技術・ツール", ["すべて", "生成AI", "ChatGPT", "Claude", "Python", "機械学習", "AIエージェント"]],
      ["delivery", "研修形態", [["すべて", "すべて"], ["カスタマイズ", "customize"], ["パッケージ", "package"], ["公開講座", "open"]]],
      ["formats", "実施形式", ["すべて", "オンライン", "現地", "ハイブリッド"]]
    ];
    const tabs = groups.map(([key, label], index) => `<button id="facet-${key}" class="facet-tab ${index === 0 ? 'is-active' : ''}" type="button" data-facet-tab="${key}" aria-selected="${index === 0 ? 'true' : 'false'}"><span>${label}</span><small data-facet-tab-value="${key}">指定なし</small></button>`).join("");
    const panels = groups.map(([key, label, values], index) => `<section id="facet-panel-${key}" class="facet-option-panel" data-facet-panel="${key}" ${index === 0 ? '' : 'hidden'}><h3>${label}を選ぶ</h3><div class="filter-chips" data-ai-filter="${key}">${values.map((raw, i) => { const pair = Array.isArray(raw) ? raw : [raw, raw]; return `<button class="filter-chip ${i === 0 ? 'is-active' : ''}" type="button" data-value="${escapeHtml(pair[1])}" data-label="${escapeHtml(pair[0])}">${escapeHtml(pair[0])}</button>`; }).join("")}</div></section>`).join("");
    return `<div id="aiFacetNav" class="facet-navigator"><div class="facet-compact-bar"><div><strong>条件から探す</strong><span id="aiSelectedFilters" class="facet-selected-summary">条件指定なし</span></div><button class="button button-small facet-mobile-trigger" type="button" data-facet-open>条件を変更</button></div><div class="facet-backdrop" data-facet-close></div><div class="facet-surface"><div class="facet-mobile-header"><strong>絞り込み条件</strong><button class="dialog-close" type="button" data-facet-close aria-label="閉じる">×</button></div><nav class="facet-tabs" aria-label="絞り込み項目">${tabs}</nav><div class="facet-panels">${panels}</div><div class="facet-actions"><button id="aiFilterReset" class="button button-small" type="button">条件をリセット</button><button class="button button-primary button-small facet-mobile-apply" type="button" data-facet-close>この条件で表示</button></div></div></div>`;
  }

  function masterFacetMarkup(groups) {
    const entries = Object.entries(groups);
    const sections = entries.map(([key, group], index) => {
      const options = group.values.map((raw) => {
        const pair = Array.isArray(raw) ? raw : [raw, raw];
        const id = `master-${key}-${String(pair[0]).replace(/[^\w\u3040-\u30ff\u4e00-\u9fff-]/g, "_")}`;
        return `<div class="filter-option"><input type="checkbox" id="${id}" data-master-filter="${key}" value="${escapeHtml(pair[0])}"><label for="${id}"><span>${escapeHtml(pair[1])}</span></label></div>`;
      }).join("");
      return `<div class="filter-section ${index === 0 ? "open" : ""}" data-filter-section="${key}"><button type="button" class="filter-section-title" data-filter-toggle><span>${escapeHtml(group.label)}</span><small data-facet-tab-value="${key}">指定なし</small></button><div class="filter-options">${options}</div></div>`;
    }).join("");
    return `<aside id="masterFacetNav" class="pc-sticky-filters" aria-label="絞り込み条件"><div class="facet-compact-bar"><div><strong>絞り込み条件</strong><span id="masterSelectedFilters" class="facet-selected-summary">条件指定なし</span></div><button class="button button-small facet-mobile-trigger" type="button" data-facet-open>条件を変更</button></div><div class="facet-backdrop" data-facet-close></div><div class="facet-surface"><div class="facet-mobile-header"><strong>絞り込み条件</strong><button class="dialog-close" type="button" data-facet-close aria-label="閉じる">×</button></div><div class="pc-sticky-filter-stack">${sections}</div><div class="facet-actions"><button id="masterReset" class="button button-small" type="button">条件をリセット</button><button class="button button-primary button-small facet-mobile-apply" type="button" data-facet-close>この条件で表示</button></div></div></aside>`;
  }

  function bindStickyFilterSections(rootId) {
    const root = document.getElementById(rootId);
    if (!root) return;
    root.querySelectorAll("[data-filter-toggle]").forEach((button) => {
      button.addEventListener("click", () => {
        const section = button.closest(".filter-section");
        if (!section) return;
        section.classList.toggle("open");
      });
    });
    root.querySelectorAll("[data-facet-open]").forEach((button) => button.addEventListener("click", () => {
      root.classList.add("is-open");
      document.body.classList.add("has-facet-drawer");
    }));
    root.querySelectorAll("[data-facet-close]").forEach((button) => button.addEventListener("click", () => {
      root.classList.remove("is-open");
      document.body.classList.remove("has-facet-drawer");
    }));
  }

  function renderUrlDesignInspector({ badgeId, queryId, linkId, resetId, whitelist = '' }) {
    return `<details class="design-inspector"><summary><span><strong>設計確認</strong><small>URL・canonical・index制御。本番利用者には表示しません</small></span><span class="design-only-badge">DESIGN NOTE</span></summary><div class="design-inspector-body"><div class="design-flow"><div><strong>通常の絞り込み</strong><span>同一ページ内で表示を変更。URLは生成しない</span></div><b>または</b><div><strong>ホワイトリスト済み条件</strong><span>既存ページまたは承認済み静的LPへ遷移</span></div></div><div class="filter-url-decision"><span id="${badgeId}" class="tag">JS絞り込み</span><p id="${queryId}" class="filter-query">URLは変更しません</p><a id="${linkId}" class="button button-small" href="#" hidden>静的URLで開く</a>${resetId ? `<button id="${resetId}" class="button button-small" type="button">条件をリセット</button>` : ''}</div>${whitelist}</div></details>`;
  }

  function renderAIHub() {
    renderTrainingMaster({ presetTools: ["AI"] });
  }

  function renderPlanASiteMap() {
    const details = [
      ["生成AI研修", "/business/lag-generative-ai-chatgpt/", "生成AI研修・生成AI活用研修"],
      ["ChatGPT研修", "/business/lag-ai-chatgpt/", "ChatGPT研修"],
      ["Claude研修", "/business/claude/", "Claude研修・Claude Code研修"],
      ["AI・データ分析研修", "/business/thm-ai-data-analysis/", "AI・データ分析研修・機械学習研修"]
    ];
    const content = `
      <section class="detail-hero"><div class="container"><p class="eyebrow">PLAN A / INTERACTIVE SITE MAP</p><h1>案A サイトマップ</h1><p class="lead">探索入口は「研修を探す」1本。AIは言語・ツール条件をディレクトリURLで表現します（クエリパラメータは使いません）。</p><div class="hero-actions"><a class="button button-primary" href="${href('/business/')}">/businessトップへ</a><a class="button" href="${ROOT}requirements/index.html">サイト構造・キーワード要件書</a></div></div></section>
      <section class="section"><div class="container"><div class="plan-a-tree" aria-label="案Aのサイトマップ">
        <a class="plan-a-root" href="${href('/business/')}"><span class="map-node-label">ROOT</span><strong>/business トップ</strong><small>法人向け研修全体、固定・信頼ページ、研修の入口</small></a>
        <div class="plan-a-columns">
          <article class="plan-a-branch plan-a-branch-feature"><div class="branch-head"><span>01</span><div><h2>研修を探す</h2><code>/business/training/</code></div></div><p>唯一の一覧ナビ。Trends風ファセットで絞り込み。言語・ツール=AIを選ぶとタイトルが「AI研修を探す」になり、ディレクトリ <code>/business/ai-training/</code> へ遷移します。この「ファセット条件 → ディレクトリURL」はAI専用ではなく、Java・Python など他の言語・ツールでも同じ型を取れます。ただしインデックス対象にするのはホワイトリストに追加（承認）したものだけです。掛け合わせの静的LPは案Aの幹構造には含めず、候補として別管理します。</p><a class="branch-primary-link" href="${href('/business/training/')}">研修を探すを開く →</a><div class="branch-links"><a href="${href('/business/ai-training/')}"><strong>言語・ツール=AI</strong><span>/business/ai-training/（ディレクトリ表現・例）</span></a></div></article>
          <article class="plan-a-branch"><div class="branch-head"><span>02</span><div><h2>4カテゴリ</h2><small>研修の発見経路</small></div></div><p>同じ研修を、言語・ツール、階層、テーマ、職種の異なる視点から探します。</p><div class="branch-links">${Object.values(categoryPages).map((item) => `<a href="${href(item.route)}"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.description)}</span></a>`).join("")}</div></article>
          <article class="plan-a-branch"><div class="branch-head"><span>03</span><div><h2>3研修形態</h2><small>導入・参加方法</small></div></div><p>カリキュラムの種類ではなく、企業がどの方式で導入・参加するかを示します。</p><div class="branch-links">${Object.values(deliveryPages).map((item) => `<a href="${href(item.route)}"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.summary)}</span></a>`).join("")}</div></article>
          <article class="plan-a-branch"><div class="branch-head"><span>04</span><div><h2>研修詳細</h2><small>/business直下の個別商品ページ</small></div></div><p>総称語「AI研修」はディレクトリ化した一覧条件、商品・技術固有語は個別の研修詳細が受け持ちます。</p><div class="branch-links">${details.map(([label, route, keyword]) => `<a href="${href(route)}"><strong>${escapeHtml(label)}</strong><span>主な狙い：${escapeHtml(keyword)}</span></a>`).join("")}</div></article>
        </div>
      </div></div></section>
      <section class="section section-white"><div class="container"><div class="section-heading"><div><p class="eyebrow">REQUIREMENTS INTEGRATION</p><h2>サイト構造とキーワード要件を一緒に確認する</h2><p class="lead">視覚プロトタイプは画面と遷移を確認するもの、要件書は構造・SEO・キーワード所有を確認するものです。同じパッケージ内で相互に移動できます。</p></div></div><div class="requirements-summary"><article><h3>構造の確定事項</h3><ul class="bullet-list"><li>ナビの探索入口は「研修を探す」1本</li><li>AIはファセット条件＋ディレクトリURL（クエリなし）</li><li>4カテゴリと3研修形態を維持</li><li>既存研修詳細URLは原則維持</li></ul></article><article><h3>キーワード所有の確定事項</h3><ul class="bullet-list"><li>「AI研修」は /business/ai-training/（一覧のAI条件）</li><li>生成AI・ChatGPT・Claudeは各研修詳細</li><li>比較語は比較・選定コンテンツ</li><li>対象者・実施形式などの属性語は原則ファセット</li></ul></article><article class="requirements-cta"><h3>法人向けAI研修<br>サイト構造・キーワード要件書</h3><p>案A・B・C、現行構造、SEO・canonical、キーワードマップ、ロードマップの全文を確認できます。</p><a class="button button-primary" href="${ROOT}requirements/index.html">要件書を開く</a></article></div></div></section>`;
    shell(content, { title: "案A サイトマップ", description: "案Aの各ページをリンク付きで確認するサイトマップ", breadcrumbs: [{ label: "案Aサイトマップ", route: "/business/site-map/" }] });
  }

  function renderTrainingMaster(options = {}) {
    const presetTools = options.presetTools || [];
    const aiPreset = presetTools.includes("AI");
    const pageTitle = aiPreset ? "AI研修を探す" : "研修を探す";
    const pageLead = aiPreset
      ? "言語・ツール=AI の条件をディレクトリURL /business/ai-training/ で表現しています。クエリパラメータは使いません。条件を外すと /business/training/ に戻ります。"
      : "Trendsの研修検索と同様に、言語・ツール・対象者・テーマなどから絞り込みます。インデックスしたい条件はディレクトリ型URLへ遷移します（例: 言語・ツール=AI → /business/ai-training/）。";
    const groups = {
      tools: { label: "言語・ツール", values: ["AI", "Java", "Python", "ChatGPT", "Claude", "Excel", "AWS", "JavaScript"] },
      audiences: { label: "対象者", values: ["全社員", "新入社員", "内定者", "非エンジニア", "エンジニア", "管理職"] },
      themes: { label: "テーマ", values: ["生成AI", "AI・データ分析", "業務効率化", "DX", "セキュリティ", "Web開発", "新人育成"] },
      categories: { label: "カテゴリ", values: Object.entries(categoryPages).map(([value, item]) => [value, item.short]) },
      delivery: { label: "形態", values: [["customize", "カスタマイズ"], ["package", "パッケージ"], ["open", "公開講座"]] },
      formats: { label: "形式", values: ["オンライン", "現地", "ハイブリッド"] },
      status: { label: "ページ状態", values: [["existing", "既存ページ"], ["candidate", "新設候補"]] }
    };
    const breadcrumbs = aiPreset
      ? [{ label: "研修を探す", route: "/business/training/" }, { label: "AI研修を探す", route: "/business/ai-training/" }]
      : [{ label: "研修を探す", route: "/business/training/" }];
    const content = `
      <section class="detail-hero"><div class="container"><p class="eyebrow">TRAINING FINDER</p><h1 id="masterPageTitle">${pageTitle}</h1><p id="masterPageLead" class="lead">${pageLead}</p></div></section>
      <section class="section"><div class="container"><div class="training-finder-layout">${masterFacetMarkup(groups)}<div class="training-finder-main"><div class="filter-results-toolbar user-results-toolbar"><div class="filter-count"><strong id="masterCount">${trainings.length}</strong>件を表示</div><p id="masterAiHint" class="muted"${aiPreset ? "" : " hidden"}>${aiPreset ? "現在のディレクトリURLは /business/ai-training/ です（言語・ツール=AI）。" : "言語・ツールでAIを選ぶと、タイトルを「AI研修を探す」にし /business/ai-training/ へ遷移します。"}</p></div><div id="masterGrid" class="training-grid">${trainings.map((item) => renderTrainingCard(item)).join("")}</div><div id="masterEmpty" class="empty-state" hidden><h3>条件に合う研修がありません</h3><p class="muted">条件をリセットするか、カスタマイズ研修をご相談ください。</p></div>${renderUrlDesignInspector({ badgeId: 'masterSeoBadge', queryId: 'masterQuery', linkId: 'masterStaticLink', resetId: 'masterResetInspector' })}</div></div></div></section>`;
    shell(content, { title: pageTitle, description: "研修を探す（ディレクトリ型URL方針）", breadcrumbs, mobileCta: { secondaryLabel: "法人トップ", secondaryRoute: "/business/", primaryLabel: "導入を相談", primaryRoute: "/business/faq/" } });
    if (aiPreset) {
      document.querySelectorAll('[data-master-filter="tools"]').forEach((input) => {
        input.checked = presetTools.includes(input.value);
      });
      const toolsSection = document.querySelector('[data-filter-section="tools"]');
      toolsSection?.classList.add("open");
    }
    bindStickyFilterSections("masterFacetNav");
    bindMasterFilters({ aiDirectoryMode: aiPreset });
  }

  function renderCategoryPage(categoryKey) {
    const category = categoryPages[categoryKey];
    const matching = trainings.filter((item) => item.categories.includes(categoryKey));
    const content = `
      <section class="detail-hero"><div class="container hero-grid"><div><p class="eyebrow">FIND BY ${categoryKey.toUpperCase()}</p><h1>${escapeHtml(category.title)}</h1><p class="lead">${escapeHtml(category.description)}</p><div class="hero-actions"><a class="button button-primary" href="#categoryTrainings">研修一覧を見る</a><a class="button" href="${href('/business/training/')}">複数条件で絞り込む</a></div></div><div class="hero-visual"><div class="card-icon">${icon(category.icon)}</div><h3>カテゴリページの役割</h3><p class="muted">URLを維持したまま、将来は共通データから動的に一覧を生成します。カテゴリ固有の説明とFAQは残します。</p><div class="card-meta">${tags(category.examples, "tag-blue")}</div></div></div></section>
      <section class="section section-white"><div class="container"><div class="notice"><strong>同じ研修を複数カテゴリから発見できます</strong><p>カテゴリは物理的な親ディレクトリではありません。各研修詳細は/business直下にあり、主カテゴリと副カテゴリを属性として保持します。</p></div></div></section>
      <section id="categoryTrainings" class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">TRAINING LIST</p><h2>${escapeHtml(category.short)}から探せる研修</h2><p class="lead">${matching.length}件のサンプル研修を表示しています。</p></div></div><div class="training-grid">${matching.map((item) => renderTrainingCard(item)).join("")}</div></div></section>
      <section class="section section-white"><div class="container"><div class="section-heading"><div><p class="eyebrow">OTHER PATHS</p><h2>別の視点から探す</h2></div></div><div class="category-index">${Object.entries(categoryPages).filter(([key]) => key !== categoryKey).map(([key, item], index) => `<a class="category-card" href="${href(item.route)}"><span class="category-number">0${index + 1}</span><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></a>`).join("")}</div></div></section>`;
    shell(content, { title: category.title, description: category.description, breadcrumbs: [{ label: "研修を探す", route: "/business/training/" }, { label: category.title, route: category.route }] });
  }

  function renderDeliveryPage(type) {
    const page = deliveryPages[type];
    const courseCards = type === "open" ? openCourses.slice(0, 3).map(renderOpenCourseCard).join("") : trainings.filter((item) => item.delivery.includes(type)).slice(0, 6).map((item) => renderTrainingCard(item, { showKeyword: false })).join("");
    const content = `
      <section class="hero"><div class="container hero-grid"><div class="hero-copy"><p class="eyebrow">DELIVERY MODEL</p><h1>${escapeHtml(page.title)}</h1><p class="lead">${escapeHtml(page.summary)}</p><div class="hero-actions"><a class="button button-primary" href="#availableContent">対応する研修を見る</a><a class="button" href="${href('/business/about/')}">研修形態を比較</a></div></div><div class="hero-visual"><div class="card-icon">${icon(page.icon)}</div><h3>${escapeHtml(page.title)}の特徴</h3><ul class="bullet-list">${page.features.map((value) => `<li>${escapeHtml(value)}</li>`).join("")}</ul></div></div></section>
      <section class="section-compact section-white"><div class="container"><div class="steps"><article class="step-card"><h3>目的を確認</h3><p>育成対象、課題、期間、成果を整理します。</p></article><article class="step-card"><h3>研修を選定</h3><p>既存カリキュラムと必要なカスタマイズを確認します。</p></article><article class="step-card"><h3>実施形式を設計</h3><p>オンライン、現地、ハイブリッドから選択します。</p></article></div></div></section>
      <section id="availableContent" class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">AVAILABLE</p><h2>${type === 'open' ? '参加できる公開講座' : '対応する研修例'}</h2><p class="lead">同じ研修詳細から、対応可能な研修形態へ接続します。</p></div></div><div class="${type === 'open' ? 'card-grid' : 'training-grid'}">${courseCards}</div></div></section>
      <section class="section section-dark"><div class="container"><div class="section-heading"><div><p class="eyebrow">COMPARE DELIVERY</p><h2>ほかの研修形態</h2></div></div><div class="card-grid">${Object.entries(deliveryPages).filter(([key]) => key !== type).map(([, item]) => `<a class="card" href="${href(item.route)}"><div class="card-icon">${icon(item.icon)}</div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p><span class="card-link">詳しく見る →</span></a>`).join("")}</div></div></section>`;
    shell(content, { title: page.title, description: page.summary, breadcrumbs: [{ label: "研修形態", route: "/business/about/" }, { label: page.title, route: page.route }], mobileCta: { secondaryLabel: "研修を探す", secondaryRoute: "/business/training/", primaryLabel: "導入を相談", primaryRoute: "/business/faq/" } });
  }

  function renderOpenTop() {
    const content = `
      <section class="hero"><div class="container hero-grid"><div class="hero-copy"><p class="eyebrow">OPEN COURSES</p><h1>企業・社会人向け<br>公開講座</h1><p class="lead">開催日とカリキュラムが決まった講座へ1名から参加できます。企業単位のカスタマイズ研修とは異なる導入方法です。</p><div class="hero-actions"><a class="button button-primary" href="#open-courses">講座を見る</a><a class="button" href="${href('/business/customize/')}">企業単位の研修を相談</a></div><ul class="hero-pills"><li>1名から参加</li><li>開催日・定員制</li><li>標準カリキュラム</li></ul></div><div class="hero-visual"><div class="visual-flow"><div class="visual-node visual-node-primary"><strong>/open 公開講座トップ</strong><span>1名参加・日程・申込の検索意図</span></div><div class="visual-arrow">↓</div><div class="visual-branches"><div class="visual-node"><strong>AI・生成AI</strong><span>業務活用／AI開発</span></div><div class="visual-node"><strong>IT・開発</strong><span>新人／クラウド／開発</span></div></div><div class="visual-arrow">↕</div><div class="visual-node"><strong>法人研修詳細と相互リンク</strong><span>企業導入と1名参加を明確に分離</span></div></div></div></div></section>
      <section id="open-courses" class="section"><div class="container"><div class="section-heading"><div><p class="eyebrow">COURSE LIST</p><h2>公開講座を探す</h2><p class="lead">表示している日程・申込状態はプロトタイプ用のサンプルです。</p></div></div><div class="card-grid">${openCourses.map(renderOpenCourseCard).join("")}</div></div></section>
      <section class="section section-white"><div class="container"><div class="split-panel"><div class="split-panel-copy"><p class="eyebrow">CORPORATE TRAINING</p><h2>企業単位で導入する場合</h2><p class="lead">対象者、期間、演習、利用ツールを調整する場合は、カスタマイズ研修またはパッケージ研修をご利用ください。</p><div class="hero-actions"><a class="button button-primary" href="${href('/business/customize/')}">カスタマイズ研修</a><a class="button" href="${href('/business/package-it/')}">パッケージ研修</a></div></div><div class="notice"><strong>重複ページではありません</strong><p>法人研修詳細は企業単位の導入・資料請求、公開講座詳細は1名参加・開催日・申込という異なる検索意図を受け持ちます。</p></div></div></div></section>`;
    shell(content, { title: "企業・社会人向け公開講座", description: "公開講座トップの視覚プロトタイプ", breadcrumbs: [{ label: "公開講座", route: "/open/" }] });
  }

  function renderOpenCourseCard(course) {
    return `<a class="card" href="${href(course.route)}"><div class="card-icon">${icon(course.icon)}</div><div class="card-meta"><span class="tag tag-green">受付イメージ</span></div><h3>${escapeHtml(course.title)}</h3><p>${escapeHtml(course.summary)}</p><div class="card-meta">${tags([course.audience, course.duration], "tag-blue")}</div><span class="card-link">講座詳細・日程を見る →</span></a>`;
  }

  function renderOpenDetail(course) {
    const related = trainingById(course.relatedTraining);
    const content = `
      <section class="detail-hero"><div class="container detail-hero-grid"><div><div class="card-meta"><span class="tag tag-green">公開講座</span><span class="tag">1名から参加</span></div><h1 style="margin-top:16px">${escapeHtml(course.title)}</h1><p class="lead">${escapeHtml(course.summary)}</p><div class="hero-actions"><a class="button button-primary" href="#sampleSchedule">開催日程を見る</a><a class="button" href="${related ? href(related.route) : href('/business/ai-training/')}">企業向け研修を見る</a></div></div><aside class="detail-summary"><dl><div><dt>対象者</dt><dd>${escapeHtml(course.audience)}</dd></div><div><dt>期間</dt><dd>${escapeHtml(course.duration)}</dd></div><div><dt>参加方法</dt><dd>1名単位・開催日選択</dd></div><div><dt>主テーマ</dt><dd>${escapeHtml(course.keywords.join('／'))}</dd></div></dl></aside></div></section>
      <section class="section"><div class="container detail-layout"><div class="detail-main"><article class="content-panel"><p class="eyebrow">COURSE OVERVIEW</p><h2>講座概要</h2><p class="lead">公開講座では、あらかじめ設定されたカリキュラムに沿って、他社受講者と一緒に学びます。</p><ul class="bullet-list"><li>講師による解説と演習</li><li>標準化された教材・課題</li><li>受講者同士の共有・発表</li><li>開催日と定員を確認して申込</li></ul></article><article id="sampleSchedule" class="content-panel"><p class="eyebrow">SCHEDULE SAMPLE</p><h2>開催日程イメージ</h2><div class="matrix-table-wrap" style="margin-top:20px"><table class="matrix-table"><thead><tr><th>回</th><th>開催形式</th><th>状態</th><th>操作</th></tr></thead><tbody><tr><td>第1回</td><td>オンライン</td><td><span class="tag tag-green">受付中イメージ</span></td><td><button class="button button-small" type="button">申込画面イメージ</button></td></tr><tr><td>第2回</td><td>オンライン</td><td><span class="tag">日程調整中</span></td><td>—</td></tr></tbody></table></div><p class="muted" style="margin-top:12px;font-size:12px">※実際の日程・受付状態ではありません。</p></article>${related ? `<article class="content-panel"><p class="eyebrow">CORPORATE OPTION</p><h2>企業単位で導入する</h2><p class="lead">人数、期間、演習内容を調整する場合は、法人向けの「${escapeHtml(related.title)}」へ進みます。</p><div class="hero-actions"><a class="button button-primary" href="${href(related.route)}">法人向け研修を見る</a><a class="button" href="${href('/business/customize/')}">カスタマイズを確認</a></div></article>` : ""}</div><aside class="sidebar-cta"><div class="cta-card"><h3>公開講座へ参加</h3><p>日程と参加人数を確認して申込へ進む想定です。</p><button class="button button-primary button-block" type="button">申込画面イメージ</button></div><div class="related-links"><a href="${href('/open/')}">公開講座一覧</a><a href="${href('/business/training/')}">研修を探す</a><a href="${href('/business/faq/')}">よくある質問</a></div></aside></div></section>`;
    shell(content, { title: course.title, description: course.summary, breadcrumbs: [{ label: "公開講座", route: "/open/" }, { label: course.title, route: course.route }], mobileCta: { secondaryLabel: "企業向け研修", secondaryRoute: related?.route || "/business/ai-training/", primaryLabel: "日程を見る", primaryRoute: course.route + "#sampleSchedule" } });
  }

  function renderTrainingDetail(training) {
    const primary = categoryPages[training.primaryCategory];
    const related = training.related.map(trainingById).filter(Boolean).slice(0, 4);
    const relatedCourses = training.openCourses.map(courseById).filter(Boolean);
    const content = `
      <section class="detail-hero"><div class="container detail-hero-grid"><div><div class="card-meta">${statusTag(training)}${tags(training.themes.slice(0, 3), "tag-blue")}</div><h1 style="margin-top:16px">${escapeHtml(training.title)}</h1><p class="lead">${escapeHtml(training.heroLead)}</p><div class="hero-actions"><a class="button button-primary" href="#delivery-methods">導入方法を見る</a><a class="button" href="${href('/business/faq/')}">研修を相談する</a></div></div><aside class="detail-summary"><dl><div><dt>主カテゴリ</dt><dd>${escapeHtml(primary.title)}</dd></div><div><dt>対象者</dt><dd>${escapeHtml(training.audiences.join('・'))}</dd></div><div><dt>レベル</dt><dd>${escapeHtml(training.level)}</dd></div><div><dt>期間</dt><dd>${escapeHtml(training.duration)}</dd></div><div><dt>実施形式</dt><dd>${escapeHtml(training.formats.join('・'))}</dd></div></dl></aside></div></section>
      <section class="section"><div class="container detail-layout"><div class="detail-main"><article class="content-panel"><p class="eyebrow">OVERVIEW</p><h2>研修概要</h2><p class="lead">${escapeHtml(training.summary)}</p><h3>研修後にできること</h3><ul class="bullet-list">${training.outcomes.map((value) => `<li>${escapeHtml(value)}</li>`).join("")}</ul><div class="card-meta" style="margin-top:22px">${tags(training.tools, "tag-purple")}${tags(training.roles)}</div></article><article id="delivery-methods" class="content-panel"><p class="eyebrow">DELIVERY METHODS</p><h2>この研修の提供方法</h2><p class="lead">カリキュラム詳細は研修形態を内包せず、対応可能な導入方法へ接続します。</p><div class="delivery-grid">${Object.entries(deliveryPages).map(([key, page]) => { const available = key === 'open' ? relatedCourses.length > 0 : training.delivery.includes(key); const route = key === 'open' && relatedCourses[0] ? relatedCourses[0].route : page.route; return `<article class="delivery-card ${available ? 'is-available' : ''}"><div class="card-meta"><span class="tag ${available ? 'tag-green' : ''}">${available ? '対応あり' : '要相談'}</span></div><h3>${escapeHtml(page.title)}</h3><p>${escapeHtml(page.summary)}</p><a class="card-link" href="${href(route)}">${available ? '詳しく見る' : '相談する'} →</a></article>`; }).join("")}</div></article><article class="content-panel"><p class="eyebrow">CURRICULUM</p><h2>カリキュラム例</h2><div class="accordion">${training.curriculum.map(([title, body], index) => `<section class="accordion-item"><button class="accordion-button" type="button" aria-expanded="${index === 0 ? 'true' : 'false'}">${escapeHtml(title)}</button><div class="accordion-content" ${index === 0 ? "" : "hidden"}>${escapeHtml(body)}</div></section>`).join("")}</div></article><article class="content-panel"><p class="eyebrow">RELATIONSHIP</p><h2>このページへの発見経路</h2><p class="lead">画面上の主パンくずは1つにしますが、同じ研修を複数カテゴリとAIハブから発見できます。</p><div class="card-grid card-grid-2" style="margin-top:20px">${training.categories.map((key) => { const item = categoryPages[key]; return `<a class="card" href="${href(item.route)}"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p><span class="card-link">カテゴリへ →</span></a>`; }).join("")} ${isAITraining(training) ? `<a class="card card-feature" href="${href('/business/ai-training/')}"><h3>AI研修横断ハブ</h3><p>課題・対象者・ツール・研修形態から比較できます。</p><span class="card-link">AI研修へ →</span></a>` : ""}</div></article>${related.length ? `<article class="content-panel"><p class="eyebrow">RELATED TRAINING</p><h2>関連する研修</h2><div class="training-grid" style="margin-top:20px">${related.map((item) => renderTrainingCard(item, { showKeyword: false })).join("")}</div></article>` : ""}${relatedCourses.length ? `<article class="content-panel"><p class="eyebrow">OPEN COURSES</p><h2>関連する公開講座</h2><div class="card-grid card-grid-2" style="margin-top:20px">${relatedCourses.map(renderOpenCourseCard).join("")}</div></article>` : ""}</div><aside class="sidebar-cta"><div class="cta-card"><h3>この研修を相談する</h3><p>対象者、期間、演習、研修形態を確認し、企業に合うプランを設計します。</p><a class="button button-primary button-block" href="${href('/business/faq/')}">お問い合わせ</a></div><div class="related-links"><a href="${href('/business/ai-training/')}">AI研修を比較</a><a href="${href(primary.route)}">${escapeHtml(primary.title)}</a><a href="${href('/business/customize/')}">カスタマイズ研修</a><a href="${href('/business/voice/')}">導入事例</a><a href="${href('/business/codecamp-insight/')}">研修管理システム</a></div></aside></div></section>`;
    shell(content, { title: training.title, description: training.summary, breadcrumbs: [{ label: primary.title, route: primary.route }, { label: training.title, route: training.route }], mobileCta: { secondaryLabel: "研修を探す", secondaryRoute: "/business/training/", primaryLabel: "研修を相談", primaryRoute: "/business/faq/" } });
    bindAccordions();
  }

  function renderFixedPage(page) {
    const content = `<section class="detail-hero"><div class="container"><p class="eyebrow">${escapeHtml(page.eyebrow)}</p><h1>${escapeHtml(page.title)}</h1><p class="lead">${escapeHtml(page.lead)}</p></div></section><section class="section"><div class="container"><div class="card-grid">${page.blocks.map(([title, body]) => `<article class="card"><h3>${escapeHtml(title)}</h3><p>${escapeHtml(body)}</p></article>`).join("")}</div></div></section><section class="section section-white"><div class="container"><div class="split-panel"><div class="split-panel-copy"><p class="eyebrow">NEXT ACTION</p><h2>研修を具体的に検討する</h2><p class="lead">「研修を探す」から対象者と目的に合う研修を確認できます。AIを選ぶと /business/ai-training/ のディレクトリ表現になります。</p><div class="hero-actions"><a class="button button-primary" href="${href('/business/training/')}">研修を探す</a><a class="button" href="${href('/business/ai-training/')}">AI条件の一覧を見る</a></div></div><div class="notice"><strong>プロトタイプ上の固定・信頼ページ</strong><p>実サイトでは運営情報、実績、具体的なFAQ、管理機能の詳細を掲載します。</p></div></div></div></section>`;
    shell(content, { title: page.title, description: page.lead, breadcrumbs: [{ label: page.title, route: ROUTE }] });
  }

  function renderEntry() {
    const content = `<section class="hero"><div class="container"><p class="eyebrow">VISUAL PROTOTYPE</p><h1>CodeCamp法人向け研修<br>サイト遷移プロトタイプ</h1><p class="lead">/businessトップから、研修を探す（AIはディレクトリ条件）、4カテゴリ、研修詳細、3研修形態、公開講座へ遷移できます。</p><div class="hero-actions"><a class="button button-primary" href="${href('/business/')}">/businessトップを開く</a><a class="button" href="${href('/business/site-map/')}">案Aサイトマップ</a><a class="button" href="${ROOT}requirements/index.html">要件書を開く</a><button id="entryGuide" class="button" type="button">構造ガイドを開始</button></div></div></section>`;
    shell(content, { title: "視覚プロトタイプ" });
    document.getElementById("entryGuide")?.addEventListener("click", startGuide);
  }

  function renderNotFound() {
    shell(`<section class="section"><div class="container"><div class="empty-state"><h1>ページが見つかりません</h1><p class="lead">プロトタイプ内のサイト構造からページを選択してください。</p><div class="hero-actions" style="justify-content:center"><a class="button button-primary" href="${href('/business/')}">法人向け研修トップ</a><button id="notFoundMap" class="button" type="button">サイト構造を見る</button></div></div></div></section>`, { title: "ページが見つかりません" });
    document.getElementById("notFoundMap")?.addEventListener("click", () => document.getElementById("siteMapDialog")?.showModal());
  }

  function bindGlobalInteractions() {
    const menuButton = document.getElementById("menuButton");
    const nav = document.getElementById("primaryNav");
    menuButton?.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(open));
    });

    const dialog = document.getElementById("siteMapDialog");
    document.getElementById("siteMapOpen")?.addEventListener("click", () => { dialog?.showModal(); document.body.classList.add("has-modal"); });
    document.getElementById("siteMapClose")?.addEventListener("click", () => { dialog?.close(); document.body.classList.remove("has-modal"); });
    dialog?.addEventListener("click", (event) => {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
        dialog.close(); document.body.classList.remove("has-modal");
      }
    });

    document.getElementById("guideLauncher")?.addEventListener("click", startGuide);
    document.getElementById("guideEnd")?.addEventListener("click", endGuide);
    document.getElementById("guideNext")?.addEventListener("click", () => moveGuide(1));
    document.getElementById("guideBack")?.addEventListener("click", () => moveGuide(-1));
    restoreGuide();
  }

  function bindAccordions() {
    document.querySelectorAll(".accordion-button").forEach((button) => {
      button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";
        button.setAttribute("aria-expanded", String(!expanded));
        const content = button.nextElementSibling;
        if (content) content.hidden = expanded;
      });
    });
  }

  function bindFacetNavigator(id) {
    const root = document.getElementById(id);
    if (!root) return;
    const tabs = [...root.querySelectorAll('[data-facet-tab]')];
    const panels = [...root.querySelectorAll('[data-facet-panel]')];
    const show = (key) => {
      tabs.forEach((tab) => {
        const active = tab.dataset.facetTab === key;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
      });
      panels.forEach((panel) => { panel.hidden = panel.dataset.facetPanel !== key; });
    };
    tabs.forEach((tab) => tab.addEventListener('click', () => show(tab.dataset.facetTab)));
    const hashMatch = location.hash.match(/^#facet-(goals|audiences|tools|delivery|formats|categories|themes|status)$/);
    if (hashMatch && tabs.some((tab) => tab.dataset.facetTab === hashMatch[1])) {
      show(hashMatch[1]);
      window.setTimeout(() => root.scrollIntoView({ block: "start" }), 0);
    }
    root.querySelectorAll('[data-facet-open]').forEach((button) => button.addEventListener('click', () => {
      root.classList.add('is-open');
      document.body.classList.add('has-facet-drawer');
    }));
    root.querySelectorAll('[data-facet-close]').forEach((button) => button.addEventListener('click', () => {
      root.classList.remove('is-open');
      document.body.classList.remove('has-facet-drawer');
    }));
  }

  function setFacetTabValue(rootId, key, label) {
    const root = document.getElementById(rootId);
    const target = root?.querySelector(`[data-facet-tab-value="${key}"]`);
    if (target) target.textContent = label === 'すべて' ? '指定なし' : label;
  }

  function bindAIHubFilters(items) {
    const state = { goals: "すべて", audiences: "すべて", tools: "すべて", delivery: "すべて", formats: "すべて" };
    const groups = document.querySelectorAll("[data-ai-filter]");
    const apply = () => {
      let count = 0;
      document.querySelectorAll("#ai-training-grid .training-card").forEach((card) => {
        const item = items.find((value) => value.id === card.dataset.trainingId);
        const visible = item && Object.entries(state).every(([key, selected]) => {
          if (selected === "すべて") return true;
          if (key === "delivery") return item.delivery.includes(selected) || (selected === "open" && item.openCourses.length > 0);
          return (item[key] || []).some((value) => value.includes(selected) || selected.includes(value));
        });
        card.hidden = !visible;
        if (visible) count += 1;
      });
      document.getElementById("aiResultCount").textContent = String(count);
      document.getElementById("aiEmpty").hidden = count !== 0;
      const activeLabels = Object.entries(state).filter(([, value]) => value !== "すべて").map(([key, value]) => {
        const labelMap = { goals: "目的", audiences: "対象者", tools: "技術・ツール", delivery: "研修形態", formats: "実施形式" };
        const displayMap = { customize: "カスタマイズ", package: "パッケージ", open: "公開講座" };
        const display = displayMap[value] || value;
        setFacetTabValue("aiFacetNav", key, display);
        return `${labelMap[key]}：${display}`;
      });
      Object.entries(state).filter(([, value]) => value === "すべて").forEach(([key]) => setFacetTabValue("aiFacetNav", key, "すべて"));
      const summary = document.getElementById("aiSelectedFilters");
      if (summary) summary.textContent = activeLabels.length ? activeLabels.join(" / ") : "条件指定なし";
      const destination = staticDestinationForAIState(state);
      const query = document.getElementById("aiFilterQuery");
      const badge = document.getElementById("aiSeoBadge");
      const link = document.getElementById("aiStaticLink");
      if (destination && Object.keys(destination.aiState || {}).length) {
        query.textContent = `静的URL：${destination.route}／canonical：${destination.canonical}`;
        badge.textContent = destination.indexable ? "index静的URL" : "noindex候補URL";
        badge.className = `tag ${destination.indexable ? 'tag-green' : 'tag-amber'}`;
        link.href = href(destination.route);
        link.textContent = destination.indexable ? "静的URLで開く" : "候補URLを確認";
        link.hidden = false;
      } else {
        const activeCount = Object.values(state).filter((value) => value !== "すべて").length;
        query.textContent = activeCount ? "ホワイトリスト外：URLを生成せず、JS絞り込みのみ" : "URLは変更しません";
        badge.textContent = "JS絞り込み";
        badge.className = "tag";
        link.hidden = true;
      }
    };
    groups.forEach((group) => {
      group.addEventListener("click", (event) => {
        const button = event.target.closest(".filter-chip");
        if (!button) return;
        group.querySelectorAll(".filter-chip").forEach((item) => item.classList.remove("is-active"));
        button.classList.add("is-active");
        state[group.dataset.aiFilter] = button.dataset.value;
        apply();
      });
    });
    document.getElementById("aiFilterReset")?.addEventListener("click", () => {
      Object.keys(state).forEach((key) => state[key] = "すべて");
      groups.forEach((group) => { group.querySelectorAll(".filter-chip").forEach((item, index) => item.classList.toggle("is-active", index === 0)); });
      apply();
    });
  }

  function bindMasterFilters(options = {}) {
    const inputs = [...document.querySelectorAll("[data-master-filter]")];
    const aiDirectoryMode = Boolean(options.aiDirectoryMode);
    const destinationFor = (selected) => {
      const keys = Object.keys(selected).filter((key) => selected[key]?.length);
      if (keys.length === 1 && keys[0] === "categories" && selected.categories.length === 1) {
        return categoryPages[selected.categories[0]] ? { route: categoryPages[selected.categories[0]].route, label: categoryPages[selected.categories[0]].title, canonical: `https://codecamp.jp${categoryPages[selected.categories[0]].route}`, indexable: true } : null;
      }
      if (keys.length === 1 && keys[0] === "tools" && selected.tools.length === 1 && selected.tools[0] === "AI") {
        return { route: "/business/ai-training/", label: "AI研修を探す", canonical: "https://codecamp.jp/business/ai-training/", indexable: true };
      }
      if (keys.length === 1 && keys[0] === "themes" && selected.themes.length === 1 && selected.themes[0] === "生成AI") {
        return { route: "/business/ai-training/", label: "AI研修を探す", canonical: "https://codecamp.jp/business/ai-training/", indexable: true };
      }
      if (keys.length === 2 && selected.tools?.includes("AI") && selected.formats?.length === 1 && selected.formats[0] === "オンライン") {
        const page = seoFacetRoutes.find((item) => item.route.endsWith('/online/'));
        return page && { route: page.route, label: page.title, canonical: page.canonical, indexable: page.indexable };
      }
      if (keys.length === 2 && selected.themes?.length === 1 && selected.themes[0] === "生成AI" && selected.formats?.length === 1 && selected.formats[0] === "オンライン") {
        const page = seoFacetRoutes.find((item) => item.route.endsWith('/online/'));
        return page && { route: page.route, label: page.title, canonical: page.canonical, indexable: page.indexable };
      }
      if (keys.length === 2 && ((selected.tools?.includes("AI") || selected.themes?.[0] === "生成AI") && selected.audiences?.length === 1 && selected.audiences[0] === "エンジニア")) {
        const page = seoFacetRoutes.find((item) => item.route.endsWith('/for-engineers/'));
        return page && { route: page.route, label: page.title, canonical: page.canonical, indexable: page.indexable };
      }
      return null;
    };
    const maybeNavigateDirectory = (selected) => {
      const keys = Object.keys(selected).filter((key) => selected[key]?.length);
      const onlyAiTool = keys.length === 1 && keys[0] === "tools" && selected.tools.length === 1 && selected.tools[0] === "AI";
      if (!aiDirectoryMode && onlyAiTool && ROUTE === "/business/training/") {
        location.href = href("/business/ai-training/");
        return true;
      }
      if (aiDirectoryMode && ROUTE === "/business/ai-training/" && !(selected.tools || []).includes("AI")) {
        location.href = href("/business/training/");
        return true;
      }
      return false;
    };
    const apply = () => {
      const selected = {};
      inputs.forEach((input) => {
        if (!input.checked) return;
        (selected[input.dataset.masterFilter] ||= []).push(input.value);
      });
      if (maybeNavigateDirectory(selected)) return;
      let count = 0;
      document.querySelectorAll("#masterGrid .training-card").forEach((card) => {
        const item = trainingById(card.dataset.trainingId);
        const visible = item && Object.entries(selected).every(([key, values]) => {
          if (!values.length) return true;
          if (key === "status") return values.includes(item.status);
          if (key === "delivery") return values.some((value) => item.delivery.includes(value) || (value === 'open' && item.openCourses.length));
          if (key === "tools") {
            const source = [...(item.tools || []), ...(item.themes || []), ...(item.keywords?.secondary || []), item.keywords?.primary || ""];
            return values.some((value) => {
              if (value === "AI") return source.some((itemValue) => /AI|ChatGPT|Claude|生成AI|機械学習|RAG/i.test(String(itemValue)));
              return source.some((itemValue) => String(itemValue).includes(value) || value.includes(String(itemValue)));
            });
          }
          const source = item[key] || [];
          return values.some((value) => source.some((itemValue) => itemValue.includes(value) || value.includes(itemValue)));
        });
        card.hidden = !visible;
        if (visible) count += 1;
      });
      document.getElementById("masterCount").textContent = String(count);
      document.getElementById("masterEmpty").hidden = count !== 0;
      const aiFocus = Boolean(selected.tools?.includes("AI") || aiDirectoryMode);
      const titleEl = document.getElementById("masterPageTitle");
      const leadEl = document.getElementById("masterPageLead");
      const hintEl = document.getElementById("masterAiHint");
      if (titleEl) titleEl.textContent = aiFocus ? "AI研修を探す" : "研修を探す";
      if (leadEl) {
        leadEl.textContent = aiFocus
          ? "言語・ツール=AI の条件をディレクトリURL /business/ai-training/ で表現しています。クエリパラメータは使いません。"
          : "Trendsの研修検索と同様に絞り込みます。インデックスしたい条件はディレクトリ型URLへ遷移します（例: 言語・ツール=AI → /business/ai-training/）。";
      }
      if (hintEl) {
        hintEl.hidden = !aiFocus;
        if (aiFocus) hintEl.textContent = aiDirectoryMode
          ? "現在のディレクトリURLは /business/ai-training/ です（言語・ツール=AI）。"
          : "言語・ツールでAIを選ぶと /business/ai-training/ へ遷移します。";
      }
      document.title = `${aiFocus ? "AI研修を探す" : "研修を探す"} | CodeCamp Prototype`;
      const labelMap = { tools: "言語・ツール", categories: "カテゴリ", themes: "テーマ", audiences: "対象者", delivery: "形態", formats: "形式", status: "ページ状態" };
      const displayMap = { customize: "カスタマイズ", package: "パッケージ", open: "公開講座", existing: "既存ページ", candidate: "新設候補", language: "言語・ツール", hierarchy: "階層", theme: "テーマ", occupation: "職種" };
      const activeLabels = Object.entries(selected).filter(([, values]) => values.length).map(([key, values]) => {
        const display = values.map((value) => displayMap[value] || value).join("・");
        setFacetTabValue("masterFacetNav", key, display);
        return `${labelMap[key]}：${display}`;
      });
      Object.keys(labelMap).filter((key) => !selected[key]?.length).forEach((key) => setFacetTabValue("masterFacetNav", key, "すべて"));
      const summary = document.getElementById("masterSelectedFilters");
      if (summary) summary.textContent = activeLabels.length ? activeLabels.join(" / ") : "条件指定なし";
      const destination = destinationFor(selected) || (aiDirectoryMode ? { route: "/business/ai-training/", label: "AI研修を探す", canonical: "https://codecamp.jp/business/ai-training/", indexable: true } : null);
      const query = document.getElementById("masterQuery");
      const badge = document.getElementById("masterSeoBadge");
      const link = document.getElementById("masterStaticLink");
      if (destination) {
        query.textContent = `ディレクトリURL：${destination.route}／canonical：${destination.canonical}`;
        badge.textContent = destination.indexable ? "index静的ディレクトリ" : "noindex候補ディレクトリ";
        badge.className = `tag ${destination.indexable ? 'tag-green' : 'tag-amber'}`;
        link.href = href(destination.route);
        link.textContent = destination.indexable ? "ディレクトリURLで開く" : "候補URLを確認";
        link.hidden = aiDirectoryMode && destination.route === "/business/ai-training/";
      } else {
        const hasSelection = Object.values(selected).some((values) => values.length);
        query.textContent = hasSelection ? "ホワイトリスト外：クエリURLは作らず、同一ページ内のJS絞り込みのみ" : "URLは変更しません（クエリなし）";
        badge.textContent = "JS絞り込み";
        badge.className = "tag";
        link.hidden = true;
      }
    };
    const resetToTraining = () => {
      if (aiDirectoryMode) {
        location.href = href("/business/training/");
        return;
      }
      inputs.forEach((input) => { input.checked = false; });
      apply();
    };
    inputs.forEach((input) => input.addEventListener("change", apply));
    document.getElementById("masterReset")?.addEventListener("click", resetToTraining);
    document.getElementById("masterResetInspector")?.addEventListener("click", resetToTraining);
    apply();
  }

  function startGuide() {
    storageSet("ccPrototypeGuide", "active");
    storageSet("ccPrototypeGuideStep", "0");
    const first = tourSteps[0];
    if (ROUTE !== first.route) location.href = href(first.route);
    else showGuideStep(0);
  }

  function endGuide() {
    storageRemove("ccPrototypeGuide");
    storageRemove("ccPrototypeGuideStep");
    document.querySelector(".guide-highlight")?.classList.remove("guide-highlight");
    document.getElementById("guidePanel").hidden = true;
    document.getElementById("guideLauncher").hidden = false;
  }

  function restoreGuide() {
    if (storageGet("ccPrototypeGuide") !== "active") return;
    const index = Number(storageGet("ccPrototypeGuideStep") || "0");
    const step = tourSteps[index];
    if (!step) return endGuide();
    if (ROUTE !== step.route) {
      location.href = href(step.route);
      return;
    }
    window.setTimeout(() => showGuideStep(index), 120);
  }

  function moveGuide(delta) {
    const current = Number(storageGet("ccPrototypeGuideStep") || "0");
    const next = current + delta;
    if (next < 0) return;
    if (next >= tourSteps.length) return endGuide();
    storageSet("ccPrototypeGuideStep", String(next));
    const step = tourSteps[next];
    document.querySelector(".guide-highlight")?.classList.remove("guide-highlight");
    if (ROUTE !== step.route) location.href = href(step.route);
    else showGuideStep(next);
  }

  async function showGuideStep(index) {
    const step = tourSteps[index];
    if (!step || ROUTE !== step.route) return;
    const panel = document.getElementById("guidePanel");
    const launcher = document.getElementById("guideLauncher");
    const target = document.querySelector(step.selector);
    if (!panel || !target) return;
    document.querySelector(".guide-highlight")?.classList.remove("guide-highlight");
    launcher.hidden = true;
    panel.hidden = false;
    document.getElementById("guideProgress").textContent = `${index + 1} / ${tourSteps.length}`;
    document.getElementById("guideTitle").textContent = step.title;
    document.getElementById("guideMessage").textContent = step.message;
    document.getElementById("guideBack").disabled = index === 0;
    document.getElementById("guideNext").textContent = index === tourSteps.length - 1 ? "完了" : "次へ";
    await scrollToTarget(target);
    target.classList.add("guide-highlight");
  }

  function scrollToTarget(target) {
    return new Promise((resolve) => {
      let finished = false;
      const done = () => { if (finished) return; finished = true; window.removeEventListener("scrollend", done); resolve(); };
      if ("onscrollend" in window) window.addEventListener("scrollend", done, { once: true });
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(done, 720);
    });
  }

  function routePage() {
    if (ROUTE === "/") return renderEntry();
    if (ROUTE === "/business/") return renderBusinessTop();
    if (ROUTE === "/business/ai-training/") return renderAIHub();
    if (ROUTE === "/business/site-map/") return renderPlanASiteMap();
    const facetLanding = seoFacetRoutes.find((item) => item.route === ROUTE);
    if (facetLanding) return renderFacetLanding(facetLanding);
    if (ROUTE === "/business/training/") return renderTrainingMaster();
    const categoryEntry = Object.entries(categoryPages).find(([, item]) => item.route === ROUTE);
    if (categoryEntry) return renderCategoryPage(categoryEntry[0]);
    if (ROUTE === "/business/customize/") return renderDeliveryPage("customize");
    if (ROUTE === "/business/package-it/") return renderDeliveryPage("package");
    if (ROUTE === "/open/") return renderOpenTop();
    const training = trainings.find((item) => item.route === ROUTE);
    if (training) return renderTrainingDetail(training);
    const course = openCourses.find((item) => item.route === ROUTE);
    if (course) return renderOpenDetail(course);
    if (fixedPages[ROUTE]) return renderFixedPage(fixedPages[ROUTE]);
    return renderNotFound();
  }

  routePage();
})();
