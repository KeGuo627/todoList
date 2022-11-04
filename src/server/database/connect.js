const mongoose = require("mongoose");
const connectstr =
  "mongodb+srv://Oliviake:Guoke%40123@cluster0.53ygiwd.mongodb.net/todoList?retryWrites=true&w=majority";

const connectToMongoose = () => {
  mongoose.connect(connectstr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console), "connection error");
  db.on("open", () => {
    console.log("connect to mongodb!");
  });
};

module.exports = connectToMongoose;
