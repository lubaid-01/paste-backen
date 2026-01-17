const express = require("express");
const router = express.Router();
const controller = require('../controllers/user.controller');


router.get("/:anonId", controller.getUserByAnonId);

router.post('/', controller.createUser);


module.exports = router;