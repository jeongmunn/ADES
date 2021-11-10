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

};

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = student;

