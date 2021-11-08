//sanity check
console.log("--------------------------------------");
console.log("ADES> server.js");
console.log("--------------------------------------");


// --------------------------
//imports
//---------------------------
const express=require("express");
// const app = require('./controllers/app');
const path = require('path');




const cors = require('cors');


const app = express();

// Web Server
const buildPath = path.join(__dirname, '..' , 'build');
app.use(express.static(buildPath));
app.use(cors());

// To handle body
app.use(express.json());

app.get('/hello',(req,res)=>{
    res.statusCode = 200;
    res.send("GET successfully");
});

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

// error handling
app.use((error, req, res, next) => {
    console.error(error);
    return res.status(error.status || 500).json({
        error: error.message || 'ERROR_MESSAGE',
    });
});

var server_port = process.env.YOUR_PORT  || process.env.PORT || 8081 ;
var server_host = process.env.YOUR_HOST || '0.0.0.0' ;
// standard for express
app.listen(server_port,server_host, function () {
    console.log(`App listening on port: ` , server_port);
});

