# CodeCamp 法人向け研修サイト遷移プロトタイプ

確定したサイト構造案とキーワード設計を、実際のWebサイトに近い画面遷移で確認するための静的プロトタイプです。

## 第1成果物との違い

- 第1成果物 `codecamp_ai_requirements`：確定した要件・SEO設計を読むドキュメントサイト
- 本成果物 `codecamp_ai_site_prototype`：`/business`トップから各ページを操作・遷移する視覚プロトタイプ

## 起動方法

プロジェクトのルートでローカルサーバーを起動してください。

```bash
cd codecamp_ai_site_prototype
python3 -m http.server 8000
```

ブラウザで次を開きます。

```text
http://localhost:8000/business/
```

## 主な確認ルート

```text
/business/                         法人向け研修トップ
/business/ai-training/             AI研修横断ハブ
/business/training/                全研修ファセット
/business/lag-list/                言語・ツール別研修
/business/hie-list/                階層別研修
/business/thm-list/                テーマ別研修
/business/occ-list/                職種別研修
/business/customize/               カスタマイズ研修
/business/package-it/              パッケージ研修
/open/                             公開講座
```

## AI関連の研修詳細

```text
/business/lag-generative-ai-chatgpt/
/business/lag-ai-chatgpt/
/business/claude/
/business/thm-ai-data-analysis/
/business/thm-python-data-science/
/business/thm-automation/
/business/occ-data-engineer-scientist/
/business/dx/
/business/occ-ai-engineer/          新設候補
/business/thm-ai-literacy/          新設候補
```

## 実装している機能

- 実際のディレクトリ構造を模した複数ページ遷移
- `/business`トップからAIハブ、4カテゴリ、3研修形態、研修詳細、公開講座への導線
- AI研修ハブの目的・対象者・ツール・研修形態フィルター
- 全研修一覧のファセット検索イメージ
- 絞り込みURLの `noindex` 想定表示
- 研修詳細のパンくず、複数カテゴリ導線、研修形態導線
- 法人研修詳細と公開講座詳細の相互リンク
- カリキュラムのアコーディオン
- 全ページ横断の「構造ガイド」
- サイト構造ダイアログ
- レスポンシブ対応

## 注意事項

- 静的な視覚確認用プロトタイプです。
- 実際の問い合わせ、申込、認証、保存、検索インデックス制御は行いません。
- 公開講座の日程・受付状態はサンプル表示です。
- `AIエンジニア研修`と`AIリテラシー研修`は、新設候補を視覚化したページです。

## プレビュー画像

- `preview/business-top.png`
- `preview/ai-hub.png`
- `preview/mobile-business.png`


## 今回の更新

- すべての内部リンクを `index.html` 明記の相対リンクに変更し、ZIP展開後にファイルを直接開いても遷移可能
- ファセットナビゲーションをレスポンシブ化。タブレット・スマートフォンでは条件パネルを開閉可能
- クエリパラメータURLの生成を廃止
- ホワイトリスト済み条件だけ静的URLへ遷移
- 各HTMLへ `robots` と自己参照 `canonical` を静的出力
- `seo-whitelist.json` と `SEO_POLICY.md` を追加
- デザインをワイヤーフレーム寄りに簡素化

### ファイルを直接開く

`business/index.html` をダブルクリックして開始できます。HTTPサーバーでの確認も引き続き可能です。

## ワイヤーフレームUI更新（v2）

- 全ページ上部に「利用者向け画面イメージ」の境界表示を追加
- SEO・canonical・ホワイトリストの説明を、閉じた「設計確認（本番非表示）」へ分離
- AI研修ハブのファセットを、全項目常時表示からタブ切替式へ変更
- PCでは横並びタブ、スマートフォンでは下部ドロワーとして表示
- 選択中の条件をコンパクトなサマリーとして表示
- 全研修ファセットも同じ操作体系に統一
- `/business`トップの構造説明図を、実際の利用者向けクイック検索ナビに変更

### ファセットのレスポンシブ動作

- 901px以上：ページ内にタブ式ファセットを表示
- 900px以下：「条件を変更」ボタンから画面下部の条件ドロワーを開く
- 600px以下：選択肢を2列にし、タップ領域を確保

通常操作は同一ページ内の絞り込みです。URL・canonical・index判定は「設計確認」を開いた場合だけ表示されます。

## 案Aサイトマップと要件書の統合

- `business/site-map/index.html` — 案Aのリンク付きサイトマップ
- `requirements/index.html` — 「法人向けAI研修 サイト構造・キーワード要件書」全文

視覚プロトタイプのヘッダー・フッター・`/business`トップから、案Aサイトマップと要件書を開けます。要件書側からも、視覚プロトタイプと案Aサイトマップへ戻れます。

案AサイトマップのAI研修ハブ配下にある次のリンクは、AIハブの該当ファセットを開きます。

- 目的から選ぶ
- 対象者から選ぶ
- 技術・ツールから選ぶ
- 研修形態から選ぶ
- 実施形式から選ぶ
- 研修詳細へ遷移
