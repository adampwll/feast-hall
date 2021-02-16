var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/test', function(req, res, next) {
  res.send('this is a basic get endpoint');
});

module.exports = router;
