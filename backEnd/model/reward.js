console.log("---------------------------------------------------------");
console.log("backend > model > reward.js");
console.log("---------------------------------------------------------");

const pool = require("../controllers/dbconfig")

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------

var rewards = {
    
    createReward: function (reward, callback) {
      console.log(" create reward function called");
      console.log(" reward data = " + JSON.stringify(reward));
      var rewardName = reward.rewardName ;
      var ptsRequired = reward.ptsRequired ;
      var url = reward.url ;

        const sql = `INSERT INTO public."Rewards" ("rewardName", "ptsRequired", url)
                     VALUES ($1,$2,$3)`;
        const values = [rewardName, ptsRequired, url]
        pool.query(sql, values, (err) => {
          if (err) {
            console.log(err);
            return callback(err);
        } else {
            return callback(null);
        }
    })
    },

    getReward: function(callback) {
        console.log(" get reward function called");
        
            const sql = `SELECT * FROM public."Rewards"`;
            pool.query(sql, (err, result) => {
                if(err) {
                    console.log(err);
                    return callback(err.null);
                } else {
                    return callback(null,result.rows);
                }
            })
    }

};

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = rewards;