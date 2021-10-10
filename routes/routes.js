const express = require('express')
const router = express.Router();
const productController = require('../controller/product')
const categoryController = require('../controller/category')
const userController = require('../controller/user')
const authJwt = require('../middleware/auth')
const orderController = require('../controller/order')

// product routes
router.post('/product', productController.product)

router.get('/getproduct',productController.getProduct)

router.get('/getproduct/:id', productController.getproductById)

router.put('/product/:id', productController.updateProduct)

router.delete('/deleteproduct/:id', productController.deleteProduct)

router.get('/product/count', productController.productCount)

router.get('/featured/:count', productController.feauturedProduct)

router.get('/getproductcategory', productController.getListByCategory)
// categorylist
router.post('/category', categoryController.categories)

router.get('/getcategory', categoryController.getCategory)

router.put('/category/:id', categoryController.updateCategory)

router.delete("/deletecategories/:id", categoryController.deleteCategory)

router.get('/category/:id', categoryController.getCategoryById)

// user routes 

router.post('/registration', userController.UserRegistration)

router.get("/", userController.getUser)

router.get('/:id', userController.userdetailsById)

router.post('/login', userController.login)

router.get('/count',userController.getuserCount)

// order routes
router.post('/order',orderController.order)

router.post('/getorder',orderController.getOrder)

module.exports = router;