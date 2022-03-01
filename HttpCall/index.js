const mysql = require('mysql2');

module.exports = async function (context, req) {
    var conn = mysql.createConnection({host: process.env["HOSTNAME"], user: process.env["USERNAME"], password: process.env["PASSWORD"], database: process.env["DATABASE"], port: process.env["PORT"]});
    var myResult = {};
    var name = req.query.name;
    context.log("NAME " + name);
    myResult = await queryDatabase(conn, name);
    context.log("RESULT= " + myResult);
    
    context.res = {
        body: JSON.stringify(myResult[0])
    };

    context.log("si je suis la c'est que l'update a été automatique")
}

async function queryDatabase(conn, username){
    const [result] = await conn.promise().query(`SELECT userid, credit FROM usercredit WHERE userid='${username}'`);   
    return result;
}