const express = require("express");
const database = require("../db/database.js");
const router = express.Router();

const data = require("../models/data.js");

router.get("/", (req, res) => data.getAllDocs(req, res));

router.get("/:name", (req, res) => data.getDocByName(req, res));

router.post("/:name/:content", (req, res) => data.insertDoc(req, res));

router.put("/:name/:content", (req, res) => data.updateDoc(req, res));

router.delete("/:name", (req, res) => data.deleteDoc(req, res));

router.post("/reset", async (req, res) => data.resetDB(req, res));

module.exports = router;
