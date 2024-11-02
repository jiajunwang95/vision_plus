const Config = require('../config/config');
const conf = new Config();

class CustomError extends Error{ //Integrate Error class from NodeJs with this CustomError
    constructor(message, statusCode){
        super(message); //Passing message to Error class
        this.statusCode = statusCode;
        this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
        this.isOperational = true; //We can check for this property and only send if it is app related user.

        Error.captureStackTrace(this,this.constructor)
    }
}
module.exports = {
    CustomError,
    intializing : async() =>{
        let config = JSON.parse(process.env.CONFIG);
        if(process.env.NODE_ENV = 'local'){
            /**
             * 1. Retrieve from the econsystem (Since local, its from a file)
             * 2. Loop thru the KEY to identify which not found in the process.env
             * 3. Save them into the process.env (Only can be save as string....)
             */
            const local_conf = require('../config/local/ecosystem.config')['apps'][0];
            for(const KEY in local_conf[process.env.NODE_ENV]){
                if(!process.env[KEY]){
                    process.env[KEY] = local_conf[process.env.NODE_ENV][KEY];
                }
                
            }
            const config = new Config();
            return config
        }
    },
    /**
     * Creating error Handling to initial in index.js
     */ 
    errorHandler : (err, req, res, next) =>{
        err.statusCode = err.statusCode || 500;
        err.status = err.status || 'error'
        res.status(err.statusCode).json({
            status : err.status,
            message : err.message
        })
    },
     asyncErrorHanlder : (func) =>{
        return (req,res,next) =>{
            func(req,res,next).catch(err => next(err))
        }
    }
}