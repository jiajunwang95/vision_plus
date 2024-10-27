const log4js = require('log4js');
const Config = require('../../config/config');
const config = Config();

/**
 * Log Levels : trace < debug < info < warn < error < fatal
 */
log4js.configure({
    appenders : {
        console : {
            type : 'console'
        },
        userLog : {
            type : 'file',
            filename : `${config.LOGGERPATH}/${config.APPNAME}_user.log`,
            // pattern: '.yyyy-MM-dd', // Daily rotation pattern
            // keepFileExt: true,      // Keep the original file extension
            // compress: true,         // Compress old log files
            maxLogSize : 10485760,
            backups : 1,
        },
        cronLog : {
            type : 'file',
            filename : `${config.LOGGERPATH}/${config.APPNAME}_cron.log`,
            // pattern: '.yyyy-MM-dd', // Daily rotation pattern
            // keepFileExt: false,      // Keep the original file extension
            // compress: true,         // Compress old log files
            maxLogSize : 10485760,
            backups : 1,
        }
    },
    categories : {
        local : {
            appenders : ['console'],
            level : 'debug'
        },
        default : {
            appenders : ['console','userLog'],
            level : 'info'
        },
        userLog : {
            appenders : ['userLog'],
            level : 'info'
        },
        cronLog : {
            appenders : ['cronLog'],
            level : 'info'
        },
    }
});

const userLog = log4js.getLogger('userLog');
const cronLog = log4js.getLogger('cronLog');

/**
 * Define command Functions... idk if it will work?
 */
function generateLog(TYPE_OF_LOG,STATUS,USER,FUCTION,MSG){
    let logfile;
    if(TYPE_OF_LOG == 'CRON'){
        logfile = cronLog
    }else{
        logfile = userLog
    }
    switch(STATUS){
        case 'INFO':
            logfile.info(`[${USER}] - Has triggered (${FUCTION}) with response : ${MSG} `);
            break;
        case 'ERROR':
            logfile.error(`[${USER}] - Triggered (${FUCTION}) with error : ${MSG} `);
            break;
        case 'ACTION':
            logfile.info(`[${USER}] SESSION ID [${MSG}] - Performed (${FUCTION})`);
    }
    return;
}
module.exports = {
    userLog,
    cronLog,
    generateLog : (TYPE_OF_LOG,STATUS,USER,FUCTION,MSG) =>{
        return generateLog(TYPE_OF_LOG,STATUS,USER,FUCTION,MSG);
    },
}