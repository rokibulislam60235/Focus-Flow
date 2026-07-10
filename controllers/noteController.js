const asyncHandler = require("../middleware/asyncHandler");

const {
    getAllNotes,
    addNote,
    updateNote,
    deleteNote,
} = require("../services/noteService");

const getNotes = asyncHandler(async (req, res) => {
    const notes = await getAllNotes();

    res.status(200).json(notes);
});

const createNote = asyncHandler(async (req, res) => {
    const { content } = req.body;

    if (!content || content.trim() === "") {
        return res.status(400).json({
            message: "Note content is required",
        });
    }

    const note = await addNote({
        content: content.trim(),
    });

    res.status(201).json(note);
});

const editNote = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    const updatedNote = await updateNote(id, req.body);

    if (!updatedNote) {
        return res.status(404).json({
            message: "Note not found",
        });
    }

    res.status(200).json(updatedNote);
});

const removeNote = asyncHandler(async (req, res) => {
    const id = Number(req.params.id);

    const deleted = await deleteNote(id);

    if (!deleted) {
        return res.status(404).json({
            message: "Note not found",
        });
    }

    res.status(200).json({
        message: "Note deleted successfully",
    });
});

module.exports = {
    getNotes,
    createNote,
    editNote,
    removeNote,
};