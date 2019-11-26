const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!

const review_controller = require('../controllers/review.controller');
//open
router.get('/open/reviews/:id',review_controller.getReview);
//secure
// this was a .put
router.post('/secure/addreview/',review_controller.createReview);//:id',review_controller.createReview);
//admin
router.get('/test',review_controller.test);


module.exports = router;