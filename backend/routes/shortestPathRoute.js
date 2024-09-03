const router = require("express").Router();
const Route = require("../models/route.model");
const PriorityQueue = require("fastpriorityqueue");

router.get("/paths", (req, res) => {
  res.send("Paths Route");
});

router.get("/paths/:from/:to", async (req, res) => {
  const { from, to } = req.params;
  const startStation = parseInt(from, 10);
  const targetStation = parseInt(to, 10);

  try {
    // Fetch all routes from the database
    const routes = await Route.find({});

    // Build the graph
    const graph = {};
    routes.forEach((route) => {
      const { station_from, connections } = route;
      if (!graph[station_from]) {
        graph[station_from] = [];
      }
      connections.forEach((connection) => {
        graph[station_from].push({
          to: connection.station_to,
          distance: connection.distance,
        });
      });
    });

    // Dijkstra's algorithm
    const distances = {};
    const previous = {};
    const pq = new PriorityQueue((a, b) => a.distance < b.distance);

    // Initialize distances and priority queue
    Object.keys(graph).forEach((station) => {
      distances[station] = Infinity;
      previous[station] = null;
    });
    distances[startStation] = 0;
    pq.add({ station: startStation, distance: 0 });

    while (!pq.isEmpty()) {
      const { station: currentStation, distance: currentDistance } = pq.poll();

      if (currentStation === targetStation) {
        break;
      }

      graph[currentStation].forEach((neighbor) => {
        const { to: neighborStation, distance: neighborDistance } = neighbor;
        const newDistance = currentDistance + neighborDistance;

        if (newDistance < distances[neighborStation]) {
          distances[neighborStation] = newDistance;
          previous[neighborStation] = currentStation;
          pq.add({ station: neighborStation, distance: newDistance });
        }
      });
    }

    // Reconstruct the path
    const path = [];
    let currentStation = targetStation;
    while (currentStation !== null) {
      path.unshift(currentStation);
      currentStation = previous[currentStation];
    }
    if (path[0] === startStation) {
      res.json({
        path,
        distance: distances[targetStation],
      });
    } else {
      res.status(404).json({
        message: `No path found from station ${startStation} to station ${targetStation}`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while finding the path",
      error: err.message,
    });
  }
});

module.exports = router;
