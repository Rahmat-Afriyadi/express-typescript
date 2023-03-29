const nodemailer = require("nodemailer")

export const mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "rahmatcv725@gmail.com", // generated ethereal user
      pass: "viukoxemihzcfcfi", // generated ethereal password
    },
  });