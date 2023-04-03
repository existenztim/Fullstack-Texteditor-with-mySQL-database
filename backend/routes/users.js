const express = require('express');
const router = express.Router();
const app = require("../app");
const mysql = require("mysql2");

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.app.locals.con.connect(function(err){
    if (err) {
      console.error(err);
    }
    const queryString = "SELECT * FROM `users`";

    req.app.locals.con.query(queryString, function(err, result){
      if (result) {
        res.status(200).json(result);
      } else if (err) {
        console.error(err);
        res.status(500).json({ msg: err });
      }

    })
  })
});

module.exports = router;
