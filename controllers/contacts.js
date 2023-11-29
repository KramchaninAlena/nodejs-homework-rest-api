const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const allContacts = await contacts.listContacts();
  res.status(200).json(allContacts);
};

const getContactById = async (req, res) => {
  const oneContact = await contacts.getContactById(req.params.contactId);

  if (!oneContact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(oneContact);
};

const createContact = async (req, res) => {
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  };

const deleteContact = async (req, res) => {
  const deleteContact = await contacts.removeContact(req.params.contactId);
  if (!deleteContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const changeContact = await contacts.updateContact(
    req.params.contactId,
    req.body
  );

  if (!changeContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(changeContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
