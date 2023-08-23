# Create content with Playwright using microcms
playwrightを用いてmicrocmsにコンテンツを作成するテストリポジトリ

## 事前準備
1. microcmsのワークスペースを作成します。
2. サービスIDはenvファイルに用います。
3. `microcms-schema/blog.json`を用いて、APIを作成します。この時エンドポイントの名前は`blog`にしてください。

## 環境準備
1. `pnpm install`を実行します。
2. `pnpm auth`を実行して認証情報をjsonとして保存します。ブラウザが立ちあり、microCMSのログイン画面が表示されますので、ログインしてください。その後、画面を閉じてください。

## 実行
1. `pnpm start`を実行します。
2. `index.ts`内部の`content`の情報をもとにmicrocmsのコンテンツが作成されます。