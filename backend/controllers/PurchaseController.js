const User = require("../models/user.model");
const Train = require("../models/train.model");

class PurchaseController {
  async updateTickets(req, res) {
    const { wallet_id, time_after, station_from, station_to } = req.body;
    try {
      if (!time_after || !station_from || !station_to) {
        return res.status(400).json({ message: "Invalid request data" });
      }

      // Fetch wallet
      const wallet = await User.findOne({ wallet_id: wallet_id });
      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found" });
      }
      const routes = await Train.findOne({
        "stops.station_id": station_from,
        "stops.station_id": station_to,
        "stops.departure_time": { $gte: time_after },
      });
      if (!routes) {
        return res.status(403).json({
          message: `No ticket available for station: ${station_from} to station: ${station_to}`,
        });
      }

      // Calculate total fare and check balance
      let totalFare = 0;
      const stations = routes.stops; // Traverse the stops array of objects, until station_from is found add fare to previousStationsFare, then start adding fare to totalFare until station_to is found
      let previousStationsFare = 0;
      for (let i = 0; i < stations.length; i++) {
        if (stations[i].station_id === station_from) {
          previousStationsFare = stations[i].fare;
        }
        if (stations[i].station_id === station_to) {
          totalFare += stations[i].fare;
          break;
        }
      }
      totalFare -= previousStationsFare;
      console.log(totalFare);
      if (wallet.balance < totalFare) {
        return res.status(403).json({ message: "Insufficient balance" });
      } else {
        // Deduct fare from wallet
        wallet.balance -= totalFare;
        // Update wallet balance in database
        await User.findOneAndUpdate(
          { wallet_id: wallet_id },
          { balance: wallet.balance }
        );

        res.status(200).json({
          wallet_id: wallet.wallet_id,
          wallet_balance: wallet.balance,
          ticket: {
            ticket_id: 1,
            station_from,
            station_to,
            fare: totalFare,
            time_after,
          },
        });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PurchaseController();
