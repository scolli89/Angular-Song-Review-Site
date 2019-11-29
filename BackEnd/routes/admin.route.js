const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const song_controller = require('../controllers/song.controller');
const account_controller = require('../controllers/account.controller');
// admin
//songs
router.get('/copyright',song_controller.copyright);
//accounts
router.post('/deactivate/:id',account_controller.deactivate);

module.exports = router;