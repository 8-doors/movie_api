const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Models = require('./models.js');
const bodyParser = require('body-parser');

const Movies = Models.Movies;
const Genres = Models.Genres;
const Directors = Models.Directors;
const Users = Models.Users;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('common'))

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/f_stop', { useNewUrlParser: true, useUnifiedTopology: true });

/*CREATE
  We’ll expect JSON in this format
  {
    ID: Integer,
    Username: String,
    Password: String,
    Email: String,
    Birthday: Date
  }*/

  //Create New User

app.post('/users', (req, res) => {
  Users.findOne({ Username: req.body.Username }).then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + ' already exists.');
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday,
        Favorites: [req.body.Favorites]
      }).then((user) =>{res.status(201).json(user) })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  }).catch((error) => {
    console.error(error);
    res.status(500).send('Error: ' + error);
  });
});

  //add a movie to a users Favorites

app.post('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, 
    { $push: { Favorites: req.params['MovieID'] }}, { new: true })
    .then((updatedUser) => {
      res.json(updatedUser);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//READ

app.get('/', (req, res) => {
  res.send('Welcome to F/stop!!!');
});

  //Get all Movies

app.get('/movies', (req, res) => {
  Movies.find({})
    .then((movies) => {
      res.status(201).json(movies);
    }).catch((err)=> {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

  //find a movie by its Title

app.get('/movies/:Title', (req, res) => {
  Movies.findOne({ Title: req.params.Title })
    .then((movie) => {
      res.json(movie);
    
    }).catch((err)=> {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

  //gets info about a single genre

  app.get('/genres/:Name', (req, res) => {
    Genres.findOne({ Name: req.params.Name })
      .then((genre) => {
        res.json(genre);
      
      }).catch((err)=> {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
  });

  //find directors by name

app.get('/directors/:Name', (req, res) => {
  Directors.findOne({ Name: req.params.Name })
    .then((director) => {
      res.json(director);
    
    }).catch((err)=> {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

//UPDATE

  //update a users profile

app.put('/users/:Username', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set: 
    {
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    }
  }, 
  { new: true }).then((updatedUser) => {
    res.json(updatedUser);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

//DELETE


  //Delete movie off of user favorites

app.delete('/users/:Username/movies/:MovieID', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, { 
    $pull: { Favorites: req.params['MovieID']  }
  }, 
  { new: true })
    .then((updatedUser) => {
      res.json(updatedUser);
    }).catch((err) => {
      console.error(err);
     res.status(500).send('Error: ' + err);
    });
});

  //Delete User

app.delete('/users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found')
      } else {
        res.status(200).send(req.params.Username + ' was deleted')
      }
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    })
});



app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });