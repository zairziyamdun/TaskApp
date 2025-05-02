const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB подключен"))
  .catch(err => console.log("Ошибка подключения к MongoDB:", err));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/projects", require("./routes/projects"));
app.use("/api/projects/:projectId/tasks", require("./routes/tasks"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/user", require("./routes/user"));


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
