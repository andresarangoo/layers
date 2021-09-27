'use strict';
const { Sequelize } = require('sequelize');
const credentials = require('./credentials');

module.exports.DBase = async () => {
    const { host, username, password, port, database, dialect } = await credentials.loadCredentials();
    const sequelize = new Sequelize(database, username, password, {
        host,
        port,
        dialect
    });

    sequelize.sync({ alter: true }).then(() => { console.log("listo") }).catch((error) => { console.error("Esto es el error", error) });

    const db = {
        sequelize : sequelize,
        Sequelize : Sequelize
    };

    return db;
};