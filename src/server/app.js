var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

//1.aLLTodos => return all of the todos =>GET
//2.addTodo => add a new todo in the BE, return a boolean flag/status => POST
//3.modTodo => mod the todo in the BE, return a boolean flag/status=>PUT
//4.delTodo => delete the todo in the BE,return a boolean flag/status => DELETE

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);

//mock database
let todos = [
  {
    content: "write some code",
    isCompleted: false,
  },
  {
    content: "watch some movies",
    isCompleted: false,
  },
  {
    content: "listen some music",
    isCompleted: false,
  },
];
const verifyTodoPayload = (req, isAddTodo = false) => {
  if (isAddTodo) {
    return req.body && req.body.content && req.body.isCompleted !== undefined;
  } else {
    return req.body && req.body.index >= 0 && req.body.index < todos.length;
  }
};
//1.aLLTodos
app.get("/allTodos", (_, res) => {
  console.log("retrieve all todos");
  res.json(todos);
});
//2.addTodo(POST)
//todo content will be put in the req.body => {
//    content: "write some paper",
//   isCompleted: false,
//  }
app.post("/addTodo", (req, res) => {
  //happy path
  if (verifyTodoPayload(req, true)) {
    todos = [...todos, req.body];
    res.json({ message: "succeed" });
    return;
  }
  //error handling
  res.json({ message: "failed" });
});

//3.modTodo(PUT)
//req.body => index => 0<=index<todo.length
app.put("/modTodo", (req, res) => {
  //happy path
  if (verifyTodoPayload(req)) {
    const index = req.body.index;
    todos[index].isCompleted = !todos[index].isCompleted;
    res.json({ message: "succeed" });
    return;
  }
  //error handling
  res.json({ message: "failed" });
});

//4.delTodo(DELETE)
app.delete("/delTodo", (req, res) => {
  //happy path
  if (verifyTodoPayload(req, false)) {
    const index = req.body.index;
    todos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    res.json({ message: "succeed" });
    return;
  }
  //error handling
  res.json({ message: "failed" });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
