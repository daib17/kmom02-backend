const database = require("../db/database.js");

const data = {
  getAllDocs: async function (res, req) {
    let db;
    let data;

    try {
      db = await database.getDb();
      data = await db.collection.find().toArray();
      res.json(data);
    } catch (e) {
      return res.status(500).json({
        errors: {
          status: 500,
          source: "/",
          title: "Database error",
          detail: e.message
        }
      });
    } finally {
      await db.client.close();
    }
  }
};

module.exports = data;
