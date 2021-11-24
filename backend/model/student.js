console.log("---------------------------------------------------------");
console.log("server > model > student.js");
console.log("---------------------------------------------------------");

const pool = require("../controllers/dbconfig");

//---------------------------------------------------------objects/functions------------------------------------------------------------
var student = {

    getStudents: function (callback) {
        pool.query('SELECT * FROM public."Student"', (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result);
            }
        })

    },
    getStudentStreakByID: function (id, callback) {
        const sql = `SELECT streaks FROM "public"."Student" WHERE "studentID"=$1`;
        const values = [id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result);
            }
        })
    },
    getStudentBadgesById: function (id, callback) {
        const sql = `SELECT * FROM "public"."BadgeHistory" INNER JOIN public."badge" ON badge."badgeClassID" = public."BadgeHistory"."badgeID" WHERE "public"."BadgeHistory"."studentID"=$1 ORDER BY public."BadgeHistory"."badgeID" ASC`;
        const values = [id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result);
            }
        })
    },
    getStudentPointByID: function (id, callback) {
        const sql = `SELECT "public"."Student"."totalPts","public"."Student"."redeemedPts","public"."Student"."name" FROM "public"."Student" WHERE "studentID"=$1;`;
        const values = [id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result);
            }
        })
    },
    getTopStudents: function (callback) {
        pool.query('SELECT "public"."Student"."name","public"."Student"."totalPts" FROM "public"."Student" ORDER BY "public"."Student"."totalPts" DESC LIMIT 3;', (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result);
            }
        })
    },
    upadateStudentPointsBasedOnStreaks: function (id, callback) {
        const sql = `UPDATE "public"."Student" SET "totalPts"="streaks"*20, "redeemedPts"="redeemedPts"+"streaks"*20 where "Student"."studentID"=$1;`;
        const values = [id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result);
            }
        })
    },
    getLastLoginByID: function (id, callback) {
        const sql = `SELECT "public"."Student"."lastLogin" FROM "public"."Student" WHERE "studentID"=$1;`;
        const values = [id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result);
            }
        })
    },
    updateLastLogin: function (id, lastLogin, callback) {
        const sql = `UPDATE "public"."Student" SET "lastLogin"=$1 where "Student"."studentID"=$2;`;
        const values = [lastLogin, id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result.rows);
            }
        })
    },
    updateLastLoginStreakLost: function (id, lastLogin, callback) {
        const sql = `UPDATE "public"."Student" SET "lastLogin"=$1,"streaks"=0 where "Student"."studentID"=$2;`;
        const values = [lastLogin, id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result.rows);
            }
        })
    },
    updateLastLoginStreak: function (id, lastLogin, callback) {
        const sql = `UPDATE "public"."Student" SET "lastLogin"=$1, "streaks"="streaks"+1  where "Student"."studentID"=$2;`;
        const values = [lastLogin, id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result.rows);
            }
        })
    },
    getStudentProcess: function (callback) {
        const sql = `SELECT"public"."Student"."name","public"."Student"."streaks","public"."Student"."totalPts","public"."Student"."mazeLvl" FROM "public"."Student";`;

        pool.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result);
            }
        })
    },
    getStudentProcessByID: function (id, callback) {
        const sql = `SELECT "public"."Student"."name","public"."Student"."streaks","public"."Student"."totalPts","public"."Student"."mazeLvl" FROM "public"."Student" WHERE "studentID"=$1;`;
        const values = [id]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err.null);
            } else {
                return callback(null, result);
            }
        })
    },
    getLeaderboard: function (callback) {
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

//---------------------------------------------------------------exports------------------------------------------------------------
module.exports = student;

