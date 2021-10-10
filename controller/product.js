const express = require('express');
const { Category } = require('../models/category');
const { Product } = require("../models/products");

const product = async (req, res) => {
    try {
        const category = await Category.findById(req.body.category)
        console.log(category, 'category')
        if (!category) {
            res.status(400).json({ message: "category not found" })
        }
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        })
        await product.save()
        res.status(200).json({ message: "product added sucessfully", product })
    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}
// get routes

const getProduct = async (req, res) => {
    try {
        const productList = await Product.find().populate('category');

        if (!productList) {
            res.status(400).json({ message: "Product list not avaialble" })
        }
        res.status(200).json(productList)
    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

const getproductById = async (req, res) => {
    try {
        const productList = await Product.findById(req.params.id);

        if (!productList) {
            res.status(400).json({ message: "Product list not avaialble" })
        }
        res.status(200).json(productList)
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

const updateProduct = async (req, res) => {
    try {
        const category = await Category.findById(req.body.category)
        // console.log(category, 'category')
        if (!category) {
            res.status(400).json({ message: "category not found" })
        }
        const product = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured
        }, { new: true })
        if (!product) {
            res.status(400).json({ message: "Product list not avaialble" })
        }
        res.status(200).json(product)
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndRemove(req.params.id)
        if (!deleteProduct) {
            res.status(400).json({ message: "Product list not avaialble" })
        }
        res.status(200).json({ message: "product delete sucessfully" })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}
// route for product count

const productCount = async (req, res) => {
    try {
        const productCount = await Product.countDocuments()
        if (!productCount) {
            res.status(400).json({ message: "produnct count is not avliable" })
        }
        res.status(200).send({ count: productCount })
    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}
// route for feautured products
const feauturedProduct = async (req, res) => {
    try {
        const count = req.params.count ? req.params.count : 0
        const feauturedProduct = await Product.find({ isFeatured: true }).limit(count)
        if (!feauturedProduct) {
            res.status(400).json({ message: "featured product not available" })
        }
        res.status(200).json({ message: "featured prdouct", feauturedProduct })
    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

// route for catergory and product 
const getListByCategory = async (req, res) => {
    try {
        let filter = {}
        if (req.query.categories) {
            filter = { category: req.query.categories.split(',') }
        }
        const getListByCategory = await Product.find(filter).populate('category')
        if (!getListByCategory) {
            res.status(400).json({ message: "cant find data" })
        }
        res.status(200).json({ message: "Product by categroies", getListByCategory })
    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

module.exports = {
    product: product,
    getProduct: getProduct,
    getproductById: getproductById,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    productCount: productCount,
    feauturedProduct: feauturedProduct,
    getListByCategory: getListByCategory
}