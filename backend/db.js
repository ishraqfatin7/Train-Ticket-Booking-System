const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = `mongodb+srv://ishraqmongo:uNWpdRyG4AgXUN9W@cluster0.olxgfnd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let connection;

const connectDB = async (callback) => {
  try {
    await client.connect();
    connection = client.db("EticketDB");
    //console.log(connection);
    console.log("Database connected successfully");
    callback();
  } catch (err) {
    console.log(err);
  }
};

const getDB = () => connection;

module.exports = { connectDB, getDB };
