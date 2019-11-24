const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const song_controller = require('../controllers/song.controller');
const account_controller = require('../controllers/account.controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', song_controller.test);
router.post('/create', song_controller.song_create);
router.delete('/:id/delete', song_controller.song_delete);
router.put('/:id/update', song_controller.song_update);
router.get('/:id', song_controller.song_details);

// separate API prefizes for non-authernticated, regularm and admin categories
// Secure
// this was a put, but i think it should be a post
router.post('/api/secure/song',song_controller.songCreate); // b. PUT /api/secure/song/ - save the JSON array for a song in the database and return the ID. 
//this was a post, but i think it should be a put
router.put(' /api/secure/song/:id',song_controller.songUpdate); //c. POST /api/secure/song/:id - update the record of the given song ID with JSON array of properties sent in the body. d
router.put('/api/secure/addreview/:id',song_controller.songReviewCreate);
// open
router.get('/api/open/song',song_controller.getSongs);//GET /api/open/song - return a list of 10 songs ordered by average rating. Optionally, you may pass a query parameter to indicate the number of results to return. 
router.get('/api/open/search',song_controller.searchSongs); //e. GET /api/open/search - return a list of songs matching the search criteria provided as query parameters. 
router.get('/api/open/reviews/:id',song_controller.reviewSong);

router.post('/api/open/createaccount',account_controller.create_account); // anybody should be able to make an account
// admin
router.get('/api/admin/copyright',song_controller.copyright);
router.post('/api/admin/deactivate/:id',account_controller.deaactivate);
module.exports = router;