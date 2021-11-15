console.log("---------------------------------------------------------");
console.log("server > model > leaderboard.js");
console.log("---------------------------------------------------------");

const pool = require("../controllers/dbconfig")

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------

var leaderboard = {
  
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
};

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = leaderboard;