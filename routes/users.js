var express = require("express");
var router = express.Router();
var db = require("../bin/db");
var auth = require("../bin/auth");

/* GET users listing. */
router.get("/", function (req, res, next) {
  // previously...
  // res.send('respond with a resource');

  // changed to...
  const dbConnect = db.getDb();

  dbConnect
    .collection("listingsAndReviews")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        res.json(result);
      }
    });
});

router.post("/", function (req, res, next) {
  const token = req.body.idtoken;

  console.log("got token? ");
  console.log(token);

  auth
    .verify(token)
    .then(() => {
      res.status(200).send();
    })
    .catch(console.error);
});

module.exports = router;
