console.log("---------------------------------------------------------");

console.log("ADES>backend> model >mapOfMaze.js");

console.log("---------------------------------------------------------");

//----------------------------------------------------------------------------

//imports

//----------------------------------------------------------------------------

const pool = require("../controllers/dbconfig")

// ----------------------------------------------------------------------------

// Objects/functions

// ----------------------------------------------------------------------------

var maze = {

    getMazeContent: function (callback) {

        pool.query('SELECT * FROM public."mazeContent"ORDER BY "mazeLvl" ASC '

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

        var sql = ` INSERT INTO public."mazeContent"(points)

VALUES ( $1)`;

        pool.query(sql, data, (err, result) => {

            if (err) {



                console.log(err);

                return callback(err.null);

            } else {

                return callback(null, result);

            }

            // pool.end()

        })

    },

    editMazeContent: function (mazeLvl, point, callback) {
        var pt = parseInt(point.points);
        var data = [pt, mazeLvl];
        var sql = ` 
        UPDATE public."mazeContent"
         SET 
         points= $1
         
           WHERE 
           "mazeLvl"=$2;`;
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