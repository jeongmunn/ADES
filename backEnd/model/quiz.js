console.log("---------------------------------------------------------");
console.log("ADES>backend> model >quiz.js");

console.log("---------------------------------------------------------");

//----------------------------------------------------------------------------
//imports
//----------------------------------------------------------------------------
const pool = require("../controllers/dbConfig")

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------


var quiz = {
    getQuiz: function (callback) {


        pool.query('SELECT * FROM public."quiz"', (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result);
            }
            // pool.end()
        })

    },


    postQuiz: function (quiz, callback) {
        var quizID = quiz.quizID ;
       var studentID=  quiz.studentID ;
       var pointsEarned =quiz.pointsEarned;
        var marksEarned=quiz.marksEarned;
    
      //  var badgeClassID = parseInt(badgeCID);
        var data = [quizID, studentID, pointsEarned, marksEarned];
        var data2= [studentID,pointsEarned]

        var sql = ` INSERT INTO public."quizHistory"("quizID", "studentID", "pointsEarned", "marksEarned")
        VALUES ( $1, $2,$3,$4)` ; 

        var sql2 = `UPDATE public."Student"
        SET "totalPts"="totalPts" + $1 
        WHERE "studentID" =$2`

        pool.query(sql, data, (err, result) => {
            if (err) {
                console.log(quizID +studentID+ pointsEarned+ marksEarned)
                console.log(err);
                return callback(err.null);
            } else {
               
                return callback(null, result);
            }
            // pool.end()
        })
        pool.query(sql2, data2, (err, result) => {
            if (err) {
                console.log(quizID +studentID+ pointsEarned+ markEarned)
                console.log(err);
                return callback(err.null);
            } else {
               
                return callback(null, result);
            }
            // pool.end()
        })
    },

//-------------------
//Update student table points
UpdatePoints: function (quiz, callback) {
  
   var studentID=  quiz.studentID ;
   var pointsEarned =quiz.pointsEarned;
   

  //  var badgeClassID = parseInt(badgeCID);
    var data =  [studentID,pointsEarned]
   

    var sql = ` UPDATE public."Student"
    SET "totalPts"="totalPts" + $2 
    WHERE "studentID" =$1` ; 

   

    pool.query(sql, data, (err, result) => {
        if (err) {
            console.log(studentID+ pointsEarned)
            console.log(err);
            return callback(err.null);
        } else {
           
            return callback(null, result);
        }
        // pool.end()
    })
    

},

};

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = quiz;
