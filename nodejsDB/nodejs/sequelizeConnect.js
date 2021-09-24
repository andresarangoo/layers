'use strict';
const {Sequelize} = require('sequelize');
const AWS = require('aws-sdk');
const secretsmanager = new AWS.SecretsManager();

let getSecretAsync = async () => {
    return new Promise((resolve, reject) => {
        let client = new AWS.SecretsManager({ region: region });
        client.getSecretValue({ SecretId: secretName }, function (err, data) {
            resolve(data)
        });
    });
}

const data = await getSecretAsync();
const info = JSON.parse(data.SecretsString)
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