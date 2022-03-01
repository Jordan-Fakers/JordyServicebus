const mysql = require('mysql');
require('dotenv').config();

var config =
{
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 3306,
    ssl: true
};

const conn = mysql.createConnection(config);

conn.connect(
  function (err) { 
  if (err) { 
      console.log("!!! Cannot connect !!! Error:");
      throw err;
  }
  else
  {
     console.log("Connection established.");
         queryDatabase();
  }
});

function queryDatabase(){
  // // Drop existing table //
  // conn.query('DROP TABLE IF EXISTS usercredit;', function (err, results, fields) { 
  //     if (err) throw err; 
  //     console.log('Dropped usercredit table if existed.');
  // })
  // Create table //
  // conn.query('CREATE TABLE usercredit (id serial PRIMARY KEY, userid VARCHAR(50), credit INTEGER);', 
  //     function (err, results, fields) {
  //     if (err) throw err;
  //     console.log('Created usercredit table.');
  //     })
  // // Insert values into table //
  // conn.query('INSERT INTO usercredit (userid, credit) VALUES (?, ?);', ['Joshua', 30], 
  //         function (err, results, fields) {
  //             if (err) throw err;
  //     else console.log('Inserted ' + results.affectedRows + ' row(s).');
  //     })
  // conn.query('INSERT INTO usercredit (userid, credit) VALUES (?, ?);', ['Tiphaine', 10000], 
  //     function (err, results, fields) {
  //         if (err) throw err;
  // else console.log('Inserted ' + results.affectedRows + ' row(s).');
  // })
  // Show values from table //
  conn.query("SELECT * FROM usercredit", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  conn.end(function (err) { 
  if (err) throw err;
  else  console.log('Done.') 
  });
}