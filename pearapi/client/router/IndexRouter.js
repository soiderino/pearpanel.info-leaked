const Router = require('express');
const router = new Router();

const IndexController = require('../controller/IndexController');

router.get('/', IndexController.getMy);


module.exports = router;