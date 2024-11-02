'use strict';

const DATE = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const VISION_SAMPLE = sequelize.define('VISION_SAMPLE', {
        HOSTNAME : {
            type : DataTypes.TEXT,
            primaryKey : true
        },
        SHORT_TEXT : DataTypes.TEXT,
        LONG_TEXT : DataTypes.TEXT,
    },{
        timestamps : false,
        freezeTableName : true
    });

    VISION_SAMPLE.assosciate = function(models){};
    return VISION_SAMPLE;
}
