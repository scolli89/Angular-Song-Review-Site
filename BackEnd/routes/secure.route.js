const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const song_controller = require('../controllers/song.controller');
const review_controller = require('../controllers/review.controller');
// Secure
// this was a put, but i think it should be a post
router.post('/song',song_controller.songCreate); // b. PUT /api/secure/song/ - save the JSON array for a song in the database and return the ID. 
//this was a post, but i think it should be a put
router.put('/song/:id',song_controller.songUpdate);

//reviews
router.post('/addreview/',review_controller.createReview);//:id',review_controller.createReview);

module.exports = router;