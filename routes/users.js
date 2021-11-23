const express = require("express");
const router = express.Router();

const controller = require("../controllers/users");
router.post("/users", controller.create);
router.post("/users/generateOtp", controller.generateOtp);
router.get("/users/:userId/verifyOtp", controller.verifyOtp);

module.exports = router;
