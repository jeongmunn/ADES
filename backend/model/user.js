console.log("---------------------------------------------------------");
console.log("server > model > user.js");
console.log("---------------------------------------------------------");

const pool = require("../controllers/dbconfig");

var user = {
    var user = {
        getIdAndTypeOfUser: function (Uid, callback) {
            console.log("get id & type of user");
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
            console.log("get email of user");
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
            console.log("get email of user");
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
