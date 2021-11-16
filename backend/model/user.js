console.log("---------------------------------------------------------");
console.log("server > model > user.js");
console.log("---------------------------------------------------------");

const pool = require("../controllers/dbconfig");

var user = {
    // getTypeOfUser: function (callback) {
    //     const sql = `SELECT "type" FROM public."Student" WHERE uid`;
    //     pool.query('SELECT "type" FROM public."Student"', (err, result) => {
    //         if (err) {
    //             console.log(err);
    //             return callback(err.null);
    //         } else {
    //             return callback(null, result);
    //         }
    //     })
    // }
}

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = user;
