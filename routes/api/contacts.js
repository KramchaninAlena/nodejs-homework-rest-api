const express = require("express");

const controllers = require("../../controllers/contacts");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const {schemas} = require("../../models/contact");



const router = express.Router();

router.get("/", authenticate, controllers.getAllContacts);

router.get("/:contactId", authenticate, isValidId, controllers.getContactById);

router.post("/", authenticate, validateBody(schemas.addSchema), controllers.createContact);

router.delete("/:contactId", authenticate, isValidId, controllers.deleteContact);

router.put("/:contactId", authenticate, isValidId, validateBody(schemas.addSchema),controllers.updateContact);

router.patch("/:contactId/favorite", authenticate, isValidId, validateBody(schemas.updateFavoriteSchema),controllers.updateStatusContact);

module.exports = router;
