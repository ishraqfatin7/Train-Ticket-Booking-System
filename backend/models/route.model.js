const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema({
  route_id: {
    type: Number,
    //required: true,
    unique: true,
  },
  station_from: {
    type: Number,
    //required: true,
  },
  connections: [
    {
      station_to: {
        type: Number,
        //required: true,
      },
      distance: {
        type: Number,
        //required: true,
      },
    },
  ],
});

RouteSchema.pre("save", async function (next) {
  //route id is auto-incremented
  if (!this.route_id) {
    const count = await Route.countDocuments();
    this.route_id = count + 1;
  }
  next();
});

const Route = mongoose.model("Route", RouteSchema);

module.exports = Route;
