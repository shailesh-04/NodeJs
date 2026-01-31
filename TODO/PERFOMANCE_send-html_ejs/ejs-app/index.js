import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const PORT = 3000;

// View engine setup
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

let tasks = ["Buy groceries", "Walk the dog"];

app.get("/", (req, res) => {
  res.render("index", { tasks });
});

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

app.listen(PORT, () => console.log(`EJS App: http://localhost:${PORT}`));
