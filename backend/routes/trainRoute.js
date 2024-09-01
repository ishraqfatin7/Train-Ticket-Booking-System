const router = require("express").Router();
const Train = require("../models/train.model");
const Route = require("../models/route.model");

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
router.get("/", async (req, res) => {
  try {
    const trains = await Train.find().sort({ train_id: 1 });
    res.status(200).json(trains);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/routes", async (req, res) => {
  console.log(req.body);
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(201).send(route);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/routes/", async (req, res) => {
  try {
    const routes = await Route.find().sort({ route_id: 1 });
    res.status(200).json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/:train_id", async (req, res) => {
  const trainId = parseInt(req.params.train_id);
  try {
    const train = await Train.findOne({ train_id: trainId });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
