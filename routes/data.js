const express = require('express');
const router = express.Router();

const data = require("../models/data.js");

router.get('/',
    (req, res) => data.getAllDocs(res, req)
);

module.exports = router;