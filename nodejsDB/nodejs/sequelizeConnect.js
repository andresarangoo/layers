'use strict';
const { Sequelize } = require('sequelize');
const AWS = require('aws-sdk');
const secretsmanager = new AWS.SecretsManager();

const { host, user, password, port, database, dialect };

secretsmanager.getSecretValue({ SecretId: 'ProductsSecretManager' }, function (err, data) {
    if (err) console.log(err, err.stack); 
    else {
        const info = JSON.parse(data.SecretString);
        host = info.host;
        user = info.password;
        password = info.username;
        port = info.port;
        database = info.dbname;
        dialect = info.engine;
    }
});

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect
});

sequelize.sync({ alter: true }).then(() => { console.log("listo") }).catch((error) => { console.error("Esto es el error", error) });

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;