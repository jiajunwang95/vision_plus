/*1. Starting the app with Express
*/
const inital = require('./utils/initial');
inital.intializing().then(async res =>{
    /* 2. Create Config.js + ecosystem.config.js
    - Importing the information from Config.js */
    const Config = require('./config/config');
    const conf = Config();
    /**
     * Declare those modules that need PW here....
     */
    const express = require('express');
    const http = require('http');
    const route = require('./routes/index');
    const connection = require('./db/local/connection');
    const path = require('path');
    //Middleware
    const app = express();
    /**
     * Logger + Housekeeping Logger
     */
    const logger = require('./utils/logger/log4js');
    const cron = require('./cron/index');
    /**
     * Redirect to the dist/index.html
     */
   
    let BaseDir = `/../dist/${process.env.name}`;
    if(conf.NAME !== 'local'){
        BaseDir = `/../dist/${conf.NAME}/${process.env.name}`
    }
    /**
     * To show all the api calls in the server...
     */
    // app.use((req, res, next) => {
    //     console.log(`${req.method} ${req.originalUrl}`);
    //     next();
    // });
    /*
        Serve static files from the Angular app
    */
     app.use(express.static(path.join(__dirname,BaseDir)));
     app.use('/api',route);
     app.use(inital.errorHandler);
    /*
    Redirect all other routes to index.html
    */ 
    app.get('*', (req, res)=> {
        res.sendFile('index.html',{ root : path.join(__dirname + `${BaseDir}/`)})
    }) ;
    app.set('port',conf.PORT);


    /**
     * Initialing the application...
     */
    const server = http.createServer(app);
    server.listen(conf.PORT, () =>{
        console.log(`[Express] HTTP running on ${conf.NAME} : ${conf.PORT}`)
    })
})