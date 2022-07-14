import mongoose from "mongoose";

let Schema = mongoose.Schema({
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'movieschema' },
    upvote: { type: Number, default: 0},
    downvote: { type: Number, default: 0},
})

export default mongoose.model('voteschema', Schema);
