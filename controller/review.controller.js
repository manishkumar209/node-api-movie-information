import movieschema from '../model/movie.model';
import reviewschema from '../model/review.model';

// Add new review

export const addReview = async (req, res) => {
    try{
        if(!req.params.id)
            return res.json({'sucsess': false, 'message': 'Movie id is required'})

        // Check movie exist or not

        let movie = await movieschema.findOne({_id: req.params.id}).exec();
        if(!movie)
            return res.json({'sucsess': false, 'message': 'Movie not found'})

        let obj = {
            movie_id: req.params.id,
            review: req.body.review
        }
        let newObj = new reviewschema(obj);
        let result = await newObj.save();
        if(!result)
            return res.json({'success': false, 'message': 'Getting error'})
        else    
            return res.json({'success': true, 'message': 'Review added'})

    }catch(err){
        return res.json({'success': false, 'message': err.message});
    }
}