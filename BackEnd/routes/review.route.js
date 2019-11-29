const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!

const review_controller = require('../controllers/review.controller');
//open
router.post('/open/reviews',review_controller.getReviewsOfSong);
router.get('/open/reviews',review_controller.getRecentReviews);
//secure
// this was a .put
router.post('/secure/addreview/',review_controller.createReview);//:id',review_controller.createReview);
//admin
router.get('/test',review_controller.test);



module.exports = router;