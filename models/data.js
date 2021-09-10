const fs = require("fs");
const path = require("path");
const docs = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../db/default_docs.json"), "utf8")
);
const database = require("../db/database.js");


const data = {
  getAllDocs: async function (req, res) {
    let db;

    try {
      db = await database.getDb();
      resultSet = await db.collection.find({}).toArray();
      return res.json({ data: resultSet });
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
  },

  getDocByName: async function (req, res) {
    let db;

    try {
      db = await database.getDb();
      const filter = { name: req.params.name };
      const options = {
        projection: { _id: 1, name: 1, content: 1 }
      };
      const result = await db.collection.findOne(filter, options);
      return res.json({ data: result });
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
  },

  insertDoc: async function (req, res) {
    let db;

    try {
      db = await database.getDb();
      const filter = { name: req.params.name, content: req.params.content };
      const result = await db.collection.insertOne(filter);
      return res.status(201).json({ data: result });
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
  },

  updateDoc: async function (req, res) {
    let db;

    try {
      db = await database.getDb();
      const filter = { name: req.params.name };
      const options = {
        $set: {
          content: req.params.content
        }
      };
      const result = await db.collection.updateOne(filter, options);
      return res.status(204).json({ data: result });
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
  },

  deleteDoc: async function (req, res) {
    let db;

    try {
      db = await database.getDb();
      const filter = { name: req.params.name };
      const result = await db.collection.deleteOne(filter);
      return res.status(204).json({ data: result });
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
  },

  resetDB: async function (req, res) {
    let db;
    try {
      db = await database.getDb();
      await db.collection.deleteMany();
      const result = await db.collection.insertMany(docs);
      return res.json({ data: result });
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
