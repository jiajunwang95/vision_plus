const { exec } = require('child_process');
const inital = require('../../../utils/initial');
let Config;
(async () => {
    inital.intializing().then(async res => {
        Config = require('../../../config/config');
        const conf = Config();
        /**
         * Declare those modules that need PW here....
         */
        let UPTIME;let RESTART_COUNT;let STATUS;let CPU;let MEM;
        exec(`pm2 ls | (grep "${conf.APPNAME}" && cat)`, (err, stdout, stderr) => {
            if (err) {
                // node couldn't execute the command
                console.error(err);
                return;
            }

            // the *entire* stdout and stderr (buffered)
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if(stdout){
                const parts = stdout.split(/│\s*/).map(part => part.trim()).filter(part => part);
                [UPTIME,RESTART_COUNT,STATUS,CPU,MEM] = [
                    parts[6],parts[7],parts[8],parts[9],parts[10]
                ]
            }
   
        });
    })

})();