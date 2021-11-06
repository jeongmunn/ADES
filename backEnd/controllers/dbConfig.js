//sanity check
console.log("--------------------------------------");
console.log("dbconfig.js");
console.log("--------------------------------------");
//this is to retrieve the .env file 
const {databaseUserName, databaseHost, database, databasePassword, databasePort} = require('../databaseConfig')


var pg = require('pg')

var config = {
    user: databaseUserName,
    host: databaseHost,
    database: database,
    password: databasePassword,
    port: databasePort,
}

var pool = new pg.Pool(config);
//--------------------------------------------
// exports
//--------------------------------------------
module.exports = pool;