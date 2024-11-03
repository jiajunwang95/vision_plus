const controller = require('./admin.controller');
const utils = require('../../utils/initial')
module.exports = (router) => {
    router.get('/getTable', async (req,res,next) =>{
        controller.getTable(req.query)
        .then(result => {return res.status(200).json(result);})
        .catch(error => {
            const err = new utils.CustomError(`${error.message}`,404); //req.originalUrl - to display the api
            next(err);
        })
    });
    router.get('/getAvailableTable', async (req,res,next) =>{
        controller.getAvailableTable(req.query)
        .then(result => {return res.status(200).json(result);})
        .catch(error => {
            const err = new utils.CustomError(`${error.message}`,404); //req.originalUrl - to display the api
            next(err);
        })
    })
    router.get('/getLog', async (req,res,next) =>{
        controller.getLog(req.query)
        .then(result => {return res.status(200).json(result);})
        .catch(error => {
            const err = new utils.CustomError(`${error.message}`,404); //req.originalUrl - to display the api
            next(err);
        })
    })

}