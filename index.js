const express = require("express");
const app = express();

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

app.get("/todos", (req, res) => {
    res.json(todos);

});
app.post("/todos", (req, res) => {
    todos = [...todos, { text: req.body.text, completed: false }];
    res.json(todos);
});


app.delete("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    todos = todos.filter((todo, index) => index !== id);
    res.json(todos);
});

//完了未完了の切り替え
//map() は、配列の各要素に対して処理を行い、その return の値を集めて新しい配列を作るメソッドです。
app.put("/todos/:id", (req, res) => {
    const id = Number(req.params.id);
    todos = todos.map((todo, index) => {
        if (index === id) {
            return {
                ...todo,
                ...req.body,
            };
        }
        return todo;
    })
    res.json(todos);
});