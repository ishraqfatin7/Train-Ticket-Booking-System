const router = require("express").Router();
const Train = require("../models/train.model");

router.post("/", async (req, res) => {
  try {
    const train = new Train(req.body);
    await train.save();
    const { train_id, train_name, capacity, stops } = req.body;
    const service_start = stops[0].departure_time;
    const service_ends = stops[stops.length - 1].arrival_time;
    const num_stations = stops.length;
    res.status(201).send({
      train_id: train.train_id,
      train_name: train.train_name,
      capacity: train.capacity,
      service_start,
      service_ends,
      num_stations,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
