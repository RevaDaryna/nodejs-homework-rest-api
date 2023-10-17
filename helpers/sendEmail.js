const nodemailer = require("nodemailer");
const {MEILER_PASSWORD} = process.env

const nodemailerConfig = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "revadara32@gmail.com",
    pass: MEILER_PASSWORD
  }
}
const transporter = nodemailer.createTransport(nodemailerConfig)
const sendEmail = async(data) => {
    const email = {...data, from:"revadara32@gmail.com"};
    await transporter.sendMail(email)
    return true
}

module.exports = sendEmail