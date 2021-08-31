'use strict';
const {Sequelize} = require('sequelize');

const host = process.env.PRODUCTS_HOST;
const user = process.env.PRODUCTS_USER;
const password = process.env.PRODUCTS_PASSWORD;
const port = process.env.PRODUCTS_PORT;
const database = process.env.PRODUCTS_DB;
const dialect = process.env.PRODUCTS_DIALECT;

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