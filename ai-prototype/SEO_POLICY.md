# SEO / ファセットURL方針

## 基本ルール

- ユーザー向けナビの探索入口は **「研修を探す」1本**（`/business/training/`）。「AI研修」を並立ナビにしない。
- 通常のファセット操作は同一ページ内のJavaScript絞り込みです。
- `?theme=...` / `?languages=AI` のようなクエリURLは生成しません。
- インデックスしたい条件は **ディレクトリ型の静的パス** で表現します（例: `/business/ai-training/`、`/business/ai-training/online/`）。
- 承認済み静的ページは `index,follow` と自己参照canonicalです。
- 候補ページは要件を満たすまで `noindex,follow` と自己参照canonicalです。
- 0件条件の静的ページは作成せず、本番では404を返します。

## 「研修を探す」とディレクトリURL（案A）

UX参考: [Trends 研修検索のファセット](https://trends.codecamp.jp/apps/training-search/)。

| 画面 | URL | 意味 |
|---|---|---|
| 研修を探す（全件） | `/business/training/` | マスター一覧。クエリなし |
| 研修を探す（言語・ツール=AI） | `/business/ai-training/` | 同じ一覧UX。タイトルは「AI研修を探す」。AI選択のディレクトリ表現 |
| さらに需要のある条件 | `/business/ai-training/online/` など | ホワイトリストの下層ディレクトリ |

- 一覧で「言語・ツール = AI」を選ぶ → タイトルを「AI研修を探す」にし、正規URLとして `/business/ai-training/` へ遷移（`?languages=AI` は使わない）。
- `/business/ai-training/` は別ナビの「もう一つの一覧」ではなく、**同じ「研修を探す」のAI条件をディレクトリ化したページ**。
- その他の組み合わせも、需要と独自内容が揃ったものだけ下層ディレクトリ化。それ以外は `/business/training/` 上のJS絞り込みのみ。

## index対象条件

1. 検索需要が確認できる
2. 既存ページと検索意図が異なる
3. 専用カリキュラムがある
4. 固有の事例・FAQ・到達目標がある
5. 広告・営業上も独立した受け皿が必要

詳細は `seo-whitelist.json` を参照してください。

## プロトタイプ確認用ページ

- `/business/site-map/` は案Aの構造を説明する確認用ページのため `noindex,follow` としています。
- `/requirements/` は要件書ビューアであり、実サイト公開対象ではありません。
- 本番サイトでは、これらの説明用ページを公開するか、社内ドキュメントとして分離するかを別途判断します。
