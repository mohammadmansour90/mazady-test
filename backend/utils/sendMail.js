const nodemailer = require("nodemailer");


const sendMail = async (options) => {
    if(!options.email){
        throw new Error("no recipient found");
    }

    const transporter = nodemailer.createTransport({
  host: process.env.SMPT_HOST,
  port: process.env.SMPT_PORT,
  auth: {
    user: process.env.SMPT_EMAIL,
    pass: process.env.SMPT_PASS,
  },
});

const message = {
    from:`${process.env.SMPT_FROM_NAME} < ${process.env.SMPT_FROM_EMAIL}`,
    to:options.email,
    subject:options.subject,
    html:options.message,
};

await transporter.sendMail(message);
}

module.exports = sendMail; 