console.log("---------------------------------------------------------");
console.log("ADES> model >user.js");
console.log("---------------------------------------------------------");


const pool = require("../controllers/dbConfig")

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------


var studentDB = {


    getStudents: function (callback) {
      console.log("function CALLED---------")
 

        pool.query('SELECT * FROM public."Student"', (err, result) => {
          if (err) {
            console.log(err);
            return callback(err.null);
        } else {
            console.log("its over HEREEEE")
            return callback(null, result);
        }
           // pool.end()
          })
          
    },
    getStudentPointByID: function (id,callback) {
      console.log("function CALLED---------")
     
      const sql = `SELECT "public"."Student"."totalPts","public"."Student"."redeemedPts" FROM "public"."Student" WHERE "studentID"=$1;`;
      const values = [id]
        pool.query(sql,values, (err, result) => {
          if (err) {
            console.log(err);
            return callback(err.null);
        } else {
            console.log("its over HEREEEE")
            return callback(null, result.rows);
        }
           // pool.end()
          })
          
    },
    getTopStudents: function (callback) {
      console.log("function CALLED---------")
 

        pool.query('SELECT "public"."Student"."studentID","public"."Student"."name","public"."Student"."totalPts" FROM "public"."Student" ORDER BY "public"."Student"."totalPts" DESC LIMIT 3;', (err, result) => {
          if (err) {
            console.log(err);
            return callback(err.null);
        } else {
            console.log("its over HEREEEE")
            return callback(null, result);
        }
           // pool.end()
          })
          
    },
    getStudentStreakByID: function (id,callback) {
      console.log("function CALLED---------")
 
      const sql = `SELECT streaks FROM "public"."Student" WHERE "studentID"=$1`;
      const values = [id]
        pool.query(sql,values, (err, result) => {
          if (err) {
            console.log(err);
            return callback(err.null);
        } else {
            console.log("its over HEREEEE")
            return callback(null, result);
        }
           // pool.end()
          })
          
    },



};

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = studentDB;

