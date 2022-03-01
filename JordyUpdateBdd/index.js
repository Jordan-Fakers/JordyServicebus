const mysql = require('mysql2');

module.exports = async function(context, mySbMsg) {
    var conn = mysql.createConnection({host: process.env["HOSTNAME"], user: process.env["USERNAME"], password: process.env["PASSWORD"], database: process.env["DATABASE"], port: process.env["PORT"]});
    context.log('User information', mySbMsg.amount);
    var userName = mySbMsg.user_id;
    var userAmount = mySbMsg.amount;
    var userStatus = false;
    var userAction = mySbMsg.action;
    var myResult = {};
    myResult = await queryDatabase(conn);
    //context.log(myResult);
    //context.log(typeof(myResult[1].userid));
    for(let i=0;i<myResult.length;i++){
        if ( myResult[i].userid == userName){
            userStatus = true;
            var userCreditFromDB = myResult[i].credit;
            if(userAction == "payment"){
                userAmount = userAmount + userCreditFromDB;
            }
            if(userAction == "spending"){
                userAmount = userCreditFromDB - userAmount;
            }
            await queryDatabaseUpdate(conn, userAmount, userName);        
        }
    }

    if(!userStatus){
        await queryDatabaseCreate(context, conn, userName);
        await queryDatabaseUpdate(conn, userAmount, userName)
    }

    conn.end();
}

async function queryDatabase(conn){
    const [result] = await conn.promise().query('SELECT * FROM usercredit');   
    return result;
}

async function queryDatabaseUpdate(conn, userAmount, userName){
    await conn.promise().query(`UPDATE usercredit SET credit=${userAmount} where userid='${userName}'`);   
}

async function queryDatabaseCreate(context, conn, userName){
    await conn.promise().query(`INSERT INTO usercredit (userid, credit) VALUES ('${userName}',0);`);  
}