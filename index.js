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
    todos = [...todos, {text: req.body.text, completed: false}];
    app.post("/todos", (req, res) => {
    todos = [...todos, {text: req.body.text, completed: false}];
    res.json(todos);
});
});