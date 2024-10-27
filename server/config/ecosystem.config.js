const APP_OBJ = {
    APPNAME : 'VISIONPLUS',
    LOGGERPATH : './log'
}
module.exports = {
    apps : [{
        name : 'VISIONPLUS',
        script : 'server/index.js',
        args : '',
        autorestart : false,
        watch : false,
        max_memory_restart : '1G',
        log_date_format: 'YYYY-MM-DD HH:mm:ss',
        ignore_watch : ["log","node_modules"],
        local : {
            ...APP_OBJ,
            NODE_ENV : 'local',
            DB_HOST : '',
            DB_DATABASE : '',
            DB_USER : '',
            DB_PASS : '',
            DB_PORT : ''

        }
    }]
}