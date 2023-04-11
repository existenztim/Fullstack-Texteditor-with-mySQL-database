const express = require("express");
const router = express.Router();
const app = require("../app");
const mysql = require("mysql2");
//const CryptoJS = require('crypto-js');
//const { v4: uuidv4 } = require('uuid');

// GET USER DOCUMENTS
router.post("/", function (req, res, next) {
  const userId = req.body.userId;

  req.app.locals.con.connect(function (err) {
    if (err) {
      console.error(err);
    }

    const sql = `SELECT * FROM documents WHERE userId = '${userId}' AND deleted = false ORDER BY createDate DESC`;

    req.app.locals.con.query(sql, function (err, result) {
      if (result) {
        res.status(200).json(result);
      } else if (err) {
        console.error(err);
        res.status(500).json({ msg: err });
      }
    });
  });
});

// SKAPA DOCUMENT
router.post("/add", function (req, res, next) {
  //if no name was given, add a default name
  let documentName = req.body.name;
  if (!documentName) {
    documentName = "unnamed document";
  }

  const document = req.body;

  //check if name in db already exist
  const checkNameSql = `SELECT * FROM documents WHERE documentName LIKE '${documentName}%' AND userId = '${document.userId}' AND deleted = false`;
  req.app.locals.con.query(checkNameSql, function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).json({ msg: err });
    } else {
      //if name exist add increment number at end
      if (result.length > 0) {
        documentName = `${documentName}(${result.length})`;
      }
      //add the document to the database
      const sql = `INSERT INTO documents (documentName, documentContent, userId) VALUES ('${documentName}','${document.content}', '${document.userId}')`;
      req.app.locals.con.query(sql, function (err, result) {
        if (result) {
          res.status(201).json(result);
        } else {
          console.error(err);
          res.status(500).json({ msg: err });
        }
      });
    }
  });
});

// SOFT DELETE DOCUMENT
router.put("/delete", function (req, res, next) {
  let documentId = req.body.id;
  const deleteSql = `UPDATE documents SET deleted = true WHERE id = '${documentId}'`;
  req.app.locals.con.query(deleteSql, function (err, result) {
    if (result) {
      res.status(200).json(result);
    } else {
      console.error(err);
      res.status(500).json({ msg: err });
    }
  });
});

//UPDATE DOCUMENT
router.put("/update", function (req, res, next) {
  let document = req.body;
  const updateSql = `UPDATE documents SET documentContent = '${document.documentContent}' WHERE id = '${document.id}'`;
  req.app.locals.con.query(updateSql, function (err, result) {
    if (result) {
      res.status(200).json(result);
    } else {
      console.error(err);
      res.status(500).json({ msg: err });
    }
  });
});
module.exports = router;
