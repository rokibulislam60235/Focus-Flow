const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

const PORT = 5000;

app.get("/", (req, res) => {
    res.send("FocusFlow Backend Running");
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
