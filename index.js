require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Login } = require("./Rest/Login");
const { Register } = require("./Rest/Register");
const { NewList } = require("./Rest/NewList");
const { AddNewToDo } = require("./Rest/AddNewToDo");
const { changeToDoToDone } = require("./Rest/ChangeToDoToDone");
const { changeToDoToPending } = require("./Rest/changeToDoToPending");

const User = require("./Database/Users");
const Lists = require("./Database/Lists");

// connect to the mongoDB Database
mongoose.connect(
  "mongodb+srv://Umid:Umid_bipul@crowdbazaar.gt3jz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to database...");
  }
);
// cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// body parser
app.use(bodyParser());
app.use(express.static(path.join(__dirname, "./client/build")));

// login API
app.post("/login", (req, res) => {
  console.log(req.body);
  Login(req, res).then((data) => {
    console.log(data);
    res.json(data);
  });
});
// register API
app.post("/register", (req, res) => {
  console.log("register", req.body);
  Register(req, res).then((data) => {
    res.json(data);
  });
});

// API to add new list of todos
app.post("/newList", async (req, res) => {
  NewList(req, res).then((data) => {
    res.json(data);
  });
});
// API to get All the list of the user
app.post("/getAllTheListOfTheUser", async (req, res) => {
  const lists = await Lists.find({ email: req.body.email });
  res.json(lists);
});

// API to get 1 list of todos from id
app.post("/getListFromId", async (req, res) => {
  const lists = await Lists.findOne({ _id: req.body.id });
  res.json(lists);
});
// API to add new to do in a list from list id
app.post("/addNewToDo", async (req, res) => {
  AddNewToDo(req, res).then((data) => [res.json(data)]);
});
// API to change to pending todo to done
app.post("/changeToDoToDone", async (req, res) => {
  changeToDoToDone(req, res).then((data) => {
    res.json(data);
  });
});
// API to change to done todo to pending
app.post("/changeToDoToPending", async (req, res) => {
  changeToDoToPending(req, res).then((data) => {
    res.json(data);
  });
});

// API to verify the user email
app.get("/verifyMail/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    const u = await User.updateOne({ _id: id }, { $set: { idConfirm: true } });
    return res.redirect(process.env.url);
  } catch (err) {
    res.send(err);
  }
  //redirect to desired page
  return res.redirect(process.env.url);
});

// get the frotend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

app.all("*", (req, res) => {
  res.status(200).send("Hey dont put random urls");
});

const server = app.listen(process.env.PORT || 9000, () => {
  console.log("server started");
});
