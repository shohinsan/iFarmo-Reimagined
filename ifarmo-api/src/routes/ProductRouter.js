const router = require('express').Router();
const ProductService = require("../services/ProductService");
const AdminService = require("../services/AdminService");

router.get('/products', ProductService.getAllProducts);
router.get('/:productId', ProductService.getProductById);
router.post('/create', ProductService.createProduct);
router.put('/update', ProductService.updateProduct);
router.delete('/delete', ProductService.deleteProduct);
// Dev mode
router.post('/push-notify', ProductService.pushNotify);
module.exports = router;