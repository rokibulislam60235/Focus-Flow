const { createTask } = require("./controllers/taskController");

const req = {
    body: {
        title: "Learn Express",
        priority: "high",
    },
};

const res = {
    status(code) {
        this.statusCode = code;
        return this;
    },

    json(data) {
        console.log("Status:", this.statusCode);
        console.log("Response:", data);
    },
};

createTask(req, res);