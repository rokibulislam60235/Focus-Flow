const { readData, writeData } = require("../utils/fileHandler");

const getAllGoals = async () => {
    const data = await readData();
    return data.goals;
};

const addGoal = async (goal) => {
    const data = await readData();

    const newGoal = {
        id: Date.now(),
        achieved: false,
        ...goal,
    };

    data.goals.push(newGoal);

    await writeData(data);

    return newGoal;
};

const updateGoal = async (id, updatedGoal) => {
    const data = await readData();

    const index = data.goals.findIndex(goal => goal.id === id);

    if (index === -1) return null;

    data.goals[index] = {
        ...data.goals[index],
        ...updatedGoal,
    };

    await writeData(data);

    return data.goals[index];
};

const deleteGoal = async (id) => {
    const data = await readData();

    const filteredGoals = data.goals.filter(goal => goal.id !== id);

    if (filteredGoals.length === data.goals.length) return false;

    data.goals = filteredGoals;

    await writeData(data);

    return true;
};

module.exports = {
    getAllGoals,
    addGoal,
    updateGoal,
    deleteGoal,
};