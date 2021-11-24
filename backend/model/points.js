console.log("---------------------------------------------------------");
console.log("server > model > points.js");
console.log("---------------------------------------------------------");

const pool = require("../controllers/dbconfig")

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------

var points = {
    insertPtsHistory: function(maze,callback) {
        console.log(" insert reward history function called");
        var studentID = maze.studentID ;
        var ptsAwarded = maze.ptsAwarded ;
        var eventID = maze.eventID ;

            const sql = `INSERT INTO public."studentHistory" ("studentID", "pointsAwarded", "eventID") VALUES ($1,$2,$3) `;
            const values = [studentID, ptsAwarded, eventID];
            pool.query(sql,values,(err, result) => {
                if(err) {
                    console.log(err);
                    return callback(err.null);
                } else {
                    return callback(null,result.rows);
                }
            })
    },
    getPts: function(studentID, callback) {
        console.log("get points function called");
        const sql = `SELECT "totalPts", "redeemedPts", "mazeLvl" FROM public."Student" WHERE "studentID" = $1`;
        const value = [studentID];
        pool.query(sql,value,(err,result) => {
            if(err){
                console.log(err);
                return callback(err.null);
            }else{
                return callback(null,result.rows);
            }
        })
    },
    getQuizPts: function(studentID, quizID, callback){
        console.log("get quiz points function called");
        const sql = `SELECT "quizHistoryID", "pointsEarned", "marksEarned" FROM public."quizHistory" WHERE "studentID" = $1 AND "quizID" = $2`;
        const value = [studentID, quizID];
        pool.query(sql,value,(err,result) => {
            if(err){
                console.log(err);
                return callback(err.null);
            }else{
                return callback(null,result.rows);
            }
        })
    },
    updateCurrentPts: function(studentID, currentPts, callback){
        console.log("update points function called");
        const sql = `UPDATE public."Student" SET "redeemedPts"= $1 WHERE "studentID"= $2`;
        const value = [currentPts, studentID];
        pool.query(sql,value,(err,result) => {
            if(err){
                console.log(err);
                return callback(err.null);
            }else{
                return callback(null,result.rows);
            }
        })
    },
    updatePts: function(studentID, points, callback){
        console.log("update points function called");
        var totalPts = points.totalPts ;
        var currentPts = points.currentPts ;
        var newLvl=points.mazeLvl;
        const sql = `UPDATE public."Student" SET "totalPts"= $1, "redeemedPts"= $2 ,"mazeLvl"=$3 WHERE "studentID"= $4`;
        const value = [totalPts, currentPts,newLvl, studentID];
        pool.query(sql,value,(err,result) => {
            if(err){
                console.log(err);
                return callback(err.null);
            }else{
                return callback(null,result.rows);
            }
        })
    }
};

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = points;

