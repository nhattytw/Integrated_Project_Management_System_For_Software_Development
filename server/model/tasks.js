const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    developer: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userInfo",
      },
    ],
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
