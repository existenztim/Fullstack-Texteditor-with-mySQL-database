const express = require("express");
const router = express.Router();
const app = require("../app");
const mySql = require("mysql2");
const connection = require("./conn");

// GET USER DOCUMENTS
router.post("/", function (req, res, next) {
  //check connection
  connection.connect(function (err) {
    if (err) {
      console.log(`router.post/documents/ has an error connecting to database: ${err}`);
    } else {
      //console.log("router.post/documents succesfully connected to database!"); this line us uncommented for cleaner terminal logg
      const userId = req.body.userId;
      const sql = `SELECT * FROM documents WHERE userId = '${userId}' AND deleted = false ORDER BY createDate DESC`;

      connection.query(sql, function (err, result) {
        if (result) {
          res.status(200).json(result);
        } else if (err) {
          console.error(err);
          res.status(500).json({ msg: err });
        }
      });
    }
  });
});

// SKAPA DOCUMENT
router.post("/add", function (req, res, next) {
  //check connection
  connection.connect(function (err) {
    if (err) {
      console.log(`router.post/documents/add has an error connecting to database: ${err}`);
    } else {
      console.log("router.post/documents/add succesfully connected to database!");
      //if no name was given, add a default name
      let documentName = req.body.name;
      if (!documentName) {
        documentName = "unnamed document";
      }

      const document = req.body;
      let escContent = connection.escape(document.content);
      //check if name in db already exist
      const checkNameSql = `SELECT * FROM documents WHERE documentName LIKE '${documentName}%' AND userId = '${document.userId}' AND deleted = false`;
      connection.query(checkNameSql, function (err, result) {
        if (err) {
          console.error(err);
          res.status(500).json({ msg: err });
        } else {
          //if name exist add increment number at end
          if (result.length > 0) {
            documentName = `${documentName}(${result.length})`;
          }
          //add the document to the database
          const sql = `INSERT INTO documents (documentName, documentContent, userId) VALUES ("${documentName}","${escContent}", "${document.userId}")`;
          console.log(sql);
          connection.query(sql, function (err, result) {
            if (result) {
              res.status(201).json(result);
            } else {
              console.error(err);
              res.status(500).json({ msg: err });
            }
          });
        }
      });
    }
  });
});

// SOFT DELETE DOCUMENT
router.put("/delete", function (req, res, next) {
  //check connection
  connection.connect(function (err) {
    if (err) {
      console.log(`router.put/documents/delete has an error connecting to database: ${err}`);
    } else {
      console.log("router.put/documents/delete succesfully connected to database!");
      const document = req.body;
      const deleteSql = `UPDATE documents SET deleted = true WHERE id = '${document.id}' AND userId = '${document.userId}'`;
      connection.query(deleteSql, function (err, result) {
        if (result) {
          res.status(200).json(result);
        } else {
          console.error(err);
          res.status(500).json({ msg: err });
        }
      });
    }
  });
});

//UPDATE DOCUMENT
router.put("/update", function (req, res, next) {
  //check connection
  connection.connect(function (err) {
    if (err) {
      console.log("router.put/documents/update has an error connecting to database: " + err);
    } else {
      console.log("router.put/documents/update succesfully connected to database!");
      const document = req.body;
      const updateSql = `UPDATE documents SET documentContent = '${document.documentContent}' WHERE id = '${document.id}'`;
      connection.query(updateSql, function (err, result) {
        if (result) {
          res.status(200).json(result);
        } else {
          console.error(err);
          res.status(500).json({ msg: err });
        }
      });
    }
  });
});
module.exports = router;
