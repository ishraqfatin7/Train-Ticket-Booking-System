const router = require("express").Router();
const Station = require("../models/station.model");
const Train = require("../models/train.model");

router.post("/", async (req, res) => {
  try {
    const station = new Station(req.body);
    await station.save();
    res.status(201).send(station);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const stations = await Station.find().sort({ station_id: 1 });
    res.status(200).json(stations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:station_id/trains", async (req, res) => {
  const stationId = parseInt(req.params.station_id);

  try {
    const stationExists = await Station.exists({ station_id: stationId });
    if (!stationExists) {
      return res
        .status(404)
        .json({ message: `Station with id: ${stationId} was not found` });
    }

    const trainsAtStation = await Train.aggregate([
      { $unwind: "$stops" },
      { $match: { "stops.station_id": stationId } },
      {
        $project: {
          train_id: 1,
          arrival_time: "$stops.arrival_time",
          departure_time: "$stops.departure_time",
        },
      },
      {
        $sort: {
          "stops.departure_time": 1,
          "stops.arrival_time": 1,
          train_id: 1,
        },
      },
    ]);

    res.status(200).json({ station_id: stationId, trains: trainsAtStation });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
