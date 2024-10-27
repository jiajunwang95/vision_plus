const controller = require('./logging.controller');
const utils = require('../../utils/initial')
module.exports = (router) => {
    router.get('/logging', async (req,res,next) =>{
        controller.logging(req.query)
        .then(result => {return res.status(200).json(result);})
        .catch(error => {
            const err = new utils.CustomError(`${error.message}`,404); //req.originalUrl - to display the api
            next(err);
        })
    })

}