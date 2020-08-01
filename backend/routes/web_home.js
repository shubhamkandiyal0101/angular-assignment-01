const express = require('express');
const app = express();
const router = express.Router();
const homeController = require('../controller/homeController'); 
const isAuthenticated = require('../middleware/check-auth');

router.get('/',homeController.homePage);
router.post('/signup',homeController.signup);
router.post('/login',homeController.login);
router.get('/user-details', isAuthenticated, homeController.fetchUserDetails);

module.exports = router;