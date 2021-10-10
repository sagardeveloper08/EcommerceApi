const express = require('express');
const { Category } = require('../models/category');
const router = require('../routes/routes');

const categories = async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            color: req.body.color,
            icon: req.body.icon,
            image: req.body.image
        })
        await category.save()
        res.status(200).json({ message: "categoy saved sucessfull", category })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

const getCategory = async (req, res) => {
    try {
        const categoryList = await Category.find();
        if (!categoryList) {
            res.status(400).json({ message: "Category lIst not found", err });
            console.log(err)
        }
        res.status(200).json({ message: "category list", categoryList })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

const getCategoryById = async (req, res) => {
    try {
        const categoryById = await Category.findById(req.params.id);
        if (!categoryById) {
            res.status(400).json({ message: "failed to fetch data" })
        }
        res.status(200).json({ message: "category Fetch sucessfully", categoryById })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

const updateCategory = async (req, res) => {
    try {
        const updateCategory = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        }, {
            new: true
        })
        if (!updateCategory) {
            res.status(400).json({ message: "not able to update category" })
        }
        res.status(200).json({ message: "update sucessfully", updateCategory })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

const deleteCategory = async (req, res) => {
    try {
        const deleteCategory = await Category.findByIdAndRemove(req.params.id)
        if (!deleteCategory) {
            res.status(400).json({ message: "not able to delete category" })
        }
        res.status(200).json({ message: "catergory delete sucessfully" })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

module.exports = {
    categories: categories,
    getCategory: getCategory,
    deleteCategory: deleteCategory,
    getCategoryById: getCategoryById,
    updateCategory: updateCategory
}