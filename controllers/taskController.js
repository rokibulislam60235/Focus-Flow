const {
    getAllTasks,
    addTask,
    updateTask,
    deleteTask,
} = require("../services/taskService");

const getTasks = async (req, res) => {
    try {
        const tasks = await getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks" });
    }
};

const createTask = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({
            message: "Failed to create task",
        });
    }
};

const editTask = async (req, res) => {
    try {
        const id = Number(req.params.id);

        const updatedTask = await updateTask(id, req.body);

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found",
            });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update task",
        });
    }
};

const removeTask = async (req, res) => {
    try {
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
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete task",
        });
    }
};

module.exports = {
    getTasks,
    createTask,
    editTask,
    removeTask,
};