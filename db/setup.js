/**
 * Connect to the database and setup it with some default data.
 */
 "use strict";

 const database = require("./database");
 const fs = require("fs");
 const path = require("path");
 const docs = JSON.parse(
   fs.readFileSync(path.resolve(__dirname, "setup.json"), "utf8")
 );
 
 // Do it.
 resetCollection(docs).catch((err) => console.log(err));
 
 /**
  * Reset a collection by removing existing content and insert a default
  * set of documents.
  *
  * @async
  *
  * @param {string} dsn     DSN to connect to database.
  * @param {string} colName Name of collection.
  * @param {string} doc     Documents to be inserted into collection.
  *
  * @throws Error when database operation fails.
  *
  * @return {Promise<void>} Void
  */
 async function resetCollection(doc) {
   let db;
 
   try {
     db = await database.getDb();
 
     await db.collection.deleteMany();
     await db.collection.insertMany(doc);
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
 