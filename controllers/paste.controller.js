const mongoose = require("mongoose");
const PasteModel = require("../models/paste.model");
const UserModel = require("../models/user.model");

/**
 * POST /api/paste
 * body: { anonId, title, content, option, lang }
 */
exports.createPaste = async (req, res) => {
  try {
    const anonId = req.anonId;
    const {  title, content, option, lang } = req.body;

    if (!anonId) {
      return res.status(400).json({ success: false, message: "anonId is required" });
    }


    const paste = await PasteModel.create({
      user: anonId,
      title,
      content,
      option,
      lang,
    });

    return res.status(201).json({
      success: true,
      paste,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * GET /api/paste?anonId=xxxx
 * returns all pastes of that user
 */
exports.getAllPastesByUser = async (req, res) => {
  try {

    const anonId = req.anonId;

    if (!anonId) {
      return res.status(400).json({ success: false, message: "anonId is required in query" });
    }



    const pastes = await PasteModel.find({ user: anonId, isActive: true })
      .sort({ _id: -1 }); // latest first

    return res.status(200).json({
      success: true,
      count: pastes.length,
      pastes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * GET /api/paste/:pasteId
 */
exports.getPasteById = async (req, res) => {
  try {
    const { pasteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pasteId)) {
      return res.status(400).json({ success: false, message: "Invalid pasteId" });
    }

    const paste = await PasteModel.findOne({ _id: pasteId, isActive: true }).populate(
      "user",
      "anonId username email"
    );

    if (!paste) {
      return res.status(404).json({ success: false, message: "Paste not found" });
    }

    return res.status(200).json({
      success: true,
      paste,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * PUT /api/paste/:pasteId
 * body: { title?, content?, option?, lang? }
 */
exports.updatePaste = async (req, res) => {
  try {
    const { pasteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pasteId)) {
      return res.status(400).json({ success: false, message: "Invalid pasteId" });
    }

    const updatedPaste = await PasteModel.findOneAndUpdate(
      { _id: pasteId, isActive: true },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedPaste) {
      return res.status(404).json({ success: false, message: "Paste not found" });
    }

    return res.status(200).json({
      success: true,
      updatedPaste,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

/**
 * DELETE /api/paste/:pasteId
 * soft delete => isActive:false
 */
exports.deletePaste = async (req, res) => {
  try {
    const { pasteId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(pasteId)) {
      return res.status(400).json({ success: false, message: "Invalid pasteId" });
    }

    const deletedPaste = await PasteModel.findOneAndUpdate(
      { _id: pasteId, isActive: true },
      { $set: { isActive: false } },
      { new: true }
    );

    if (!deletedPaste) {
      return res.status(404).json({ success: false, message: "Paste not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Paste deleted successfully",
      deletedPaste,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
