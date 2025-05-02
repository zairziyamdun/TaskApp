const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
  url:        { type: String, required: true },
  filename:   { type: String },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt:  { type: Date, default: Date.now }
});

const taskSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  description: { type: String },
  status:      { type: String, enum: ["new", "in_progress", "done"], default: "new" },
  priority:    { type: String, enum: ["low", "medium", "high"], default: "medium" },
  dueDate:     { type: Date },
  projectId:   { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  assignedTo:  { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  attachments: [attachmentSchema]
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);
