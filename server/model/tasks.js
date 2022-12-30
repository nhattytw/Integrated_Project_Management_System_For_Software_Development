const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    task: {
      type: String,
    },
    description: {
      type: String,
    },
    status: {
      type: String,
    },
    estimatedCompletionTime: {
      type: Date,
    },
    comments: {
      type: String,
    },
    notify: {
      type: String,
      enum: ["All", "Team"],
      default: "All",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tasks", taskSchema);
