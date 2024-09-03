const express = require("express");
const router = express.Router();
const trainController = require("../controllers/trainController");

router.post("/", trainController.createTrain);
router.get("/", trainController.getTrains);
router.post("/routes", trainController.createRoute);
router.get("/routes", trainController.getRoutes);
router.get("/:train_id", trainController.getTrainById);

module.exports = router;
