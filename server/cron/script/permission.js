/**
 * Purpose of this file is to ehange all the owner:group so we do not need root.
 */
const inital = require('../../utils/initial');
const fs = require('fs');
let Config;let OWNER;let GROUP;
(async () => {
    inital.intializing().then(async res => {
        Config = require('../../config/config');
        const conf = Config();
        const BASE_DIR = '/Users/jiaju/Project/nodejs/visionplus/server';
        /**
         * Declare those modules that need PW here....
         */
        try{
            const MASTER_FOLDER_STAT = await fs.promises.stat(BASE_DIR);
            console.log(`OWNER ID : ${MASTER_FOLDER_STAT.uid}, GROUP ID : ${MASTER_FOLDER_STAT.gid}`);
            OWNER = MASTER_FOLDER_STAT.uid; GROUP = MASTER_FOLDER_STAT.gid;
            const ALL_INSIDE_DIR = await fs.readdirSync(BASE_DIR);
            console.log("ALL ITEM",ALL_INSIDE_DIR);
            if(OWNER && GROUP){
                for(let ENTRY of ALL_INSIDE_DIR){
                    const FILE_STAT = fs.statSync(`${BASE_DIR}/${ENTRY}`);
                    if(FILE_STAT.isDirectory()){
                        await DiveFolder(`${BASE_DIR}/${ENTRY}`)
                    }else{
                        await fs.chownSync(`${BASE_DIR}/${ENTRY}`,OWNER,GROUP);
                    }
                }
            }
        }catch(error){
            console.log(`Error with ${__filename} - ${error}`)
            throw error;
        }
    })

})();
/**
 * Recursive Loop into file...
 */
async function DiveFolder(PATH){
    const ALL_INSIDE_DIR = await fs.readdirSync(PATH);
    for(let ENTRY of ALL_INSIDE_DIR){
        const FILE_STAT = fs.statSync(`${PATH}/${ENTRY}`);
        if(FILE_STAT.isDirectory()){
            /** Change ownership of the folder before Diving...*/
            await fs.chownSync(`${PATH}/${ENTRY}`,OWNER,GROUP);
            const NEW_PATH = `${PATH}/${ENTRY}`;
            await DiveFolder(NEW_PATH)
        }else{
            await fs.chownSync(`${PATH}/${ENTRY}`,OWNER,GROUP);
        }
    }
    return;
}