const express = require('express');
const session = require('express-session');

const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const bcrypt = require('bcrypt');

const db = require('./db');

const app = express();
app.use(cors());
app.use(session({ 
    secret: 'woody',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

//app.use(express.bodyParser());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({origin: true, credentials: true}));

app.listen(3001);

app.get("/", (req, res) => {
    res.send('Hello, Everyone!');
});

app.post("/register", (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const password1 = req.body.password1;

    const query = `INSERT INTO account (username, email, password) VALUES (?, ?, ?)`;
    const query_2 = `SELECT * FROM account WHERE username = ?`;
    const query_3 = `SELECT * FROM account WHERE email = ?`;

    db.query(query_2, [username], (err, results) => {
        if(err) {
            res.status(500).json({ message: err });
        }
        if(results.length > 0){
            res.status(500).json({ message: "Username already exists!" });
        }
        if(results.length === 0){
            db.query(query_3, [email], (err, results) => {
                if(err) {
                    res.status(500).json({ message: err });
                }
                if(results.length > 0){
                    res.status(500).json({ message: "Email Address already exists!" });
                }
                if(results.length === 0){
                    const hashedPassword = bcrypt.hashSync(password, 10);
                    if(password == password1){
                        db.query(query, [username, email, hashedPassword], (err, results) => {
                            try {
                                res.status(200).json({message: "You have successfully registered! You may login now."});
                            } catch (err) {
                                res.status(500).json({ message: err });
                            }
                        });
                    }
                    else{
                        res.status(500).json({ message: 'Password not same' });
                    }
                    
                }

            });
        }

    });
});


app.post("/authenticate", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const query = `SELECT * FROM account WHERE username = ?`;

    db.query(query, [username], (err, results) => {
        console.log(results)
        if (err) {
            res.status(500).json({ message: err });
        }
        if (results.length === 0){
            console.log('2')
            res.status(500).json({ message: "Invalid Username or Password!" });
        } 
        else {
            bcrypt.compare(password, results[0].password, function(err, result) {
                if(err) {
                    res.status(500).json({ message: err });
                }
                if ( result == false ) {
                    console.log('error error')
                    console.log(results)
                    res.status(500).json({ message: 'Invalid Username or Password!' });
                }
                if ( result == true ) {
                    res.status(201).json({ message: 'Success login' });
                }
            });
        }
    });
});

app.post("/forgotpass", async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const password1 = req.body.password1;

    const query = `SELECT * FROM account WHERE email = ?`
    const query1 = `SELECT password FROM account WHERE email = ?`
    const query2 = `UPDATE account SET password = ? WHERE email = ?`

    db.query(query, [email], (err, results) => {
        console.log(results);
        console.log("up only")
        if (err) {
            res.status(500).json({message:err});
            console.log("error error error")
        }
        if (results.length === 0){
            console.log('2')
            res.status(500).json({ message: "No Email!" });
        } 
        else {
            db.query(query1, [email], (err, results) => {
                console.log(results);
                const hashedPassword = bcrypt.hashSync(password, 10);
                if(password == password1){
                    db.query(query2, [hashedPassword, email], (err, results) => {
                        try {
                            res.status(200).json({message: "You have successfully update your password."});
                        } catch (err) {
                            res.status(500).json({ message: err });
                        }
                    });
                } else{
                    res.status(500).json({ message: "The password don't match!" });
                    console.log("goes here")
                }
            });
        }

    });

    
});

app.get("/read", (req, res) => {
    db.query(
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

