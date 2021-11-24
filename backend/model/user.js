console.log("---------------------------------------------------------");
console.log("ADES > backend > model > user.js");
console.log("---------------------------------------------------------");

const pool = require("../controllers/dbconfig");

var user = {
    getIdAndTypeOfUser: function (Uid, callback) {
        const sql = `SELECT "studentID", "type" FROM public."Student" WHERE "Uid" = $1`;
        pool.query(sql, [Uid], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result.rows);
            }
        })
    },
    getEmail: function (Uid, callback) {
        const sql = `SELECT "name" FROM public."Student" WHERE "Uid" = $1`;
        pool.query(sql, [Uid], (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result.rows);
            }
        })
    },
    updateEmail: function (Uid, email, callback) {
        const value = [Uid, email];
        const sql = `UPDATE public."Student" SET "name"= $2 WHERE "Uid" = $1`;
        pool.query(sql, value, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result.rows);
            }
        })
    }
}

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = user;
