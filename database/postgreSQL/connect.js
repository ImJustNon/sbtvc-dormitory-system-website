// mysql
const mysql = require("mysql");

const config = require('../../configs/config.js');
const connection = mysql.createConnection(config.database.mySQL);

const connect = async() =>{
    connection.connect((err) =>{
        if (err) {
            console.log(`[Database] mySQL : Cannot connect to database ERROR : ${err}`);
        } 
        else {
            console.log("[Database] mySQL : Connected");
			
			// handle disconnect
			setInterval(async() =>{
				await connection.query("SELECT 1", (error) =>{
					if(!error){
						console.log("[Database] Server Alive!!");
					} 
					else {
						console.log(`[Database] mySQL : Cannot connect to database ERROR : ${error}`);
					}
				});
			}, 120 * 1000);
        }
    });
	
	
}

const query = async({ sql }) =>{
	return new Promise(async(resolve, reject) =>{
		// no  sql
        if(typeof sql === "undefined"){
            throw new Error('Please specify SQL command');
        }
		
		// sql ok
        if(typeof sql === "string"){
			try {
				let all = {};
				let error = {};
				await connection.query(sql, async(error, rows, fields) =>{
					all = Object.assign(rows = {rows: await rows}, fields = {fields: await fields});
					resolve(all);
				});
			}
			catch(e){
			    console.log(e);	
			}
        }
	});
}

exports.connection = connection;
exports.connect = connect;
exports.query = query;




/*
const mysql = require("mysql2");

const config = require('../../configs/config.js');
const connection = mysql.createConnection(config.database.mySQL);


const connect = async() =>{
    connection.connect((err) =>{
        if (err) {
            console.log(`[Database] mySQL : Cannot connect to database ERROR : ${err}`);
        } 
        else {
            console.log("[Database] mySQL : Connected");
        }
    });
}

const query = async({ sql }) =>{
    return new Promise(async(resolve, reject) =>{
        // no  sql
        if(typeof sql === "undefined"){
            throw new Error('Please specify SQL command');
        }


        // sql ok
        if(typeof sql === "string"){
            let all = {};
            let error = {};
            await connection.promise().query(sql)
            .catch(async e => console.log(e))
            .then(async([rows, fields]) =>{
                all = Object.assign(rows = {rows: await rows}, fields = {fields: await fields});
                resolve(all);
            });
        }
    });
}


exports.connection = connection;
exports.connect = connect;
exports.query = query;
*/

//============================================================================

// Old database client
/*
const { Client } = require('pg');
const config = require("../../configs/config.js");

const connection = new Client(config.database.postgreSQL);


const connect = async () =>{
    connection.connect((err) => {
        if (err) {
        console.log(`[Database] PostgreSQL : Cannot connect to database ERROR : ${err}`);
        } else {
        console.log("[Database] PostgreSQL : Connected");
        }
    });
}

const query = async ({sql,option}) =>{
    return new Promise(async(resolve, reject) =>{
        // no  sql
        if(typeof sql === "undefined"){
            throw new Error('Please specify SQL command');
        }
        else if(typeof sql === "undefined" && typeof option === "object"){
            throw new Error('Please specify SQL command');
        }

        // sql ok
        if(typeof sql === "string"){
            await connection.query(sql,(err, result) =>{
                if(!err){
                    resolve(result);
                }
                else {
                    console.error(err)
                }
            });
        }
        else if(typeof sql === "string" && typeof option === "object"){
            await connection.query(sql, option, (err, result) =>{
                if(!err){
                    resolve(result);
                }
                else {
                    console.error(err)
                }
            });
        }
    });
}

exports.connect = connect;
exports.query = query;
exports.connection = connection;
*/
