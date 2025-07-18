const mysql = require('mysql2/promise')

let connection 

async function connectDb() {
  if (!connection) {    
    connection =  await mysql.createConnection(
      {
        host: process.env.MARIADB_HOST,
        user: process.env.MARIADB_USER,
        password: process.env.MARIADB_PASS,
        database: process.env.MARIADB_NAME,
        port: process.env.MARIADB_PORT,
        namedPlaceholders: true,
      }
    )
  }
  return connection
}

module.exports = connectDb 