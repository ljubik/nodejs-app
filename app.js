const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host : 'db1.cityhost.com.ua',
    user : 'react',
    password : 'react123',
    database : 'dojo'
});

db.connect();

app.get('/data', function(req,res){
var sql = 'SELECT * FROM ninja';
db.query(sql, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result);
});
});

app.post('/data', function(req, res){
	console.log(req.body); 
    var data = {nama:req.body.nama, usia:req.body.usia};
    var sql = 'INSERT INTO ninja SET ?';
    db.query(sql, data, (err, result)=>{
    if(err) throw err;
    console.log(result);
    res.send({
        status: 'Data suksess diinput!',
        no: null,
		nama: req.body.nama,
		usia: req.body.usia
	});
});
});

app.listen(3210, ()=>{
    console.log('Server aktive port 3210 or 80 back-end')
});