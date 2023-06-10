const express = require('express'),
morgan = require('morgan'),
fs = require('fs'),
path = require('path');

const app = express();

app.use(morgan('common'))

app.get('/', (req, res) => {
  res.send('Welcome to F/stop!!!');
});

app.get('/movies', (req, res) => {
  res.send({
    "Everything Everywhere All At Once (2022)":{
     "Release Date":"March 25 2022"
    },
    "The Mask":{
     "Release Date":"July 29 1994"
    },
    "Evangelion":{
     "Release Date":"September 1 2007"
    },
    "The Gentlemen":{
     "Release Date":"January 24 2020"
    },
    "Rush Hour 2":{
     "Release Date":"August 3 2001"
    },
    "Aliennoid":{
     "Release Date":"July 20 2022"
    },
    "Life":{
     "Release Date":"April 16 1999"
    },
    "Django Unchained":{
     "Release Date":"December 25 2012"
    },
    "The Iron Giant":{
     "Release Date":"August 6 1999"
    },
    "A Cure for Wellness":{
     "Release Date":"February 17 2017"
    }
 });
});

app.use(express.static('public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });