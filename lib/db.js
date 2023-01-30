//db.js
const mysql = require('mysql2');

const db = mysql.createPool ({
	host: 'localhost',
	user:'root',
	password:'',
	database: 'motion',
  	multipleStatements: true
});

db.getConnection((err) => {
	if (err){
		console.log('Error connection');
	}
	else {
		console.log('Connected to db...');
	}
});

module.exports = db;