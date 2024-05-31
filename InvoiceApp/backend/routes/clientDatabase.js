const express = require("express");
const router = express.Router();
const {
  getAllClients,
  getAllLenders,
  addClient,
  addLender,
  getSingleClient,
  getSingleLender,
  updateClient,
  deleteClient,
  updateLender,
  deleteLender,
} = require("../controllers/clientDatabase");

router.route("/getAllClients").get(getAllClients);
router.route("/getAllLenders").get(getAllLenders);
router.route("/addClient").post(addClient);
router.route("/addLender").post(addLender);
router.route("/getSingleClient/:id").get(getSingleClient);
router.route("/getSingleLender/:id").get(getSingleLender);
router.route("/updateClient").patch(updateClient);
router.route("/deleteClient/:id").delete(deleteClient);
router.route("/updateLender").patch(updateLender);
router.route("/deleteLender/:id").delete(deleteLender);

module.exports = router;
