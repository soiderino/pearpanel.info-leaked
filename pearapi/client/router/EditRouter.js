const Router = require('express');
const router = new Router();

const EditController = require('../controller/EditController');

router.patch('/loader', EditController.UpdatePanelLoader);
router.patch('/mnemonic', EditController.UpdatePanelMnemonic);
router.patch('/phishing', EditController.UpdatePanelPhishing);
router.patch('/private', EditController.UpdatePanelPrivate);
router.patch('/settings/:id', EditController.UpdatePanelSettingsById);

module.exports = router;