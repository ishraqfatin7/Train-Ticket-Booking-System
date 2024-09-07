const express = require("express");
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");

router.put(
  "/tickets",
  purchaseController.updateTickets.bind(purchaseController)
);

module.exports = router;
