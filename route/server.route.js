import express from "express";
import * as movieController from '../controller/movie.controller';
import * as reviewController from '../controller/review.controller';
import * as votingController from '../controller/vote.controller';

const router = express.Router();

router.route('/movie-sync').get(movieController.addDefaultMovie);
router.route('/movie').post(movieController.addMovie);
router.route('/movie/:id?').get(movieController.getSingleMovieDetails);
router.route('/movies/:genre').get(movieController.searchMovie);
router.route('/movies').get(movieController.getMoviesList);

router.route('/review/:id').put(reviewController.addReview);
router.route('/upvote/:id').put(votingController.upVotes);
router.route('/downvote/:id').put(votingController.downVotes);
router.route('/top-upvoted').get(votingController.topUpVoted);

export default router;