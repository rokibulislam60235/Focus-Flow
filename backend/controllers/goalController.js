const asyncHandler = require("../middleware/asyncHandler");

const {
    getAllGoals,
    addGoal,
    updateGoal,
    deleteGoal,
} = require("../services/goalService");

const getGoals = asyncHandler(async (req, res) => {
    const goals = await getAllGoals();

    res.status(200).json(goals);
});

const createGoal = asyncHandler(async (req, res) => {
    const { title } = req.body;

    if (!title || title.trim() === "") {
        return res.status(400).json({
            message: "Goal title is required",
        });
    }

    const goal = await addGoal({
        title: title.trim(),
    });

    res.status(201).json(goal);
});

const editGoal = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    const updatedGoal = await updateGoal(id, req.body);

    if (!updatedGoal) {
        return res.status(404).json({
            message: "Goal not found",
        });
    }

    res.status(200).json(updatedGoal);
});

const removeGoal = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    const deleted = await deleteGoal(id);

    if (!deleted) {
        return res.status(404).json({
            message: "Goal not found",
        });
    }

    res.status(200).json({
        message: "Goal deleted successfully",
    });
});

module.exports = {
    getGoals,
    createGoal,
    editGoal,
    removeGoal,
};