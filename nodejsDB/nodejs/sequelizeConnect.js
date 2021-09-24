'use strict';
const { Sequelize } = require('sequelize');
const credentials = require('./credentials');

let DBase = async () => {
    const { host, user, password, port, database, dialect } = credentials.loadCredentials();

    const sequelize = new Sequelize(database, user, password, {
        host,
        port,
        dialect
    });

    sequelize.sync({ alter: true }).then(() => { console.log("listo") }).catch((error) => { console.error("Esto es el error", error) });

    const db = {};

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
}

module.exports = DBase;