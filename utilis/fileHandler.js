const fs = require("fs/promises");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/data.json");

// Read data.json
const readData = async () => {
    try {
        const data = await fs.readFile(dataFilePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading data:", error);
        throw error;
    }
};

// Write to data.json
const writeData = async (data) => {
    try {
        await fs.writeFile(
            dataFilePath,
            JSON.stringify(data, null, 2),
            "utf-8"
        );
    } catch (error) {
        console.error("Error writing data:", error);
        throw error;
    }
};

module.exports = {
    readData,
    writeData,
};