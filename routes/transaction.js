const tramsactionController = require('../controller/transactiontController');
const middlewareController = require('../controller/middlewareController');

const router = require('express').Router();

router.get('/', tramsactionController.getAllBankAccount);
router.post('/', tramsactionController.addBankAccount);
router.get('/:id', tramsactionController.getById);
router.get('/user/:id', tramsactionController.getByUserId);
router.post('/delete', middlewareController.verifyTokenAndAdminAuth, tramsactionController.deleteBankAccount);
router.post('/update', middlewareController.verifyTokenAndAdminAuth, tramsactionController.updateBankAccount);
module.exports = router