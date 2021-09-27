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

    sequelize.sync().then(() => { console.log("listo") }).catch((error) => { console.error("Esto es el error", error) });
    Order.sync();
    Order.sync({force:true}).then(() => { console.log("listo 2") }).catch((error) => { console.error("Esto es el error 1", error) });
    Product.sync();
    Product.sync({force:true}).then(() => { console.log("listo 2") }).catch((error) => { console.error("Esto es el error 2", error) });

    const db = {
        sequelize : sequelize,
        Sequelize : Sequelize
    };

    return db;
};