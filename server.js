const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
// app.use("/auth", require("./routes/auth"));
app.use("/api/test", require("./routes/api/test"));
app.use("/api/registeration", require("./routes/api/users"));
app.use("/api/admin_create", require("./routes/api/adminCreate"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/admin", require("./routes/api/admin"));
app.use("/api/courses", require("./routes/api/courses"));
app.use("/api/category", require("./routes/api/category"));

// serve static assets in production
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV === "production") {
  app.use(express.static("bepacedu/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "bepacedu", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
