console.log("---------------------------------------------------------");
console.log("server > model > maze.js");
console.log("---------------------------------------------------------");

const pool = require("../controllers/dbconfig")

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------

var maze = {

    getMazePts: function(mazeLvl, callback){
        console.log("get maze points function called");

        const sql = `SELECT points FROM public."mazeContent" WHERE "mazeLvl" = $1`;
        const value = [mazeLvl];
        pool.query(sql,value,(err,result) => {
            if(err){
                console.log(err);
                return callback(err.null);
            }else{
                return callback(null,result.rows);
            }
        })
    },

    updatePtsnLvl: function(studentID,maze,callback) {
        console.log(" update points and maze level function called");
            var currentPts = maze.currentPts ;
            var totalPts = maze.totalPts ;
            var level = maze.level ;
      
            const sql = `UPDATE "public"."Student" SET "totalPts" = $1, "redeemedPts"=$2, "mazeLvl"= $3 WHERE "studentID"=$4`;
            const values = [totalPts, currentPts, level, studentID]
            pool.query(sql,values,(err, result) => {
                if(err) {
                    console.log(err);
                    return callback(err.null);
                } else {
                    return callback(null,result.rows);
                }
            })
    }

};

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = maze;