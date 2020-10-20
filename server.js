const mysql = require('mysql');
const express = require('express')
const bodyParser = require('body-parser')
const app = express();


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dumy'
});

connection.connect((err) => {
    if (err) console.log(err)
    console.log("Database connected")
});

app.get('/orders/totalpercustomers', function (req, res) {

    connection.query('SELECT customerId, sum(amount) as total, createdDate FROM orders GROUP by customerId', function (error, results, fields) {
        if (error) throw error;
        res.json({ success: true, data: results })
    });
})

app.get('/orders/totalperyear', function (req, res) {

    connection.query('SELECT EXTRACT(YEAR FROM createdDate) as year, sum(amount) as total, createdDate FROM orders GROUP by year', function (error, results, fields) {
        if (error) throw error;
        res.json({ success: true, data: results })
    });
})

app.get('/friends/:id', function (req, res) {

    const { id } = req.params;

    connection.query(`SELECT * FROM friends WHERE friendId=${id}`, function (error, results, fields) {
        if (error) throw error;

        res.json({ success: true, data: results })
    });
})

app.listen(3000, () => {
    console.log("Server running on 3000")
})
