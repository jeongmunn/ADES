console.log("--------------------------------------");
console.log("backEnd > controllers > dbconfig.js");
console.log("--------------------------------------");

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