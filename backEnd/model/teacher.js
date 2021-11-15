console.log("---------------------------------------------------------");
console.log("ADES> model >teacher.js");
console.log("---------------------------------------------------------");


const pool = require("../controllers/dbConfig")

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------


var teacherDB = {
    getStudentProgress: function (callback) {
      console.log("function CALLED---------")
      const sql = `SELECT "public"."Student"."studentID","public"."Student"."name", "public"."Student"."streaks", "public"."Student"."mazeLvl","public"."Student"."totalPts"
      FROM "public"."Student";`;

        pool.query(sql, (err, result) => {
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
module.exports = teacherDB;

