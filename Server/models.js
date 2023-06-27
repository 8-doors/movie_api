const mongoose = require('mongoose');

let moviesSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Current Object'},
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {type: mongoose.Schema.Types.ObjectId, ref: 'Genre'},
    Director: {type: mongoose.Schema.Types.ObjectId, ref: 'Director'},
    ImagePath: String
});

let genresSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Current Object'},
    Name: {type: String, required: true},
    Description: {type: String, required: true}
});

let directorsSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Current Object'},
    Name: {type: String, required: true},
    Bio: {type: String, required: true},
    Birth: {type: String, required: true},
    Death: {type: String, required: true}
});

let usersShcema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    Favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

let Movies = mongoose.model('Movies', moviesSchema);
let Genres = mongoose.model('Genres', genresSchema);
let Directors = mongoose.model('Directors', directorsSchema);
let Users = mongoose.model('Users', usersShcema);

module.exports.Movies = Movies;
module.exports.Genres = Genres;
module.exports.Directors = Directors;
module.exports.Users = Users;