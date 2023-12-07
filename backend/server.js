const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
const port = 8000;

app.get("/", (req, res) => {
  res.json({ based: process.env.SECRET_KEY, message: "Hello world!" });
});

app.post("/method", (req, res) => {
  console.log(req.body);

  res.send("POST request to the homepage");
});

app.get("/message", (req, res) => {
  res.json({
    message: "Hello world! [ExpressJS] [Firebase]",
    based: process.env.PROJECTID,
  });
});

app.post("/tasksDelete", (req, res) => {
  /**
   * 1. Read the file
   * 2. Parse the file
   * 3. Find the task
   * 4. Delete the task
   * 5. Write the file
   * 6. Send the response
   * 7. Handle errors
   */
});

app.post("/tasks", (req, res) => {
  console.log(req.body);

  fs.readFile("tasks.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading tasks.json");
    } else {
      const tasks = JSON.parse(data);
      tasks.push(req.body);

      fs.writeFile("tasks.json", JSON.stringify(tasks), (err) => {
        if (err) {
          console.error(err);
          res.status(500).send("Error writing to tasks.json");
        } else {
          res.send("Task added successfully");
        }
      });
    }
  });
});

app.get("/tasks", (req, res) => {
  fs.readFile("tasks.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error reading tasks.json");
    } else {
      const tasks = JSON.parse(data);
      const reversedTasks = tasks.reverse();
      res.json(reversedTasks);
    }
  });
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
