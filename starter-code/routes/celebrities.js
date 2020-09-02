const express = require('express');
const router  = express.Router();

/* GET Celebrities */
const Celebrity = require('../models/Celebrity')
const { userAuth } = require('../middleware/auth')

router.get('/', (req, res, next) => {
    Celebrity.find({}).populate('createdBy')
        .then(celebrities => {
            res.render('celebrities/index', { celebrities: celebrities });
        })
        .catch(e => next(e))
});

module.exports = router;
