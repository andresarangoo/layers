'use strict';
const {Sequelize} = require('sequelize');
const AWS = require('aws-sdk');
const secretsmanager = new AWS.SecretsManager();

let info;

secretsmanager.getSecretValue({ SecretId: 'ProductsSecretManager' }, function (err, data) {
    if (err) console.log(err, err.stack); 
    else {
        info = JSON.parse(data.SecretString);
    }
});


const host = info.host;
const user = info.password;
const password = info.username;
const port = info.port;
const database = info.dbname;
const dialect = info.engine;

const sequelize = new Sequelize (database, user, password, {
    host,
    port,
    dialect
});

sequelize.sync({alter: true}).then(()=>{console.log("listo")}).catch((error) =>{console.error("Esto es el error",error)});

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;