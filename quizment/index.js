//sanity check
console.log("--------------------------------------");
console.log("ADES> > index.js");
console.log("--------------------------------------");


// --------------------------
//imports
//---------------------------
const express=require("express");
const app = require('./controllers/app.js');


// Web Server
app.use(express.static(path.join(__dirname, 'public')));

app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname,'public','index.html'));
});

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
    console.log(`App listening on port` , server_port);
});

