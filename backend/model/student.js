console.log("---------------------------------------------------------");
console.log("server > model > student.js");
console.log("---------------------------------------------------------");

const pool = require("../controllers/dbconfig")

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------

var student = {

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
        })

    },
    getStudentStreakByID: function (id, callback) {
        console.log("function CALLED---------")
        const sql = `SELECT streaks FROM "public"."Student" WHERE "studentID"=$1`;
        const values = [id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                console.log("its over HEREEEE")
                return callback(null, result);
            }
        })
    },
    getStudentBadgesById: function (id, callback) {
        console.log("function CALLED---------")
        const sql = `SELECT * FROM "public"."BadgeHistory" INNER JOIN public."badge" ON badge."badgeClassID" = public."BadgeHistory"."badgeID" WHERE "public"."BadgeHistory"."studentID"=$1 ORDER BY public."BadgeHistory"."badgeID" ASC`;
        const values = [id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                console.log("its over HEREEEE")
                return callback(null, result);
            }
        })
    },
    getStudentPointByID: function (id, callback) {
        console.log("function CALLED---------")
        const sql = `SELECT "public"."Student"."totalPts","public"."Student"."redeemedPts","public"."Student"."name" FROM "public"."Student" WHERE "studentID"=$1;`;
        const values = [id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                console.log("its over HEREEEE")
                return callback(null, result);
            }
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
        })
    },
    upadateStudentPointsBasedOnStreaks: function (id, callback) {
        console.log("function CALLED---------")
        const sql = `UPDATE "public"."Student" SET "totalPts"="streaks"*20, "redeemedPts"="redeemedPts"+"streaks"*20 where "Student"."studentID"=$1;`;
        const values = [id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                console.log("its over HEREEEE")
                return callback(null, result);
            }
        })
    },
    getLastLoginByID: function (id, callback) {
        console.log("function CALLED---------")
        const sql = `SELECT "public"."Student"."lastLogin" FROM "public"."Student" WHERE "studentID"=$1;`;
        const values = [id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                console.log("its over HEREEEE")
                return callback(null, result);
            }
        })
    },
    updateLastLogin: function (id, lastLogin, callback) {
        console.log(" edit reward by ID function called");
        const sql = `UPDATE "public"."Student" SET "lastLogin"=$1 where "Student"."studentID"=$2;`;
        const values = [lastLogin, id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                console.log("result : " + result.rows);
                return callback(null, result.rows);
            }
        })
    },
    updateLastLoginStreakLost: function (id, lastLogin, callback) {
        console.log(" edit reward by ID function called");
        const sql = `UPDATE "public"."Student" SET "lastLogin"=$1,"streaks"=0 where "Student"."studentID"=$2;`;
        const values = [lastLogin, id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                console.log("result : " + result.rows);
                return callback(null, result.rows);
            }
        })
    },
    updateLastLoginStreak: function (id, lastLogin, callback) {
        console.log(" update last login and streak function called");
        const sql = `UPDATE "public"."Student" SET "lastLogin"=$1, "streaks"="streaks"+1  where "Student"."studentID"=$2;`;
        const values = [lastLogin, id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                console.log("result : " + result.rows);
                return callback(null, result.rows);
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
        })
    },
    // get a student process by id
    getStudentProcessByID: function (id, callback) {
        console.log("function CALLED---------")
        const sql = `SELECT "public"."Student"."name","public"."Student"."streaks","public"."Student"."totalPts","public"."Student"."mazeLvl" FROM "public"."Student" WHERE "studentID"=$1;`;
        const values = [id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                console.log("its over HEREEEE")
                return callback(null, result);
            }
        })
    },
    getLeaderboard: function (callback) {
        console.log("getLeaderboard function called");
        const sql = `SELECT "studentID", name, "totalPts", "mazeLvl" FROM public."Student" ORDER BY "totalPts" DESC LIMIT 10`;
        pool.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result.rows);
            }
        })
    },
    getAllLeaderboard: function (callback) {
        console.log("get all Leaderboard function called");
        const sql = `SELECT "studentID", name, "totalPts", "mazeLvl" FROM public."Student" ORDER BY "totalPts" DESC`;
        pool.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result.rows);
            }
        })
    },
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
    newUser: function (student, callback) {
        console.log("create new user");
        const sql = `INSERT INTO public."Student" ("name", "Uid", "streaks", "totalPts", "mazeLvl", "redeemedPts", "type", "lastLogin")
        VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`;
        var name = student.name;
        var Uid = student.Uid;
        var streaks = student.streaks;
        var totalPts = student.totalPts;
        var mazeLvl = student.mazeLvl;
        var redeemedPts = student.redeemedPts;
        var type = student.type;
        var lastLogin = student.lastLogin;
        const values = [name, Uid, streaks, totalPts, mazeLvl, redeemedPts, type, lastLogin]
        pool.query(sql, values, (err) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null);
            }
        })
    },
};

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = student;

