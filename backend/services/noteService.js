const { readData, writeData } = require("../utils/fileHandler");

const getAllNotes = async () => {
    const data = await readData();
    return data.notes;
};

const addNote = async (note) => {
    const data = await readData();

    const newNote = {
        id: Date.now(),
        ...note,
    };

    data.notes.push(newNote);

    await writeData(data);

    return newNote;
};

const updateNote = async (id, updatedNote) => {
    const data = await readData();

    const index = data.notes.findIndex(note => note.id === id);

    if (index === -1) {
        return null;
    }

    data.notes[index] = {
        ...data.notes[index],
        ...updatedNote,
    };

    await writeData(data);

    return data.notes[index];
};

const deleteNote = async (id) => {
    const data = await readData();

    const filteredNotes = data.notes.filter(note => note.id !== id);

    if (filteredNotes.length === data.notes.length) {
        return false;
    }

    data.notes = filteredNotes;

    await writeData(data);

    return true;
};

module.exports = {
    getAllNotes,
    addNote,
    updateNote,
    deleteNote,
};