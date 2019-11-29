const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const song_controller = require('../controllers/song.controller');
const review_controller = require('../controllers/review.controller');
const account_controller = require('../controllers/account.controller');



// songs
router.get('/song',song_controller.getSongs);//GET /api/open/song - return a list of 10 songs ordered by average rating. Optionally, you may pass a query parameter to indicate the number of results to return. 
router.post('/song',song_controller.searchSongs); //e. GET /api/open/search - return a list of songs matching the search criteria provided as query parameters. 
//this now searches a song

// reviews
router.post('/reviews',review_controller.getReviewsOfSong);
router.get('/reviews',review_controller.getRecentReviews);


//acounts
router.post('/createaccount',account_controller.create_account);
module.exports = router;



// Require the controllers WHICH WE DID NOT CREATE YET!!


