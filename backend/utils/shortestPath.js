const Train = require("../models/train.model");

const createGraph = async () => {
  const graph = await Train.aggregate([
    // Unwind stops array
    { $unwind: "$stops" },

    // Add a field to indicate the order of stops
    {
      $addFields: {
        "stops.stop_order": {
          $indexOfArray: ["$stops.station_id", "$stops.station_id"],
        },
      },
    },

    // Sort by train_id and stop_order to process stops in order
    { $sort: { train_id: 1, "stops.stop_order": 1 } },

    // Group stops by train_id
    {
      $group: {
        _id: "$train_id",
        stops: { $push: "$stops" },
      },
    },

    // Project the final graph structure
    {
      $project: {
        _id: 0,
        train_id: "$_id",
        stops: 1,
      },
    },
  ]);

  return graph;
};

module.exports = createGraph;
