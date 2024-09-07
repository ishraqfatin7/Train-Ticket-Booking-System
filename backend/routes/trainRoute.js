const express = require("express");
const router = express.Router();
const trainController = require("../controllers/trainController");

router.post("/", trainController.createTrain.bind(trainController));
router.get("/", trainController.getTrains.bind(trainController));
router.post("/routes", trainController.createRoute.bind(trainController));
router.get("/routes", trainController.getRoutes.bind(trainController));
router.get("/:train_id", trainController.getTrainById.bind(trainController));

module.exports = router;
