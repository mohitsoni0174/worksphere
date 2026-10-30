const mongoose = require("mongoose");

// Define task structure
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    status: {
      type: String,
      default: "Pending",
    },

    priority: {
      type: String,
      default: "Medium",
    },

    dueDate: {
      type: Date,
    },
  },
  { timestamps: true },
);

// Create Task model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
