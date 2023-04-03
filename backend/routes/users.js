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

router.post('/add', function(req, res, next) {
  const user = req.body;
  let userId = uuidv4();
  let encryptPassword = req.body.password;
  encryptPassword = CryptoJS.AES.encrypt(user.password, "salt key").toString();

  const sql = `INSERT INTO users (id, userName, userEmail, userPassword) VALUES ('${userId}','${user.name}', '${user.email}', '${encryptPassword}')`;

  req.app.locals.con.query(sql, function(err, result){
    if (result) {
      res.status(201).json(result);
    } else if (err) {
      console.error(err);
      res.status(500).json({ msg: err });
    }
  });
});

module.exports = router;
