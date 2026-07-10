const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const goalRoutes = require("./routes/goalRoutes");
const noteRoutes = require("./routes/noteRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const errorHandler = require("./middleware/errorHandler");


const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/notes", noteRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use(errorHandler);

// Home Route
app.get("/", (req, res) => {
    res.send("🚀 FocusFlow Backend Running");
});

// API Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/goals", goalRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
