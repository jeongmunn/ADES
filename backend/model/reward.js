console.log("---------------------------------------------------------");
console.log("server > model > reward.js");
console.log("---------------------------------------------------------");

const pool = require("../controllers/dbconfig")

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------

var rewards = {

    createReward: function (reward, callback) {
        var rewardName = reward.rewardName;
        var ptsRequired = reward.ptsRequired;
        var url = reward.url;

        const sql = `INSERT INTO public."Rewards" ("rewardName", "ptsRequired", url)
                     VALUES ($1,$2,$3)`;
        const values = [rewardName, ptsRequired, url]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null, result);
            }
        })
    },
    getReward: function (callback) {
        const sql = `SELECT * FROM public."Rewards"`;
        pool.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null, result.rows);
            }
        })
    },
    getRewardById: function (rewardID, callback) {
        const sql = `SELECT * FROM "public"."Rewards" WHERE"Rewards"."rewardID"=$1`;
        const values = [rewardID]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null, result);
            }
        })
    },
    editReward: function (rewardID, reward, callback) {
        var rewardName = reward.rewardName;
        var ptsRequired = reward.ptsRequired;
        var url = reward.url;

        const sql = `UPDATE "public"."Rewards" SET "rewardName" = $1, "ptsRequired"=$2, url= $3 WHERE "Rewards"."rewardID"=$4;`;
        const values = [rewardName, ptsRequired, url, rewardID]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null, result);
            }
        })
    },
    deleteReward: function (rewardID, callback) {
        const sql = ` DELETE FROM "public"."Rewards" WHERE "Rewards"."rewardID"=$1;`;
        const values = [rewardID]
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null, result);
            }
        })
    },
    insertRewardHistory: function (reward, callback) {
        var studentID = reward.studentID;
        var rewardID = reward.rewardID;

        const sql = `INSERT INTO public."rewardHistory" ("studentID", "rewardID")
                        VALUES ($1,$2) `;
        const values = [studentID, rewardID];
        pool.query(sql, values, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null, result);
            }
        })
    }

};

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = rewards;