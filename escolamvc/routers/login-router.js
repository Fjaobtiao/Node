var express = require("express");
const router = express.Router();

const loginController = require("../controllers/login-controller");

router.get("/login", loginController.login_get);
router.post("/login", loginController.login_post);

module.exports = router;