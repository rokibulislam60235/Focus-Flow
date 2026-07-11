const express = require("express");

const router = express.Router();

const {
    getNotes,
    createNote,
    editNote,
    removeNote,
} = require("../controllers/noteController");

router.get("/", getNotes);

router.post("/", createNote);

router.put("/:id", editNote);

router.delete("/:id", removeNote);

module.exports = router;