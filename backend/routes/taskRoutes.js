const express = require("express");
const router = express.Router();

const {
    getTasks,
    createTask,
    editTask,
    removeTask,
} = require("../controllers/taskController");

router.get("/", getTasks);

router.post("/", createTask);

router.put("/:id", editTask);

router.delete("/:id", removeTask);

module.exports = router;