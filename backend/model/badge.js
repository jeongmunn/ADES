console.log("---------------------------------------------------------");
console.log("ADES>backend> model >badge.js");

console.log("---------------------------------------------------------");

//----------------------------------------------------------------------------
//imports
//----------------------------------------------------------------------------
const pool = require("../controllers/dbconfig")

const isImageUrl=require('is-image-url')

// ----------------------------------------------------------------------------
// Objects/functions
// ----------------------------------------------------------------------------


var badge = {
    getBadges: function (callback) {
        pool.query('SELECT * FROM public.badge  INNER JOIN public."badgeClass" ON  badge."badgeClassID" = public."badgeClass"."badgeClassID"', (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null, result);
            }
        })
    },
    getBadgeClass: function (callback) {
        pool.query('SELECT * FROM public."badgeClass"', (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null, result);
            }
        })
    },
    insertBadge: function (badge, callback) {
        var name = badge.name;
        var requirements = badge.requirements;
        var pic = badge.pic_url;
        var badgeCID = badge.badgeClassID;
        var badgeClassID = parseInt(badgeCID);

      

        if(!(isNaN(requirements) || isNaN(badgeClassID) || !(isImageUrl(pic))) && requirements>0){
            console.log("=======meets requirement=========")
          
     
            
        var data = [name, requirements, pic, badgeClassID];

        var sql = ` INSERT INTO public.badge(name, requirements, pic_url,"badgeClassID")
        VALUES ( $1, $2,$3,$4)`;

        pool.query(sql, data, (err, result) => {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                return callback(null, result);
            }
        })

        }
        else{
            console.log("=======doesn't meet requirement=========")
           
            return callback(err);

        }




    },
    editBadge: function (badgeID, badge, callback) {
        var name = badge.name;
        var requirements = badge.requirements;
        var pic = badge.pic_url;
        var badgeCID = badge.badgeClassID;
        var badgeClassID = parseInt(badgeCID);
      

        if(!(isNaN(requirements) || isNaN(badgeClassID) || !(isImageUrl(pic))) && requirements>0){
            console.log("=======meets requirement=========")
            
            var data = [name, requirements, pic, badgeClassID, badgeID];
            var sql = ` UPDATE
             public.badge 
             SET
             name= $1,
             requirements=$2,
             pic_url= $3,
             "badgeClassID" = $4
              WHERE
             "badgeID"=$5;`;
    
            pool.query(sql, data, (err, result) => {
                if (err) {
                    console.log(err);
                    return callback(err);
                } else {
                    return callback(null, result);
                }
            })
    

        }
        else{
            console.log("=======does not meet requirement=========")
            return callback(err);

        }
      

    }
};

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = badge;