const Config = require('../../config/config');
const conf = Config();
const logger = require('../../utils/logger/log4js');
const fs = require('fs');const readline = require('readline');
module.exports = {
    consolidateTodayLog: async () => {
        /**
         * 2 types of Logs... CRON + USER
         */

        const LOG_FILE_ARRAY = [
            `${conf.LOGGERPATH}/${conf.APPNAME}_cron.log`,
            `${conf.LOGGERPATH}/${conf.APPNAME}_user.log`
        ];
        const return_array = {};
        for(let file of LOG_FILE_ARRAY){
            const fileStream = fs.createReadStream(file);
            const rl = readline.createInterface({
              input: fileStream,
              crlfDelay: Infinity
            });
            for await (const line of rl) {
                // Each line in input.txt will be successively available here as `line`.
                const [TIMESTAMP,STATUS,USER,SESSION_ID] = line.match(/\[(.*?)\]/g);
                if(STATUS == "[ERROR]"){
                    if(!return_array[USER]){
                        return_array[USER] = [];
                      }
                      return_array[USER].push({
                        MESSAGE : line,
                        LOG_TIMESTAMP : TIMESTAMP.slice(1,-1),
                        USER : USER.slice(1,-1),
                        SESSION_ID : SESSION_ID || null
                      })
                }
              }
        }
        return return_array;
    }
}