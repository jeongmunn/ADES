console.log("---------------------------------------------------------");
console.log("server > model > points.js");
console.log("---------------------------------------------------------");

const pool = require("../controllers/dbconfig")

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------

var points = {

    getPtsHistory: function(studentID, callback) {
        console.log("get points history function called");

        const sql = `SELECT "historyID", "pointsAwarded", "eventName" FROM public."studentHistory" AS s, public.event AS e 
                    WHERE e."eventID" = s."eventID" AND "studentID"  = $1 ; `; 
        const value = [studentID];
        pool.query(sql,value,(err, result) => {
            if(err){
                console.log(err);
                return callback(err.null);
            }else{
                return callback(null,result.rows);
            }
        })
    },

    getPts: function(studentID, callback) {
        console.log("get points function called");

        const sql = `SELECT "totalPts", "redeemedPts" FROM public."Student" WHERE "studentID" = $1`;
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

    getQuizPts: function(studentID,quizID, callback){
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
        
        const sql = `UPDATE public."Student" SET "totalPts"= $1, "redeemedPts"= $2 WHERE "studentID"= $3`;
        const value = [totalPts, currentPts, studentID];
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