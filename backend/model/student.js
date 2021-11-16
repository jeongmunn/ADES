console.log("---------------------------------------------------------");
console.log("server > model > student.js");
console.log("---------------------------------------------------------");

const pool = require("../controllers/dbconfig")

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------

var student = {
  
    getLeaderboard: function(callback) {
        console.log("get reward function called");
        
            const sql = `SELECT "studentID", name, "totalPts", "mazeLvl" FROM public."Student" ORDER BY "totalPts" DESC LIMIT 10`;
            pool.query(sql, (err, result) => {
                if(err) {
                    console.log(err);
                    return callback(err.null);
                } else {
                    return callback(null,result.rows);
                }
            })
    },

    getPtsHistory: function(studentID, callback) {
        console.log("get points history function called");

        const sql = `SELECT "pointsAwarded", "eventName" FROM public."studentHistory", public.event WHERE "studentID" = $1`; 
        pool.query(sql,studentID,(err, result) => {
            if(err){
                console.log(err);
                return callback(err.null);
            }else{
                return callback(null,result.rows);
            }
        })
    },

    newUser: function(student, callback) {
        console.log("create new user");
        const sql = `INSERT INTO public."Student" ("name", "Uid", "streaks", "totalPts", "mazeLvl", "redeemedPts", "type", "lastLogin")
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`; 
        var name = student.name;
        var Uid = student.Uid;
        var streaks = student.streaks;
        var totalPts = student.totalPts;
        var mazeLvl = student.mazeLvl;
        var redeemedPts = student.redeemedPts;
        var type = student.type;
        var lastLogin = student.lastLogin;
        const values = [name, Uid, streaks, totalPts, mazeLvl, redeemedPts, type, lastLogin]
        pool.query(sql, values,(err) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null);
            }
        })
    },

};

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = student;

