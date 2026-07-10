const {readData, writeData} = require("../utilis/fileHandler");

const getAllTasks = async () => {
    const data = await readData();
    return data.tasks;
};

const addTask = async (task) => {
    const data = await readData();

    const newTask = {
        id: Date.now(),          // Generate a unique ID
        completed: false,        // Default value
        ...task                  // Merge the data sent by the client
    };

    data.tasks.push(newTask);

    await writeData(data);

    return newTask;
};

const updateTask = async (id, updatedTask) => {

    const data = await readData();

    const index = data.tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return null;
    }

    data.tasks[index] = {
        ...data.tasks[index],
        ...updatedTask
    };

    await writeData(data);

    return data.tasks[index];
};

const deleteTask = async (id) => {

    const data = await readData();

    const newTasks = data.tasks.filter(task => task.id !== id);

    if (newTasks.length === data.tasks.length) {
        return false;
    }

    data.tasks = newTasks;

    await writeData(data);

    return true;
};

module.exports = {
    getAllTasks,
    addTask,
    updateTask,
    deleteTask
};