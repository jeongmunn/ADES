//Build the process.env object

require('dotenv').config();

module.exports = {
  databaseUserName: process.env.PGUSER,
  databasePassword: process.env.PGPASSWORD,
  databaseName: process.env.PDDATABASE,
  databaseHost: process.env.PGHOST,
  databasePort: process.env.PGPORT

};