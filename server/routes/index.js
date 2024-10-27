const router = require('express').Router();
const fs = require('fs');
const path = require('path');
fs.readdirSync(__dirname)
    .filter(file => fs.statSync(path.join(__dirname,file)).isDirectory())
    .forEach(dir => {
        require(`../routes/${dir}`)(router);
    })
module.exports = router;