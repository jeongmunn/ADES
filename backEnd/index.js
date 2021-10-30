//sanity check
console.log("--------------------------------------");
console.log("ADES> backend>index.js");
console.log("--------------------------------------");


const hostname = "localhost";
const port = 3000;


// --------------------------
//imports
//---------------------------
const express=require("express");
const app = require('./controllers/app.js');




//standard for express
app.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/`);
});
