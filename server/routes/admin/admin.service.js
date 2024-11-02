const db = require('../../db/local/connection');
const Config = require('../../config/config');
const conf = Config();
module.exports = {
    getTableInformation: async (TABLE) => {
        const query = `
        SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
        WHERE TABLE_NAME = "${TABLE}" AND CONSTRAINT_NAME LIKE "PRIMARY%";
        SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = "${TABLE}";
        `
        const result = await db.sequelize.query(query, {
            type : db.sequelize.QueryTypes.SELECT
        });
        return result
    },
    getTableData : async (TABLE) =>{
        const result = await db[TABLE].findAll({
            logging : console.log,
            raw : true
        })
        return result;
    }
}