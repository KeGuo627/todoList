var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { v4: uuidv4 } = require("uuid");

//connect to database
const connectToMongoose = require("./database/connect");
const Todo = require("./database/modal");
connectToMongoose();

//var indexRouter = require("./routes/index");
//var usersRouter = require("./routes/users");

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
    return req.body && req.body.id;
  }
};
//1.aLLTodos
app.get("/allTodos", async (_, res) => {
  const todosRawData = await Todo.find({});
  const todoLists = todosRawData.map(({ content, isCompleted, id }) => {
    return {
      content,
      isCompleted,
      id,
    };
  });
  console.log("retrieve all todos");
  res.json(todoLists);
});
//2.addTodo(POST)
//todo content will be put in the req.body => {
//    content: "write some paper",
//   isCompleted: false,
//  }
app.post("/addTodo", async (req, res) => {
  //happy path
  if (verifyTodoPayload(req, true)) {
    const todo = new Todo({
      content: req.body.content,
      isCompleted: req.body.isCompleted,
      id: uuidv4(),
    });
    const newTodo = await todo.save();
    if (todo === newTodo) {
      res.status(200).json({
        message: "succeed",
        newTodos: {
          content: newTodo.content,
          isCompleted: newTodo.isCompleted,
          id: newTodo.id,
        },
      });
      return;
    }
    res.status("401").json({ message: "failed" });
  }
  //error handling
  res.status("400").json({ message: "failed" });
});

//3.modTodo(PUT)
//req.body => index => 0<=index<todo.length
app.put("/modTodo", async (req, res) => {
  // happy path
  if (verifyTodoPayload(req)) {
    const id = req.body.id;
    const queryResult = await Todo.findOne({ id });
    const { modifiedCount } = await queryResult.updateOne({
      isCompleted: !queryResult.isCompleted,
    });

    if (modifiedCount) {
      res.json({ message: "succeed" });
      return;
    }

    res.json({ message: "succeed" });
    return;
  }
  //error handling
  res.json({ message: "failed" });
});

//4.delTodo(DELETE)
app.delete("/delTodo", async (req, res) => {
  //happy path
  if (verifyTodoPayload(req)) {
    const id = req.body.id;
    const { deletedCount } = await Todo.deleteOne({ id });
    if (deletedCount) {
      res.json({ message: "succeed" });
      return;
    }
    res.json({ message: "failed" });
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
