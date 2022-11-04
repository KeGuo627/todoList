const mongoose = require("mongoose");

// mongodb => set up schema => setup model => use model to query and update entity in the database
/* 
{
    content: "fafsdfdf0",
    isCompleted: false
}
*/

const todoSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    id: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = todoSchema;
