const express = require("express");
const router = express.Router();

const data = require("../models/data.js");

router.get('/',
    (req, res) => data.getAllDocs(res)
);

router.get('/:name',
    (req, res) => data.getDocByName(req.params.name, res)
);

router.post("/:name/:content", (req, res) =>
  data.insertDoc(req.params.name, req.params.content, res)
);

router.put("/:name/:content", (req, res) =>
  data.updateDoc(req.params.name, req.params.content, res)
);

router.delete("/:name", (req, res) =>
  data.deleteDoc(req.params.name, res)
);

module.exports = router;
