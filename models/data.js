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
      return res.json({ docs: resultSet });
    } catch (e) {
      return res.status(500).json({
        errors: {
          status: 500,
          path: "GET /data",
          title: "Database error",
          detail: e.message
        }
      });
    } finally {
      await db.client.close();
    }
  },

  getDocByTitle: async function (req, res) {
    let db;

    try {
      db = await database.getDb();
      const filter = { title: req.params.title };
      const options = {
        projection: { _id: 1, title: 1, content: 1 }
      };
      const result = await db.collection.findOne(filter, options);
      return res.json({ doc: result });
    } catch (e) {
      return res.status(500).json({
        errors: {
          status: 500,
          path: "GET /data/:title",
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
      const filter = { title: req.body.title, content: req.body.content };
      const result = await db.collection.insertOne(filter);
      return res.status(201).json({ data: result });
    } catch (e) {
      return res.status(500).json({
        errors: {
          status: 500,
          path: "POST /data",
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
      const filter = { title: req.body.title };
      const updateDoc = {
        $set: {
          content: req.body.content
        }
      };
      // upsert: true - creates doc if it does not exist
      const options = { returnDocument: "after", upsert: true };
      let result = await db.collection.findOneAndUpdate(
        filter,
        updateDoc,
        options
      );
      if (result) {
        return res.status(201).json({ data: result });
      }
    } catch (e) {
      return res.status(500).json({
        errors: {
          status: 500,
          path: "PUT /data/:title",
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
      const filter = { title: req.params.title };
      const result = await db.collection.deleteOne(filter);
      return res.status(204).json({ data: result });
    } catch (e) {
      return res.status(500).json({
        errors: {
          status: 500,
          path: "DELETE /data/:title",
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
          path: "POST /data/reset",
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
