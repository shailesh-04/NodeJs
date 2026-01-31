import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

app.use(bodyParser.urlencoded({ extended: true }));

let tasks = ["Buy groceries", "Walk the dog"];

const renderHTML = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Direct HTML Task Manager</title>
</head>
<body>
  <h1>Tasks</h1>
  <form action="/add" method="POST">
    <input type="text" name="task" placeholder="New task" required>
    <button type="submit">Add</button>
  </form>
  <ul>
    ${tasks
        .map(
            (task, index) => `
      <li>${task}
        <form action="/delete/${index}" method="POST" style="display:inline;">
          <button type="submit">❌</button>
        </form>
      </li>
    `
        )
        .join("")}
  </ul>
</body>
</html>
`;

app.get("/", (req, res) => res.send(renderHTML()));

app.post("/add", (req, res) => {
    const { task } = req.body;
    if (task) tasks.push(task);
    res.redirect("/");
});

app.post("/delete/:index", (req, res) => {
    const { index } = req.params;
    tasks.splice(index, 1);
    res.redirect("/");
});

app.listen(PORT, () =>
    console.log(`Direct HTML App: http://localhost:${PORT}`)
);
