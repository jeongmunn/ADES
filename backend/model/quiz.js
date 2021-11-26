console.log("---------------------------------------------------------");
console.log("ADES>backend> model >quiz.js");

console.log("---------------------------------------------------------");

//----------------------------------------------------------------------------
//imports
//----------------------------------------------------------------------------
const pool = require("../controllers/dbconfig")

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------


var quiz = {
    getQuiz: function (callback) {
        pool.query('SELECT * FROM public."quiz"', (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null, result);
            }
        })
    },
    postQuiz: function (quiz, callback) {
        var quizID = quiz.quizID;
        var studentID = quiz.studentID;
        var pointsEarned = quiz.pointsEarned;
        var marksEarned = quiz.marksEarned;
        var data = [quizID, studentID, pointsEarned, marksEarned];
      
        var sql = ` INSERT INTO public."quizHistory"("quizID", "studentID", "pointsEarned", "marksEarned")
        VALUES ( $1, $2,$3,$4)` ;
      
        pool.query(sql, data, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null, result);
            }
        })
        
    },
    UpdatePoints: function (quiz, callback) {
        var studentID = quiz.studentID;
        var pointsEarned = quiz.pointsEarned;
        //  var badgeClassID = parseInt(badgeCID);
        var data = [studentID, pointsEarned]
        var sql = ` UPDATE public."Student" SET "totalPts"="totalPts" + $2 WHERE "studentID" =$1` ;
        pool.query(sql, data, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null, result);
            }
        })
    },
};

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = quiz;