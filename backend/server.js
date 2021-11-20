//sanity check
console.log("--------------------------------------");
console.log("ADES> server.js");
console.log("--------------------------------------");


// --------------------------
//imports
//---------------------------
const express=require("express");
const cors = require('cors');
const path = require("path");
const api = require('./controllers/app.js');
const basename = "/quizment";
const app = express();

// Web Server
// hosting path for frontend
const buildPath = path.join(__dirname, '../frontEnd' , 'build');
app.use(express.static(buildPath));
// so that the frontend content will be served via the /quizment directory when hosted
// app.use('/quizment', express.static(basename));
app.use(cors());

// getting of frontend pages, for eg. /quizment/pageName
app.get('/', function (req, res) {
    // since React uses index.html we use the following code below to get the content from index.html which is updated by the
    // component js files in the frontEnd folder
    res.sendFile(path.join(__dirname, '../frontEnd' , 'build', 'index.html'));
});

// backend content is 
app.use('/api',api);

// error 404 middleware
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

// error handling middleware
app.use((error, req, res, next) => {
    console.error(error);
    return res.status(error.status || 500).json({
        error: error.message || 'ERROR_MESSAGE',
    });
});

// hosting on heroku on one port, 8081 is for localhosting
var server_port = process.env.YOUR_PORT  || process.env.PORT || 8081 ;
var server_host = process.env.YOUR_HOST || '0.0.0.0' ;
// standard for express
app.listen(server_port,server_host, function () {
    console.log(`App listening on port` , server_port);
});

