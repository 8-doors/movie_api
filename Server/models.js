const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Current Object'},
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {type: mongoose.Schema.Types.ObjectId, ref: 'Genre'},
    Director: {type: mongoose.Schema.Types.ObjectId, ref: 'Director'},
    ImagePath: String
});

let genreSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Current Object'},
    Name: {type: String, required: true},
    Description: {type: String, required: true}
});

let directorSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Current Object'},
    Name: {type: String, required: true},
    Bio: {type: String, required: true},
    Birth: {type: String, required: true},
    Death: {type: String, required: true}
});

let userShcema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, ref: 'Current Object'},
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    Favorites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

let Movie = mongoose.model('Movies', movieSchema);
let Genre = mongoose.model('Genres', genreSchema);
let Director = mongoose.model('Directors', directorSchema);
let User = mongoose.model('Users', userShcema);

module.exports.Movie = Movie;
module.exports.Genre = Genre;
module.exports.Director = Director;
module.exports.User = User;