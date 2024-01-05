const express = require("express");
const controllers = require("../../controllers/auth");

const { validateBody, authenticate, upload } = require("../../middlewares"); 

const {schemas} = require("../../models/user");

const router = express.Router();


router.post("/users/register", validateBody(schemas.registerSchema), controllers.register);
router.get("/users/verify/:verificationToken", controllers.verifyEmail);
router.post("/users/verify", validateBody(schemas.verifySchema),controllers.resendVerifyEmail)
router.post("/users/login", validateBody(schemas.loginSchema), controllers.login);
router.post("/users/logout", authenticate, controllers.logout)
router.get("/users/current", authenticate, controllers.getCurrent);
router.patch("/users/avatars", authenticate, upload.single("avatar"), controllers.updateAvatar)

module.exports = router