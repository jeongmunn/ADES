console.log("---------------------------------------------------------");

console.log("ADES>backend> model >mapOfMaze.js");

console.log("---------------------------------------------------------");

//----------------------------------------------------------------------------

//imports

//----------------------------------------------------------------------------

const pool = require("../controllers/dbConfig")

// ----------------------------------------------------------------------------

// Objects/functions

// ----------------------------------------------------------------------------

var maze = {

    getMazeContent: function (callback) {

        pool.query('SELECT * FROM public."mazeContent"ORDER BY "levelID" ASC '

            , (err, result) => {

                if (err) {

                    console.log(err);

                    return callback(err.null);

                } else {

                    return callback(null, result);

                }
                // pool.end()

            })

    },

    insertMazeContent: function (badge, callback) {

        var name = badge.name;

        var requirements = badge.requirements;

        var pic = badge.pic_url;

        var badgeClass = badge.badgeClass;

        var data = [name, requirements, pic, badgeClass];

        var sql = ` INSERT INTO public.badge(name, requirements, pic_url,"badgeClassID")

VALUES ( $1, $2,$3,$4)`;

        pool.query(sql, data, (err, result) => {

            if (err) {

                console.log(name + requirements + pic + badgeClass)

                console.log(err);

                return callback(err.null);

            } else {

                return callback(null, result);

            }

            // pool.end()

        })

    },

    editMazeContent: function (badgeID, badge, callback) {

        var name = badge.name;

        var requirements = badge.requirements;

        var pic = badge.pic_url;

        var badgeClass = badge.badgeClass;

        var data = [name, requirements, pic, badgeClass, badgeID];

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

                return callback(err.null);

            } else {

                return callback(null, result);

            }

            // pool.end()

        })

    }

};

// ----------------------------------------------------------------------------

// exports

// ----------------------------------------------------------------------------

module.exports = maze;