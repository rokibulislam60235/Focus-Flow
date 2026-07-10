const { readData } = require("../utils/fileHandler");

const getDashboardData = async () => {
    const data = await readData();

    const totalTasks = data.tasks.length;

    const completedTasks = data.tasks.filter(
        task => task.completed
    ).length;

    const pendingTasks = totalTasks - completedTasks;

    const highPriorityTasks = data.tasks.filter(
        task => task.priority === "High"
    ).length;

    const totalGoals = data.goals.length;

    const completedGoals = data.goals.filter(
        goal => goal.achieved
    ).length;

    const totalNotes = data.notes.length;

    const productivityScore =
        completedTasks * 5 +
        completedGoals * 10;

    return {
        totalTasks,
        completedTasks,
        pendingTasks,
        highPriorityTasks,
        totalGoals,
        completedGoals,
        totalNotes,
        productivityScore,
    };
};

module.exports = {
    getDashboardData,
};