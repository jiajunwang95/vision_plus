const Config = require('../../config/config');
const conf = Config();
const logger = require('../../utils/logger/log4js');
const inital = require('../../utils/initial')

module.exports = {
    logging : (async  (res) =>{
        const ACTION = res.ACTION; const USER = res.USER; const MSG = res.SESSION_ID;
        return logger.generateLog('USER','ACTION',USER,ACTIOsN,MSG)
        
    })
}