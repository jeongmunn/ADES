console.log("---------------------------------------------------------");
console.log("server > model > user.js");
console.log("---------------------------------------------------------");

const pool = require("../controllers/dbconfig");

var user = {
    getTypeOfUser: function (Uid, callback) {
        console.log("get type of user");
        const sql = `SELECT "type" FROM public."Student" WHERE "Uid" = $1`;
        pool.query(sql, [Uid], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result.rows);
            }
        })
    },
}

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = user;
