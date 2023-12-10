const express = require("express");

const controllers = require("../../controllers/contacts");

const { validateBody, isValidId } = require("../../middlewares");

const {schemas} = require("../../models/contact");



const router = express.Router();

router.get("/", controllers.getAllContacts);

router.get("/:contactId", isValidId, controllers.getContactById);

router.post("/", validateBody(schemas.addSchema), controllers.createContact);

router.delete("/:contactId", isValidId, controllers.deleteContact);

router.put("/:contactId", isValidId, validateBody(schemas.addSchema),controllers.updateContact);

router.patch("/:contactId/favorite", isValidId, validateBody(schemas.updateFavoriteSchema),controllers.updateFavorite);

module.exports = router;
