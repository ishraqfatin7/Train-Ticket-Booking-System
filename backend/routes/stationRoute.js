const express = require("express");
const router = express.Router();
const stationController = require("../controllers/StationController");

router.post("/", stationController.createStation.bind(stationController));
router.get("/", stationController.getStations.bind(stationController));
router.get(
  "/:station_id/trains",
  stationController.getTrainsAtStation.bind(stationController)
);

module.exports = router;
