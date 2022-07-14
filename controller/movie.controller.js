
import movieschema from '../model/movie.model';
import reviewschema from '../model/review.model';
import movie, { review } from '../movie_list'

// Add movies from list
export const addDefaultMovie = (req, res) => {
    try{
        let review = movie.review;
        let movies = [];
        movies = movie.movies;
        
        movies.forEach( async element => {
            let newObj = new movieschema(element)
            let result = await newObj.save();
            if(result)
                saveReview(result._id, review)
        });
        return res.json({'success': true, 'message': 'Synced from file'});
    }catch(err){
        return res.json({'success': false, 'message': err.message});
    }
}
// Save review
function saveReview(movie_id, review){
    review.forEach( async element => {
        let newObj = new reviewschema(element)
        newObj.movie_id = movie_id
        return await newObj.save();
    });
}

// Add new movie
export const addMovie = async (req, res) => {
    try{
        if(!req.body.name)
            return res.json({'success': false, 'message': 'Movie name not found'});

        let checkexist = await movieschema.findOne({'name': req.body.name}).exec();
        if(checkexist)
            return res.json({'success': false, 'message': 'Movie name already exist'});

        let obj = {
            name: req.body.name,
            genre: req.body.genre,
            details: req.body.details,
            release_date: req.body.release_date,
        }
        let newObj = new movieschema(obj);
        let result = await newObj.save();
        if(result)
            return res.json({'success': true, 'message': 'Movie added', '_id': result._id })
        else
            return res.json({'success': false, 'message': 'Getting error'})

    }catch(err){
        return res.json({'success': false, 'message': err.message});
    }
}

// Fetch details of specific movie by id (id, name, details, genre, release date, reviews)
export const getSingleMovieDetails = async (req, res) => {
    try{
        let result = await movieschema.findOne({_id:req.params.id}).exec();
        if(!result)
            return res.json({'success': false, 'message': 'Movie not found'});
        else{
            let reviews_data = await reviewschema.find({movie_id: req.params.id}, {'review': -1}).exec();
            if(reviews_data && reviews_data.length > 0){
                let review_list = [];
                reviews_data.forEach(async element => {
                    review_list.push({
                        'review': element.review
                    })
                });
                result.reviews = review_list;
            }
            return res.json({'success': true, 'data': result})
        }
    }catch(err){
        return res.json({'success': false, 'message': err.message});
    }
}

// Fetch a list of movies (id, name, genre)
export const getMoviesList = async (req, res) => {
    try{
        let result = await movieschema.find().exec();
        let movies_list = [];
        if(result.length > 0){
            result.forEach(element => {
                let obj = {
                    _id: element._id,
                    name: element.name,
                    genre: element.genre,
                }
                movies_list.push(obj)
            });
        }
        return res.json({'success': true, 'data': movies_list})
    }catch(err){
        return res.json({'success': false, 'message': err.message});
    }
}

// Search movies (Should filter by genre, sort by release date)
export const searchMovie = async (req, res) => {
    try{
        console.log(req.params.genre)
        if(!req.params.genre)
            return res.json({'success': false, 'message': 'Invalid input, required filter type'});

        let result = await movieschema.find({'genre': {$regex: req.params.genre } }).sort({"release_date":1}).exec();
        let movies_list = [];
        if(result.length > 0){
            result.forEach(element => {
                let obj = {
                    name: element.name,
                    release_date: element.release_date,
                    genre: element.genre
                }
                movies_list.push(obj)
            });
        }
        if(result.length > 0){
            return res.json({'success': true, 'data': movies_list})
        }else{
            return res.json({'success': false, 'message': 'Movie not found'})
        }
    }catch(err){
        return res.json({'success': false, 'message': err.message});
    }
}
