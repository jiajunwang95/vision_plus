const Config = require('../../config/config');
const conf = Config();
const service = require('./admin.service');

const fs = require('fs');
const readline = require('readline');

async function readLogFile(filePath ,LIMIT = 5000){
    const SAVE_ARRAY = [];
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity // Recognize CR LF as a single newline.
  });
  for await (const line of rl) {
      // Process each line
      SAVE_ARRAY.push(line) // Replace this with your log processing logic
      if(SAVE_ARRAY.length > LIMIT){
        SAVE_ARRAY.shift();
      }
  }
  return SAVE_ARRAY;
}
module.exports = {
    getTable : (async  (res) =>{
        try{
            const TABLE = res.TABLE;
            const PRIMARY_KEY_SET = new Set([]);
            const [TABLE_KEY,TABLE_COLUMN] = await service.getTableInformation(TABLE);
            const return_obj = {};let PRIMARY_KEY = {};
            for(let index in TABLE_KEY){
                if(!PRIMARY_KEY[TABLE_KEY[index]['COLUMN_NAME']])PRIMARY_KEY[TABLE_KEY[index]['COLUMN_NAME']] = 'PRIMARY';
            }
            for(let index in TABLE_COLUMN){
                if(!index[TABLE_COLUMN[index]['COLUMN_NAME']]){
                    return_obj[TABLE_COLUMN[index]['COLUMN_NAME']] = {
                        LABEL : TABLE_COLUMN[index]['COLUMN_NAME'],
                        PRIMARY : PRIMARY_KEY[TABLE_COLUMN[index]['COLUMN_NAME']] || 'VALUE'
                    }
                    if(PRIMARY_KEY[TABLE_COLUMN[index]['COLUMN_NAME']] !== undefined) PRIMARY_KEY_SET.add(TABLE_COLUMN[index]['COLUMN_NAME']);
                }
            }
            const TABLE_DATA = await service.getTableData(TABLE);
            let RETURN_DATA = [];let f = 0
            for(let row of TABLE_DATA){
                if(PRIMARY_KEY_SET.size > 0){
                    let TMP_ID;
                    const setIter = PRIMARY_KEY_SET.values();
                    for(let i = 0; i < PRIMARY_KEY_SET.size; i++){
                        if(i == 0) {TMP_ID = setIter.next().value;}
                        else{TMP_ID += setIter.next().value;}
                    }
                    row['ID'] = TMP_ID;
                }else{
                    row['ID'] = f;
                    f++
                }
                console.log("What is row",row);
                RETURN_DATA.push(row)
            }
           
            return {COLUMN : return_obj, DATA : RETURN_DATA};
        }catch(error){
            console.log("What is error",error)
            throw error;
        }
    }),
    getAvailableTable : (async  (res) =>{
        try{
            const TABLE_KEYWORK = res.KEYWORD;
            const TABLE = await service.getTableFound(TABLE_KEYWORK);
            return TABLE;
  
        }catch(error){
            console.log("What is error",error)
            throw error;
        }
    }),
    getLog :  (async  (res) =>{
        try{
            const LOG_TYPE = res.LOG_TYPE;
            const LIMIT = res.LIMIT
            const FILE_PATH = `${conf.LOGGERPATH}/${conf.APPNAME}_${LOG_TYPE.toLowerCase()}.log`;
            const data = await readLogFile(FILE_PATH,LIMIT);
            const return_string = data.join('\n')
            return return_string;
  
        }catch(error){
            console.log("What is error",error)
            throw error;
        }
    }),
}