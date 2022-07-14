import voteschema from '../model/vote.model'
import movieschema from '../model/movie.model'

// Upvote a movie
export const upVotes = async (req, res) => {
    try{
        if(!req.params.id)
            return res.json({'sucsess': false, 'message': 'Movie id is required'})

        // Check movie exist or not

        let movie = await movieschema.findOne({_id: req.params.id}).exec();
        if(!movie)
            return res.json({'sucsess': false, 'message': 'Movie not found'})

        let existingVoting = await voteschema.findOne({movie_id: req.params.id}).exec();
        if(existingVoting){
            let newUpvote = existingVoting.upvote + 1;
            let result = await voteschema.updateOne({movie_id: req.params.id}, {$set: {'upvote': newUpvote} }).exec();
            if(!result)
                return res.json({'success': false, 'message': 'Getting error'})
            else    
                return res.json({'success': true, 'message': 'Upvoted'})
        }else{
            let obj = {
                movie_id: req.params.id,
                upvote: 1
            }
            let newObj = new voteschema(obj);
            let result = await newObj.save();
            if(!result)
                return res.json({'success': false, 'message': 'Getting error'})
            else    
                return res.json({'success': true, 'message': 'Upvoted'})
            }
    }catch(err){
        return res.json({'success': false, 'message': err.message});
    }
}

// Dwnvote a movie
export const downVotes = async (req, res) => {
    try{
        if(!req.params.id)
            return res.json({'sucsess': false, 'message': 'Movie id is required'})

        // Check movie exist or not

        let movie = await movieschema.findOne({_id: req.params.id}).exec();
        if(!movie)
            return res.json({'sucsess': false, 'message': 'Movie not found'})

        let existingVoting = await voteschema.findOne({movie_id: req.params.id}).exec();
        if(existingVoting){
            let newDownvote = existingVoting.downvote + 1;
            let result = await voteschema.updateOne({movie_id: req.params.id}, {$set: {'downvote': newDownvote} }).exec();
            if(!result)
                return res.json({'success': false, 'message': 'Getting error'})
            else    
                return res.json({'success': true, 'message': 'Downvoted'})
        }else{
            let obj = {
                movie_id: req.params.id,
                downvote: 1
            }
            let newObj = new voteschema(obj);
            let result = await newObj.save();
            if(!result)
                return res.json({'success': false, 'message': 'Getting error'})
            else    
                return res.json({'success': true, 'message': 'Downvoted'})
            }
    }catch(err){
        return res.json({'success': false, 'message': err.message});
    }
}

// Fetch top 10 movies based on upvotes
export const topUpVoted = async (req, res) => {
    try{
        let result = await voteschema.find().sort({'upvote': -1}).limit(10).populate("movie_id").exec();
        return res.json({'success': true, 'data': result});
    }catch(err){
        return res.json({'success': false, 'message': err.message});
    }
}