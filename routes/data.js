const express = require("express");
const database = require("../db/database.js");
const router = express.Router();

const data = require("../models/data.js");

router.get("/", (req, res) => data.getAllDocs(req, res));

router.get("/:title", (req, res) => data.getDocByTitle(req, res));

router.post("/", (req, res) => data.insertDoc(req, res));

router.put("/", (req, res) => data.updateDoc(req, res));

router.delete("/:title", (req, res) => data.deleteDoc(req, res));

router.post("/reset", async (req, res) => data.resetDB(req, res));

module.exports = router;
