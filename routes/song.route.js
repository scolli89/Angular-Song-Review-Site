const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const song_controller = require('../controllers/song.controller');

// a simple test url to check that all of our files are communicating correctly.
router.get('/test', song_controller.test);
router.post('/create', song_controller.song_create);
router.delete('/:id/delete', song_controller.song_delete);
router.put('/:id/update', song_controller.song_update);
router.get('/:id', song_controller.song_details);

// Secure
// this was a put, but i think it should be a post
router.post('/secure/song',song_controller.songCreate); // b. PUT /api/secure/song/ - save the JSON array for a song in the database and return the ID. 
//this was a post, but i think it should be a put
router.put('/secure/song/:id',song_controller.songUpdate); //c. POST /api/secure/song/:id - update the record of the given song ID with JSON array of properties sent in the body. d


// open
router.get('/open/song',song_controller.getSongs);//GET /api/open/song - return a list of 10 songs ordered by average rating. Optionally, you may pass a query parameter to indicate the number of results to return. 
router.get('/open/search',song_controller.searchSongs); //e. GET /api/open/search - return a list of songs matching the search criteria provided as query parameters. 


// admin
router.get('/admin/copyright',song_controller.copyright);

module.exports = router;