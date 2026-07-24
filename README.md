# Todo Server

Todoアプリ([todo-app](https://github.com/tsunat973/todo-app))のバックエンドAPIです。
Node.js + Express + SQLiteで構築した、CRUD操作を行うREST APIです。

## デモ

🔗 https://todo-server-6lq9.onrender.com/todos

※ フロントエンド込みのデモは [todo-app](https://github.com/tsunat973/todo-app) 側を参照してください。

## 使用技術

- Node.js / Express
- SQLite(`node:sqlite`)
- CORS対応
- Render(デプロイ)

## API一覧

| メソッド | エンドポイント | 説明 |
|---|---|---|
| GET | `/todos` | Todo一覧を取得 |
| POST | `/todos` | 新しいTodoを追加 |
| PUT | `/todos/:id` | 指定したTodoの内容(text/completed)を更新 |
| DELETE | `/todos/:id` | 指定したTodoを削除 |

## こだわった点

- SQLiteを使い、サーバーを再起動してもデータが消えない永続化を実装しました
- `PUT`は`toggle`用・`save`用でエンドポイントを分けず、`req.body`の内容に応じて更新項目を切り替える設計にしました
- SQLインジェクション対策として、SQL文にプレースホルダー(`?`)を使っています

## ローカルでの動かし方

\`\`\`bash
git clone https://github.com/tsunat973/todo-server.git
cd todo-server
npm install
node index.js
\`\`\`

サーバーは `http://localhost:3001` で起動します。