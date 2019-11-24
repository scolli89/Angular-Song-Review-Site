const express = require('express');
const router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!

const account_controller = require('../controllers/account.controller');

//open
router.get('/test', account_controller.test);
router.post('/api/open/createaccount',account_controller.create_account);
//secure

//admin
router.post('/api/admin/deactivate/:id',account_controller.deactivate);



module.exports = router;