const asyncHandler = require("../middleware/asyncHandler");

const {
    getAllTasks,
    addTask,
    updateTask,
    deleteTask,
} = require("../services/taskService");

const getTasks = asyncHandler(async (req, res) => {
    const tasks = await getAllTasks();

    res.status(200).json(tasks);
});

const createTask = asyncHandler(async (req, res) => {
    const { title, priority } = req.body;

    if (!title || !priority) {
        return res.status(400).json({
            message: "Title and priority are required",
        });
    }

    const validPriorities = ["low", "medium", "high"];

    if (!validPriorities.includes(priority.toLowerCase())) {
        return res.status(400).json({
            message: "Priority must be low, medium, or high",
        });
    }

    const task = await addTask({
        title,
        priority: priority.toLowerCase(),
    });

    res.status(201).json(task);
});

const editTask = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    const updatedTask = await updateTask(id, req.body);

    if (!updatedTask) {
        return res.status(404).json({
            message: "Task not found",
        });
    }

    res.status(200).json(updatedTask);
});

const removeTask = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    const deleted = await deleteTask(id);

    if (!deleted) {
        return res.status(404).json({
            message: "Task not found",
        });
    }

    res.status(200).json({
        message: "Task deleted successfully",
    });
});

module.exports = {
    getTasks,
    createTask,
    editTask,
    removeTask,
};