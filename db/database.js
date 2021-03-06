const mongo = require("mongodb").MongoClient;
const config = require("./config.json");
const collectionName = "docs";

const dsnLocal = process.env.DBWEBB_DSN || "mongodb://localhost:27017/danieldocs";
const dsnCloud = `mongodb+srv://${config.username}:${config.password}@cluster0.xyuvs.mongodb.net/danieldocs?retryWrites=true&w=majority`;

const database = {
  getDb: async function getDb() {
    let dsn = dsnCloud;

    if (process.env.NODE_ENV === "test") {
      dsn = "mongodb://localhost:27017/test";
    }

    const client = await mongo.connect(dsn, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    const db = await client.db();
    const collection = await db.collection(collectionName);

    return {
      collection: collection,
      client: client
    };
  }
};

module.exports = database;
