'use strict';
const { Sequelize } = require('sequelize');
const credentials = require('./credentials');
const Order = require('./orders');
const Product = require('./products');

module.exports.DBase = async () => {
    const { host, username, password, port, database, dialect } = await credentials.loadCredentials();
    const sequelize = new Sequelize(database, username, password, {
        host,
        port,
        dialect
    });

    sequelize.sync({ alter: true }).then(() => { console.log("listo") }).catch((error) => { console.error("Esto es el error", error) });
    Order.sync();
    Product.sync();

    const db = {
        sequelize : sequelize,
        Sequelize : Sequelize
    };

    return db;
};