const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
const song_controller = require('../controllers/song.controller');
const account_controller = require('../controllers/account.controller');

const sanitizeHtml = require('sanitize-html');
const auth = require("../middleware/auth");

const bcrypt = require("bcrypt"); // outdated
const argon2 = require('argon2');
const { User, validate } = require("../models/user.model");


// admin
//songs
router.get('/copyright',song_controller.copyright);
//accounts
//change back to auth
router.put('/users',auth,account_controller.changeUserSettings);

router.post('/users',auth,account_controller.getAllUsers);



module.exports = router;