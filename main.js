require("dotenv").config();
const express = require("express");
const EventEmitter = require("events");
const myEvent = new EventEmitter();
const bodyParser = require("body-parser");
const dbConnect = require("./config/db");
const auth = require("./middleware/auth");

myEvent.on("test-event", () => {
  console.log("this event is listening");
});

const app = express();
app.use(bodyParser.json());
// app.use(test);
app.set("view engine", "pug");
dbConnect();

const port = 3000;

app.get("/", auth, (req, res) => {
  myEvent.emit("test-event");
  res.json({ Response: "Get Method" });
});

app.use("/api/book", require("./routes/books"));
app.use("/api/auth", require("./routes/user"));

app.get("/send-file", (req, res) => {
  res.render("index.pug", { title: "Welcome", message: "Everyone" });
});

app.get("/book/:id", (req, res) => {
  const id = req.params.id;
  res.json({ Response: `Get Book with id ${id}` });
});

app.post("/", (req, res) => {
  res.json({ Response: "POST Method" });
});

app.all("*", (req, res) => {
  res.send("<h1>Page not found</h1>");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
