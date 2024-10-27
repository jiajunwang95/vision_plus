const mysql = require('mysql');
const Config = require('../../config/config');
const conf = Config();
const {Sequelize, DataTypes} = require('sequelize');
var path = require('path');
var fs = require('fs');
var basename = path.basename(__filename);
const Op = Sequelize.Op;

const db = {};
const sequelize = new Sequelize(conf.DB.DATABASE,conf.DB.USER,conf.DB.PASS, {
    dialect : 'mysql',
    host : conf.DB.HOST,
    timezone : '+08:00',
    port : conf.DB.PORT,
    pool: {
        max : 10,
        min : 0,
        idle : 1000,
        acquire : 80000
    },
    // logging : function(msg){console.log(msg)}, //{logger.trace(msg)},
    dialectOptions : {
        multipleStatements : true
    }
})

const modelsDir = path.join(__dirname, '/models');
//Import all db models and assosciation
fs.readdirSync(modelsDir)
    .filter(file =>
        (file.indexOf('.') !== 0) && (file !==basename) && (file.slice(-3) ==='.js'))
    .forEach(file => {
        const model = require(path.join(modelsDir, file))(sequelize,DataTypes)
        db[model.name] = model;
    });
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate){
        db[modelName].associate(db);
    }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;