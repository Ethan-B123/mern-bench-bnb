const express = require("express");
const app = express();
const mongoose = require('mongoose');
const db = require('./private/mongoPath').mongoURI;
const bodyParser = require('body-parser');

const users = require("./routes/api/users");
const events = require("./routes/api/events");

process.stdout.write('\033c');

const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/users", users);
app.use("/api/events", events);

app.listen(port, () => console.log(`Server is running on port ${port}`));