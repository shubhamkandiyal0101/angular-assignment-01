const express = require('express');
const app = express();
const router = express.Router();
const homeController = require('../controller/homeController'); 

router.get('/',homeController.homePage)

module.exports = router;