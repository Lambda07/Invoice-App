const express = require("express");
const router = express.Router();
const {
  createInvoice,
  updateInvoice,
  getAllInvoice,
  getNumberOfInvoice,
  getSingleInvoice,
  deleteInvoice,
  updateInvoiceData,
} = require("../controllers/invoice");

router.route("/createInvoice").post(createInvoice);
router.route("/updateInvoice").patch(updateInvoice);
router.route("/getAllInvoice").get(getAllInvoice);
router.route("/getNumberOfInvoice").get(getNumberOfInvoice);
router.route("/getSingleInvoice").post(getSingleInvoice);
router.route("/deleteInvoice").delete(deleteInvoice);
router.route("/updateInvoiceData").patch(updateInvoiceData);

module.exports = router;
