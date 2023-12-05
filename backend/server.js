const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ based: process.env.SECRET_KEY, message: "Hello world!" });
});

app.get("/method", (req, res) => {
  res.json({ message: "Hello world! [300]" });
  console.log(req.body);
  res.sendStatus(200); // OK
});

app.post("/method", (req, res) => {
  res.send("POST request to the homepage");
  console.log(req.body);
});

app.get("/message", (req, res) => {
  res.json({
    message: "Hello world! [ExpressJS] [Firebase]",
    based: process.env.PROJECTID,
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
