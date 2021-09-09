var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    const data = {
        data: {
            msg: "use route /data to get all documents"
        }
    };

    res.json(data);
});

module.exports = router;