console.log("---------------------------------------------------------");
console.log("ADES> model >user.js");
console.log("---------------------------------------------------------");


const pool = require("../controllers/dbConfig")

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------


var studentDB = {

<<<<<<< Updated upstream

=======
  
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    getStudentPointByID: function (id,callback) {
      console.log("function CALLED---------")
     
      const sql = `SELECT "public"."Student"."totalPts","public"."Student"."redeemedPts" FROM "public"."Student" WHERE "studentID"=$1;`;
=======
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
    getStudentPointByID: function (id,callback) {
      console.log("function CALLED---------")
 
      const sql = `SELECT "public"."Student"."totalPts" FROM "public"."Student" WHERE "studentID"=$1;`;
>>>>>>> Stashed changes
      const values = [id]
        pool.query(sql,values, (err, result) => {
          if (err) {
            console.log(err);
            return callback(err.null);
        } else {
            console.log("its over HEREEEE")
<<<<<<< Updated upstream
            return callback(null, result.rows);
=======
            return callback(null, result);
>>>>>>> Stashed changes
        }
           // pool.end()
          })
          
    },
    getTopStudents: function (callback) {
      console.log("function CALLED---------")
 

<<<<<<< Updated upstream
        pool.query('SELECT "public"."Student"."studentID","public"."Student"."name","public"."Student"."totalPts" FROM "public"."Student" ORDER BY "public"."Student"."totalPts" DESC LIMIT 3;', (err, result) => {
=======
        pool.query('SELECT "public"."Student"."name","public"."Student"."totalPts" FROM "public"."Student" ORDER BY "public"."Student"."totalPts" DESC LIMIT 3;', (err, result) => {
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    getStudentStreakByID: function (id,callback) {
      console.log("function CALLED---------")
 
      const sql = `SELECT streaks FROM "public"."Student" WHERE "studentID"=$1`;
=======

    //---------------- to view student's process--------------
    // get all student process
    getStudentProcess: function (callback) {
      console.log("function CALLED---------")
 
      const sql = `SELECT"public"."Student"."name","public"."Student"."streaks","public"."Student"."totalPts","public"."Student"."mazeLvl" FROM "public"."Student";`;
  
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
    // get a student process by id
    getStudentProcessByID: function (id,callback) {
      console.log("function CALLED---------")
 
      const sql = `SELECT "public"."Student"."name","public"."Student"."streaks","public"."Student"."totalPts","public"."Student"."mazeLvl" FROM "public"."Student" WHERE "studentID"=$1;`;
>>>>>>> Stashed changes
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

