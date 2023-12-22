const Router = require('express').Router;
const router = new Router();

const LoadController = require('../controller/LoadController');

router.post('/fileupload', LoadController.uploadMiddleware, LoadController.uploadFile);

// Ваши другие роуты ...

module.exports = router;
