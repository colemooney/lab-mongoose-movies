const path = require('path');
require('dotenv').config();

const mongoose = require('mongoose');
const Celebrity = require("../models/Celebrity")
// const Movie = require("../models/Movie")

mongoose
  .connect("mongodb://localhost:27017/lab-movies", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)

    Celebrity.insertMany(celebSeed)
      .then(res => {
        console.log("Successfully seeded database");
      })
      .catch(err => console.error(err));
    })
//     Movie.insertMany(movieSeed)
//       .then(res => {
//         console.log("Successfully seeded database");
//       })
//       .catch(err => console.error(err));
//   })
    
  .catch(err => console.error('Error connecting to mongo', err));

const celebSeed = [
  {
    name: "CelebDog",
    occupation: "Actor",
    catchPhrase: "Woof"
  },

  {
    name: "CelebCat",
    occupation: "Actor",
    catchPhrase: "Meow"
  },

  {
    name: "CelebHamster",
    occupation: "Comedian",
    catchPhrase: "*Squeak*"
  },

]