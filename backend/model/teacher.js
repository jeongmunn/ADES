console.log("---------------------------------------------------------");
console.log("ADES > backend > teacher.js");
console.log("---------------------------------------------------------");


const pool = require("../controllers/dbconfig")

//---------------------------------------------------------objects/functions------------------------------------------------------------
var teacher = {
    getStudentProgress: function (callback) {
      const sql = `SELECT "public"."Student"."studentID","public"."Student"."name", "public"."Student"."streaks", "public"."Student"."mazeLvl","public"."Student"."totalPts"
      FROM "public"."Student";`;
        pool.query(sql, (err, result) => {
          if (err) {
            console.log(err);
            return callback(err.null);
        } else {
            return callback(null, result);
        }
          })
          
    },

};
//---------------------------------------------------------------exports------------------------------------------------------------
module.exports = teacher;