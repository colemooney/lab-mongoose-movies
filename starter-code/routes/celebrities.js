const express = require('express');
const router  = express.Router();

/* GET Celebrities */
const Celebrity = require('../models/Celebrity')
// const { userAuth } = require('../middleware/auth')

router.get('/', (req, res, next) => {
    Celebrity.find({}).populate('createdBy')
        .then(celebrities => {
            // console.log(celebrities)
            res.render('celebrities/index', { celebrities: celebrities });
        })
        .catch(e => next(e))
});

router.post('/celebrities', (req, res, next) => {
    const newCeleb = new Celebrity({
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase,
      movies: req.body.movies
    });
  
    newCeleb.save()
      .then(responseFromDB =>{
        res.redirect("/celebrities")
      })
      .catch(err =>{
        console.error("Error, creating character", err);
        res.redirect("/celebrities/new")
      })
  });
  
  router.get('/celebrities/new', (req, res, next) => {
    Movie.find()
      .then(moviesFromDB =>{
        res.render("celebrity-views/new", {movies: moviesFromDB, user: req.session.currentUser})
      })
      .catch(err => next(err))
  });

router.get('/details/:id', (req, res, next) => {
    Celebrity.findById(req.params.id).populate('createdBy')
    .then(async celebrity => {
        // celebrity.createdByMe = (req.user && req.user.role === 'Admin') ? true : celebrity.createdBy ? celebrity.createdBy.equals(req.user) : false
        res.render('celebrities/show', { celebrity });
    })
    .catch(e => next(e))
});

// router.get('/new', userAuth, (req, res, next) => {
//     res.render('celebrities/create')
// });

router.post('/:id/delete', (req, res, next) => {
    Celebrity.findByIdAndRemove(req.params.id)
        .then(_ => {
            res.redirect('/celebrities')
        })
        .catch(e => next(e))
});


router.get('/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then(celebrity => {
            res.render('celebrities/edit', { celebrity })
        })
        .catch(e => next(e))
});

router.post('/:id', (req, res, next) => {
    Celebrity.findByIdAndUpdate(req.params.id, req.body)
        .then(_ => {
            res.redirect('/celebrities')
        })
        .catch(e => next(e))
});
router.post('/', (req, res, next) => {
    Celebrity.create({...req.body, createdBy: req.user.id })
        .then(celebrity => {
            celebrity.save()
            res.redirect('/celebrities')
        })
        .catch(e => res.redirect('/celebrities/new'))
});
module.exports = router;
