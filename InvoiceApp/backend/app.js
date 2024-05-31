require("dotenv").config();
const multer = require("multer");
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const upload = multer({ dest: "uploads/" });
const app = express();
const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;
const storage = multer.memoryStorage(); 
const authRouter = require("./routes/auth");
const invoiceRouter = require("./routes/invoice");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const clientRouter = require("./routes/clientDatabase");
app.post("/api/v1/send-email", upload.single("attachment"), (req, res) => {
  const {
    recipientEmail,
    subject,
    body,
    isSir,
    numberOfInvoice,
    lenderName,
    borrowerName,
  } = req.body; // Receive isSir value from request body

  // Dynamically set the salutation based on isSir value
  const salutation = isSir ? "Dear Sir" : "Dear Madam";
  const attachment = req.file;
  if (!attachment) {
    // Changed from file to attachment
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded." });
  }
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: "shivamdotsingh@gmail.com",
      pass: process.env.MAIL_PASSWORD,
    },
  });
  // const isSir = true; // Set this based on user input or any other criteria

  // Define the salutation based on user preference
  // const salutation = isSir ? "Dear Sir" : "Dear Madam";
  const mailOptions = {
    from: "InvoiceApp shivamdotsingh@gmail.com",
    to: recipientEmail,
    subject:
      `FY 2023- 24 Invoice No ${numberOfInvoice} ${borrowerName} –${lenderName}`,
    text:
      `Dear ${body},\n\n` +
      `Please find attached invoice for arranging the debt finance from the ${lenderName}.\n\n` +
      `Request to release the same as soon as possible.\n\n` +
      `Regards,\n` +
      `Amit Singh\n` +
      `Accounts Team\n` +
      `Express Rupya\n` +
      `8591458046`,
      attachments: attachment ? [{ filename: attachment.originalname, content: attachment.buffer }] : [],

  };

  smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Failed to send email." });
    } else {
      console.log("Email sent: " + info.response);
      res.json({ success: true, message: "Email sent successfully." });
    }
    smtpTransport.close();
  });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/invoice", invoiceRouter);
app.use("/api/v1/client", clientRouter);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Application started on port : ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
