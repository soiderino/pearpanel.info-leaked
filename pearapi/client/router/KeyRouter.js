const Router = require('express');
const router = new Router();

const LicensingController = require('../controller/KeyAddController');

router.post('/registration', LicensingController.KeyGenerator);
router.post('/regpanel', LicensingController.AddToPanelModel);
router.post('/validkey', LicensingController.KeyChecker);
router.post('/loginkey', LicensingController.KeyLogin);
router.post('/loginhash', LicensingController.KeyHash);


module.exports = router;