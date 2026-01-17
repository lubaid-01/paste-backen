const express = require("express");
const router = express.Router();

const controller = require("../controllers/paste.controller");



// Create paste
router.post("/", controller.createPaste);

// Get all pastes of user
router.get("/", controller.getAllPastesByUser);

// Get paste by id
router.get("/:pasteId", controller.getPasteById);

// Update paste
router.put("/:pasteId", controller.updatePaste);

// Delete paste
router.delete("/:pasteId", controller.deletePaste);

module.exports = router;
