# Routes（v2）

最終更新: 2026-08-05

## 法人向け研修

- `/business/`
- `/business/about/`
- `/business/voice/`
- `/business/faq/`
- `/business/codecamp-insight/`

## 横断ハブ・カテゴリ

- `/business/training/` — 研修を探す（唯一のナビ入口。Trends風ファセット）
- `/business/ai-training/` — 言語・ツール=AI のディレクトリURL（同一UX・タイトル「AI研修を探す」。並立ナビには出さない）
- `/business/lag-list/`
- `/business/hie-list/`
- `/business/thm-list/`
- `/business/occ-list/`

## 研修形態

- `/business/customize/`
- `/business/package-it/`
- `/open/`

## 研修詳細（レイヤーB・既存／承認寄り）

- `/business/lag-generative-ai-chatgpt/`
- `/business/lag-ai-chatgpt/`
- `/business/claude/`
- `/business/thm-ai-data-analysis/`
- `/business/thm-python-data-science/`
- `/business/thm-automation/`
- `/business/occ-data-engineer-scientist/`
- `/business/dx/`
- `/business/occ-ai-engineer/`
- `/business/thm-ai-literacy/`
- `/business/lag-java/`
- `/business/lag-python/`
- `/business/thm-security/`
- `/business/occ-project-manager/`
- `/business/shinsotsu/`
- `/business/base/`

### Phase 1 追加候補（商品詳細・要承認）

- `/business/ai-agent-development/` — **AIエージェント開発研修**（代表商品。確定6モジュールを束ねる主候補）
- `/business/rag-knowledge-search/` — RAG・社内ナレッジ検索（成果物がエージェント開発と明確に分かれる場合のみ独立。そうでなければ上記の章に留める）

技術名単体（LangChain／LangGraph／MCP／RAG）は当面ルート化せず、モジュール・章・属性として扱う。

## 業務用途・検証詳細（レイヤーC・CMS可・原則 noindex）

展示会・広告・非テック向けに作成してよい。検索エンジンへ載せるのはホワイトリスト昇格後。

| URL候補 | 用途 | robots（初期） |
|---|---|---|
| `/business/ai-inquiry-automation/` | 問い合わせ対応AI | `noindex,follow` |
| `/business/ai-marketing-inhouse/` | マーケ業務内製化・AI活用 | `noindex,follow` |
| `/business/ai-sales-agent/` | 営業支援AIエージェント | `noindex,follow` |
| `/business/ai-knowledge-search/` | 社内文書検索AI（業務括り） | `noindex,follow` |
| `/business/ai-backoffice-automation/` | バックオフィス業務自動化 | `noindex,follow` |

※ パス名は提案。CMSのスラッグに合わせてよい。重要なのは **公開＝indexではない** こと。

## 公開講座詳細

- `/open/generative-ai-for-business/`
- `/open/generative-ai-engineer-camp/`
- `/open/ai-machine-learning-camp/`
- `/open/ai-editor-coding-intensive/`
- `/open/engineer-foundation-camp/`

## AI静的ファセットLP（ホワイトリスト・案A幹構造外）

案Aのページ構造（サイトマップの幹）には含めません。需要と独自内容が揃うまで候補扱いです。

| URL | robots | 状態 |
|---|---|---|
| `/business/ai-training/online/` | `noindex,follow` | 候補 |
| `/business/ai-training/for-engineers/` | `noindex,follow` | 候補 |
| `/business/ai-training/for-all-employees/` | `noindex,follow` | 候補 |
| `/business/ai-training/for-new-employees/` | `noindex,follow` | 候補 |

通常のファセット操作ではURLを生成しません。

## 案Aサイトマップ・要件書・資料ナビ

- `/business/site-map/` — 案Aのリンク付きサイトマップ（プロトタイプ確認用・noindex）
- `/requirements/` — 法人向けAI研修 サイト構造・キーワード要件書
- `/guide/` — 目的別ナビ（資料入口）
- `/strategy/` — ポートフォリオ・展開方針（統合版）
- `/archive/` — v1アーカイブ

### AI条件のディレクトリ

- `/business/ai-training/` は「研修を探す」で言語・ツール=AIを選んだときのディレクトリ表現です（並立ナビ項目ではない）。
- ファセット掛け合わせLP（online 等）は幹構造外のホワイトリスト候補。

### 共通モジュール（ルートにしない）

次は確定カリキュラム資産であり、サイトカテゴリでも必須index詳細でもない。

1. AIエージェント構築
2. LangChain／LangGraph基礎
3. ベクターDB＆RAG基礎（pgvector）
4. LangChain／LangGraph実践
5. MCP基礎
6. AIエージェント実践
