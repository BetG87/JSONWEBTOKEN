const middlewareController = require('../controller/middlewareController');
const userController = require('../controller/userController');

const router = require('express').Router();



//GET ALL USER

router.get('/', middlewareController.verifyToken, userController.getAllUser);
router.delete('/:id',middlewareController.verifyTokenAndAdminAuth, userController.deletelUser);
module.exports = router