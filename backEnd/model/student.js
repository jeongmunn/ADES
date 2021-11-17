console.log("---------------------------------------------------------");
console.log("ADES> model >student.js");
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
 
      const sql = `SELECT "public"."Student"."totalPts","public"."Student"."redeemedPts","public"."Student"."name" FROM "public"."Student" WHERE "studentID"=$1;`;
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
    getTopStudents: function (callback) {
      console.log("function CALLED---------")
 

        pool.query('SELECT "public"."Student"."name","public"."Student"."totalPts" FROM "public"."Student" ORDER BY "public"."Student"."totalPts" DESC LIMIT 3;', (err, result) => {
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
    upadateStudentPointsBasedOnStreaks: function (id,callback) {
      console.log("function CALLED---------")
 
      const sql = `UPDATE "public"."Student" SET "totalPts"="streaks"*20, "redeemedPts"="redeemedPts"+"streaks"*20 where "Student"."studentID"=$1;`;
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
    getLastLoginByID: function (id,callback) {
      console.log("function CALLED---------")
 
      const sql = `SELECT "public"."Student"."lastLogin" FROM "public"."Student" WHERE "studentID"=$1;`;
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

    
    updateLastLogin: function(id,lastLogin,callback) {
      console.log(" edit reward by ID function called");
    
          const sql = `UPDATE "public"."Student" SET "lastLogin"=$1  where "Student"."studentID"=$2;`;
           const values = [lastLogin,id]
          pool.query(sql,values,(err, result) => {
              if(err) {
                  console.log(err);
                  return callback(err.null);
              } else {
                  console.log("result : " + result.rows);
                  return callback(null,result.rows);
              }
          })
  },

  
  updateLastLoginStreak: function(id,lastLogin,callback) {
    console.log(" update last login and streak function called");
  
        const sql = `UPDATE "public"."Student" SET "lastLogin"=$1, "streaks"="streaks"+1  where "Student"."studentID"=$2;`;
         const values = [lastLogin,id]
        pool.query(sql,values,(err, result) => {
            if(err) {
                console.log(err);
                return callback(err.null);
            } else {
                console.log("result : " + result.rows);
                return callback(null,result.rows);
            }
        })
},

   
   
   

    //---------------- to view student's progress--------------
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

