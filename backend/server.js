const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const tasks = { hello: "world" };

app.get("/", (req, res) => {
  res.json(tasks);
});

app.get("/message", (req, res) => {
  res.json({ message: "Hello world! [ExpressJS]" });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
