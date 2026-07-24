const express = require("express");
const app = express();
const { DatabaseSync } = require("node:sqlite");

app.get("/", (req, res) => {
    res.send("Hello");
});

app.listen(3001, () => {
    console.log("サーバー起動: http://localhost:3001");
});

const cors = require("cors");
app.use(cors());
app.use(express.json()); //POSTでJSONを受け取れるようにする

let todos = [];

//データベース
const db = new DatabaseSync("todos.db");

db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
    )
    `);

app.get("/todos", (req, res) => {
    const todos = db.prepare("SELECT * FROM todos").all();
    res.json(todos);
});
app.post("/todos", (req, res) => {
    db.prepare("INSERT INTO todos(text, completed) VALUES (?, ?)").run(req.body.text, 0);
    const todos = db.prepare("SELECT * FROM todos").all();
    res.json(todos);
});


app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    db.prepare("DELETE FROM todos WHERE id = ?").run(id);

    const todos = db.prepare("SELECT * FROM todos").all();
    res.json(todos);
});

//完了未完了の切り替え
//map() は、配列の各要素に対して処理を行い、その return の値を集めて新しい配列を作るメソッドです。
app.put("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    //今のtodoを取得
    const current = db.prepare('SELECT * FROM todos WHERE id = ?').get(id);
    //req.bodyにあるものだけ上書き、なければ今の値のまま
    const text = req.body.text ?? current.text;
    const completed = req.body.completed !== undefined ? (req.body.completed ? 1 : 0) : current.completed;

    db.prepare("UPDATE todos SET text = ?, completed = ? WHERE id = ?").run(text, completed, id);
    const todos = db.prepare("SELECT * FROM todos").all();
    res.json(todos);
});