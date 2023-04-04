const express = require('express');
const router = express.Router();
const app = require("../app");
const mysql = require("mysql2");
const CryptoJS = require('crypto-js');
const { v4: uuidv4 } = require('uuid');

/* GET users listing. */
router.get('/', function(req, res, next) {
  req.app.locals.con.connect(function(err){
    if (err) {
      console.error(err);
    }
    const sql = "SELECT * FROM `users`";

    req.app.locals.con.query(sql, function(err, result){
      if (result) {
        res.status(200).json(result);
      } else if (err) {
        console.error(err);
        res.status(500).json({ msg: err });
      }

    })
  })
});

// TA BORT DOCUMENT

router.delete('/', function(req, res, next) {

});

// SKAPA DOCUMENT
router.post('/add', function (req, res, next) {
 
});
module.exports = router;
