import http from "http";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

/**
 * Loads environment variables from a .env file into process.env.
 * Remove this line before pushing to production.
 */
import dotenv from "dotenv";
dotenv.config();

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  databaseURL: process.env.DATABASEURL,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * Creates an HTTP server and handles incoming requests.
 *
 * @param {http.IncomingMessage} req - The incoming request object.
 * @param {http.ServerResponse} res - The server response object.
 */

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/login") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const { username, password } = JSON.parse(body);
      if (username === "admin" && password === "admin") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("Login successful!");
      } else {
        res.statusCode = 401;
        res.setHeader("Content-Type", "text/plain");
        res.end("Invalid username or password");
      }
    });
  } else if (req.method === "POST" && req.url === "/") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const task = JSON.parse(body);
      saveTask(task);
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/plain");
      res.end("Task saved successfully!");
    });
  } else if (req.method === "POST" && req.url === "/add-hello-world") {
    saveTask("hello world");
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Added 'hello world' to the database!");
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end("Not found");
  }
});

function saveTask(task) {
  const tasksRef = firebase.database().ref("tasks");
  tasksRef.push(task);
}

const port = 3000;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
