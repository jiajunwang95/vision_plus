const env = process.env;
module.exports = function () {
    switch (env.NODE_ENV) {
        default:
            tmp = {
                APPNAME : env.APPNAME,
                NAME : 'local',
                PORT : '8080',
                LOGGERPATH : env.LOGGERPATH,
                DB : {
                    HOST : env.DB_HOST,
                    DATABASE : env.DB_DATABASE,
                    USER : env.DB_USER,
                    PASS : env.DB_PASS,
                    PORT : env.DB_PORT
                },
                JSON_TOKEN : env.JSON_TOKEN,
            
            }
    }
    process.env.CONFIG = JSON.stringify(tmp);
    return JSON.parse(process.env.CONFIG);
}