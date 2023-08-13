const express = require('express');
const exphbs = require('express-handlebars'); // updated to 6.0.X
const bodyParser = require('body-parser');  // Remove
const mysql = require('mysql'); // Remove
//const Connection = require('mysql2/typings/mysql/lib/Connection');
//const Connection = require('mysql2/typings/mysql/lib/Connection');

require('dotenv').config();
//dotenv.config({path:'./.env'});
const app = express();
const port = process.env.PORT || 5000;

// Parsing middleware
// Parse application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({ extended: false }));

 //const publicDirectory = path.join(__dirname,'./public');
 //app.use(express.static(publicDirectory));
 app.use(express.urlencoded({ extended: false }));

//app.use(express.urlencoded({extended: true})); // New

// Parse application/json
app.use(bodyParser.json());
app.use(express.json());

//app.use(express.json()); // New

// Static Files
app.use(express.static('public'));

// Templating engine
//app.engine('hbs', exphbs({ extname: '.hbs' })); // v5.3.4
// app.set('view engine', 'hbs'); // v5.3.4

// Update to 6.0.X
const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

// Connection Pool
// You don't need the connection here as we have it in userController
// let connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

const pool = mysql.createPool({
    connectionLimit : 100,
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME

});
pool.getConnection((err,connection)=>{
    if(err) throw err;
    console.log('connected as ID'+connection.threadId)
});
fileUpload= require('express-fileupload');
app.use(fileUpload());
/*
const db=mysql2.createConnection({
    host : "localhost",
    user: "dbproject",
    database : "event_management",
    password:"dbproject@123",
})
db.connect(function(err){
    if(err) throw err;
    console.log("Connected")
})
*/
// db.getConnection((err,connection) =>{
//     if(err) throw err;
//     console.log('Connected as ID'+ connection.threadId)
// })

const routes = require('./server/routes/user');
/*app.get('/',(req,res)=>{
    res.render('home');
});*/

app.use('/',routes);

app.get('/signup',(req,res)=>{
    res.render('signup')
})
app.get('/add-event',(req,res)=>{
    res.render('add-event');
})

app.use('/auth',require('./server/routes/auth'));
app.use('/signup',routes);
//app.get('/profile/:id',routes.profile);
/*
app.get('/q', (req,res)=>{
    const q="select * from department";
    db.query(q,(err,data)=>{
      
        if(err) return res.json(err)
        else return res.send(data)
    })
});
app.get('/admin', (req,res)=>{
    const q="select * from admin";
    db.query(q,(err,data)=>{
      
        if(err) return res.json(err)
        else return res.send(data)
    })
});
app.get('/query', (req,res)=>{
    const q="select * from admin where admin_id=11";
    db.query(q,(err,data)=>{
      
        if(err) return res.json(err)
        else return res.send(data)
    })
});
*/
app.listen(port, () => console.log(`Listening on port ${port}`));