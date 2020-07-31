const express = require('express');
const app = express();
const router = express.Router();
const homeController = require('../controller/homeController'); 

router.get('/',homeController.homePage);
router.post('/signup',homeController.signup);
router.post('/login',homeController.login);

module.exports = router;