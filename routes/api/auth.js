const express = require("express");
const controllers = require("../../controllers/auth");

const { validateBody, authenticate } = require("../../middlewares");

const {schemas} = require("../../models/user");

const router = express.Router();


router.post("/users/register", validateBody(schemas.registerSchema), controllers.register);
router.post("/users/login", validateBody(schemas.loginSchema), controllers.login);
router.post("/users/logout", authenticate, controllers.logout)
router.get("/users/current", authenticate, controllers.getCurrent);

module.exports = router