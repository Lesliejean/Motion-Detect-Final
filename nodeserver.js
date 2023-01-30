const express = require('express');
const bodyParser = require('body-parser');
const mysql = require("mysql2");
const app = express();
const cors = require('cors');
const port = 3001;

app.use(cors())
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  parameterLimit: 100000,
  extended: true 
}));
  
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "motion",
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log('Motion Detection');
  });

app.post("/time", (req,res) => {
    let array = req.body.array
    console.log(array);
    connection.query(
        `INSERT INTO motion (datetime) VALUES ('${array.time}')`,
    );
    res.json('saved')
  });

app.post("/cap", (req, res) => {
  let array = req.body.array
  console.log(array);
  connection.query(
    `INSERT INTO motioncapture (datetime, capture) VALUES ('${array.time}', '${array.vid}')`,
  );
  res.json('saved')
});

app.get("/read", (req, res) => {
  connection.query(
    "SELECT * FROM `motioncapture`",
    function (err, results) {
      const image = results.map(result => `${result.capture}`);
      try {
        res.json({ data:results, img:image});
      } catch (err) {
        console.log("error");
      }
    }
  );
});