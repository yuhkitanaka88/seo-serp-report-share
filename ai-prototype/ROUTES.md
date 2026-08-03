# Routes

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

## 研修詳細

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

## 公開講座詳細

- `/open/generative-ai-for-business/`
- `/open/generative-ai-engineer-camp/`
- `/open/ai-machine-learning-camp/`
- `/open/ai-editor-coding-intensive/`
- `/open/engineer-foundation-camp/`

## AI静的ファセットLP（ホワイトリスト・案A幹構造外）

案Aのページ構造（サイトマップの幹）には含めません。需要と独自内容が揃うまで候補扱いです。

| URL | robots | canonical | 状態 |
|---|---|---|---|
| `/business/ai-training/online/` | `noindex,follow` | `https://codecamp.jp/business/ai-training/online/` | 候補 |
| `/business/ai-training/for-engineers/` | `noindex,follow` | `https://codecamp.jp/business/ai-training/for-engineers/` | 候補 |
| `/business/ai-training/for-all-employees/` | `noindex,follow` | `https://codecamp.jp/business/ai-training/for-all-employees/` | 候補 |
| `/business/ai-training/for-new-employees/` | `noindex,follow` | `https://codecamp.jp/business/ai-training/for-new-employees/` | 候補 |

通常のファセット操作ではURLを生成しません。上記または既存カテゴリ・研修詳細に一致する条件だけ、静的URLへのリンクを表示します。

## 案Aサイトマップ・要件書

- `/business/site-map/` — 案Aのリンク付きサイトマップ（プロトタイプ確認用・noindex）
- `/requirements/` — 法人向けAI研修 サイト構造・キーワード要件書

### AI条件のディレクトリ

- `/business/ai-training/` は「研修を探す」で言語・ツール=AIを選んだときのディレクトリ表現です（並立ナビ項目ではない）。
- ファセット掛け合わせLP（online 等）は幹構造外のホワイトリスト候補。
