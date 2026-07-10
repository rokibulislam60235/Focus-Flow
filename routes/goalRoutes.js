const express = require("express");
const router = express.Router();

const {
    getGoals,
    createGoal,
    editGoal,
    removeGoal,
} = require("../controllers/goalController");

router.get("/", getGoals);
router.post("/", createGoal);
router.put("/:id", editGoal);
router.delete("/:id", removeGoal);

module.exports = router;