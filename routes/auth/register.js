//!!! Not yet done
const express = require('express');
const router = express.Router();
const crypto = require("crypto");
//* Register API
router.post("/", function (req, res, next) {
    const {performance} = require("perf_hooks");
    const mysql = require("mysql2");
    const config = {
      host: "31.187.75.30",
      user: "justexplore",
      password: "@Slasher15@",
      database: "blssystem",
    };
  //* Crypto Encryption
  const password = req.body.password;
  const hash = crypto.createHash("sha256", password).update(req.body.password).digest("hex");
  const serial = crypto.randomBytes(16).toString("hex");
    const connection = mysql.createConnection(config);  
    connection.connect((err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Database is up and running.");
      }
    });
    
    connection.query(
        "INSERT INTO useraccount (userserial,locserial,readerserial,username,upassword,mpassword,privilege,encodedby,datecreated,isdelete,deletedby,datedeleted) values ('" + serial + "','" + req.body.locationname + "','" + req.body.locationaddress + "','" + req.body.locationincharge + "','" + req.body.locationcontact + "')",
        function (err, result) {
          if (!err) {
            if (result.affectedRows!=0) {
              var startTime = performance.now();
              res.status(200).send();
              res.end;
              var endTime = performance.now();
              console.log(`Execution Duration: ${endTime - startTime} milliseconds`);
              console.log("Insertion Success!");
              console.log(result);
            } else {
              res.status(201).send();
              res.end;
              console.log("Insertion Failed!");
            }
          } else {
            res.status(202).send();
            res.end;
            console.log("Invalid MySQL Query!");
          }
        }
      );


    connection.end();



});

module.exports = router;
