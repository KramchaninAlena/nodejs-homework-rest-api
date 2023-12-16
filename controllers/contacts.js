const { HttpError, ctrlWrapper } = require("../helpers");
const { Contact } = require("../models/contact");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const allContacts = await Contact.find(
    { owner },
    "-createAt -updateAt", {skip, limit}
  ).populate("owner", "email");
  res.status(200).json(allContacts);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const oneContact = await Contact.findById(contactId);

  if (!oneContact) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(oneContact);
};

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const deleteContact = async (req, res) => {
  const deleteContact = await Contact.findByIdAndDelete(req.params.contactId);
  if (!deleteContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const changeContact = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!changeContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(changeContact);
};

const updateStatusContact = async (req, res) => {
  const updatedFavorite = req.body.favorite;
  if (updatedFavorite === undefined) {
    throw HttpError(400, "missing field favorite");
    // return res.status(400).json({ message: "missing field favorite" });
  }
  const updateStatus = await Contact.findByIdAndUpdate(
    req.params.contactId,
    { favorite: updatedFavorite },
    { new: true }
  );
  if (!updateStatus) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updateStatus);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
