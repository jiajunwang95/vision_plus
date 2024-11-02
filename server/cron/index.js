const Config = require('../config/config');
const conf = new Config();
const cron = require('node-cron');
const logger = require('../utils/logger/log4js');
const USER = 'ADMIN';
/**
 * Importing Scripts
 */
const HOUSEKEEP = require('./script/housekeeping');
cron.schedule('00 00 * * *', () =>{
    logger.generateLog('CRON','INFO',USER,'HOUSEKEEP','Housekeeping Cron Initiated');
    HOUSEKEEP.consolidateTodayLog()
    .then(res => {
        console.log("What is success",res)
        logger.generateLog('CRON','INFO',USER,'HOUSEKEEP','Housekeeping Cron Completed')
    })
    .catch(err => {
        console.log("What is error",err)
        logger.generateLog('CRON','ERROR',USER,'HOUSEKEEP',err)
    })
});

