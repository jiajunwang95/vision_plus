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
    })

}