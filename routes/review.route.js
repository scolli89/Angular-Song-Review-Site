const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!

const review_controller = require('../controllers/review.controller');
//open
router.get('/api/open/reviews/:id',review_controller.getReview);
//secure
// this was a .put
router.post('/api/secure/addreview/:id',review_controller.createReview);
//admin



module.exports = router;