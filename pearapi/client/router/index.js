const Router = require ('express');
const router = new Router();

const IndexRouter = require ('./IndexRouter');
const AddRouter   = require ('./AddRouter');
const EditRouter  = require ('./EditRouter');
const GiveRouter  = require ('./GiveRouter');
const RemoveRouter= require ('./RemoveRouter');
const KeyRouter   = require ('./KeyRouter');
const LoadRouter   = require ('./LoadRouter');

router.use ('/', IndexRouter);
router.use ('/add', AddRouter);
router.use ('/edit', EditRouter);
router.use ('/give', GiveRouter);
router.use ('/remove', RemoveRouter);
router.use ('/key', KeyRouter);
router.use ('/load', LoadRouter)


module.exports = router;