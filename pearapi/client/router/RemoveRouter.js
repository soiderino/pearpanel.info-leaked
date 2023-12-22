const Router = require('express');
const router = new Router();

const RemoveController = require('../controller/RemoveController');

router.delete('/loader', RemoveController.DeleteFromPanelLoader);
router.delete('/mnemonic', RemoveController.DeleteFromPanelMnemonic);
router.delete('/phishing', RemoveController.DeleteFromPanelPhishing);
router.delete('/private', RemoveController.DeleteFromPanelPrivate);
router.delete('/settings/:id', RemoveController.DeleteFromPanelSettings);

module.exports = router;