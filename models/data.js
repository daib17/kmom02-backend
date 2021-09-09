const database = require("../db/database.js");

const data = {
  getAllDocs: async function (res) {
    let db;

    try {
      db = await database.getDb();
      resultSet = await db.collection.find({}).toArray();
      return res.json(resultSet);
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

  getDocByName: async function (keyName, res) {
    let db;

    try {
      db = await database.getDb();
      const query = { name: keyName };
      const options = {
        projection: { _id: 1, name: 1, content: 1 }
      };
      const keyObject = await db.collection.findOne(query, options);
      return res.json(keyObject);
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

  insertDoc: async function (keyName, keyContent, res) {
    let db;

    try {
      db = await database.getDb();
      const doc = { name: keyName, content: keyContent };
      const result = await db.collection.insertOne(doc);
      return res.status(201).json(result);
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

  updateDoc: async function (keyName, keyContent, res) {
    let db;

    try {
      db = await database.getDb();
      const filter = { name: keyName };
      const updateDoc = {
        $set: {
          content: keyContent
        }
      }
      const result = await db.collection.updateOne(filter, updateDoc);
      return res.status(204).json(result);
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

  deleteDoc: async function (keyName, res) {
    let db;

    try {
      db = await database.getDb();
      const doc = { name: keyName };
      const result = await db.collection.deleteOne(doc);
      return res.status(204).json(result);
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
};

module.exports = data;
