import mongoose from "mongoose";

let Schema = mongoose.Schema({
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'movieschema' },
    review: {type: String, default: ''},
})

export default mongoose.model('reviewschema', Schema);
