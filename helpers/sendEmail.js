const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const config = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "kramchanin_alona@meta.ua",
    pass: META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = async (data) => {
    const emailOptions = { ...data, from: "kramchanin_alona@meta.ua" };
    await transporter.sendMail(emailOptions);
    console.log("Email send success");
 };

  module.exports = sendEmail;