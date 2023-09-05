const router = require('express').Router();
const ProductService = require("../services/ProductService");

router.get('/:productId', ProductService.getProductById);
router.post('/create', ProductService.createProduct);
router.put('/update', ProductService.updateProduct);
router.delete('/delete', ProductService.deleteProduct);

module.exports = router;