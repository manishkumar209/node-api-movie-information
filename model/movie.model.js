import mongoose from 'mongoose';

var Schema = mongoose.Schema({
    name: String,
    genre: String,
    details: Object,
    release_date: Date,
    reviews: Object,
})

export default mongoose.model('movieschema', Schema);

