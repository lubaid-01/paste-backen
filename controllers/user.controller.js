const UserModel = require("../models/user.model");

exports.createUser = async (req, res) => {
  try {
    const userData = req.body;

    const createdUser = await UserModel.create(userData);

    return res.status(201).json({
      success: true,
      createdUser,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,   // this will show schema errors
    });
  }
};


exports.getUserByAnonId = async (req, res) => {
  try {
    const { anonId } = req.params;

    if (!anonId) {
      return res.status(400).json({
        success: false,
        message: "anonId is required",
      });
    }

    const user = await UserModel.findOne({ anonId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


