console.log("---------------------------------------------------------");
console.log("ADES> model >user.js");
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


};

// ----------------------------------------------------------------------------
// exports
// ----------------------------------------------------------------------------
module.exports = studentDB;

