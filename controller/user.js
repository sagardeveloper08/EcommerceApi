const express = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserRegistration = async (req, res) => {
    try {

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            passwordHash: req.body.passwordHash,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            apartment: req.body.apartment,
            zip: req.body.zip,
            street: req.body.street,
            city: req.body.city,
            country: req.body.country
        })
        const salt = await bcrypt.genSalt(10);
        user.passwordHash = await bcrypt.hash(user.passwordHash, salt);
        await user.save()
        res.status(200).json({ message: "user added sucesfully", user })
    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

const getUser = async (req, res) => {
    try {
        const user = await User.find().select('-passwordHash')
        if (!user) {
            res.status(400).json({ message: "user data not avalaivle" })
        }
        res.status(200).json({ message: "user data ", user })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

const userdetailsById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-passwordHash')
        if (!user) {
            res.status(400).json({ message: "user details not found" })
        }
        res.status(200).json({ message: "user details  by id", user })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

const login = async (req, res) => {
    try {
        const secret = process.env.secert
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(400).json({ message: "user not found" })
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.passwordHash
        );
        if (!validPassword) {
            res.status(400).json({ message: "password wrong" })
        }
        if (validPassword) {
            const token = jwt.sign({
                userId: user.id,
                isAdmin: user.isAdmin
            },
                secret,
                { expiresIn: '1w' }
            )
            res.status(200).json({ message: "user Authenicated", user: user.email, token: token })
        }
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

const getuserCount = async (req, res) => {
    try {
        if( !mongoose.Types.ObjectId.isValid(id) ) return false;
        const userCount = await User.countDocuments(count => count)
        if (!userCount) {
            res.status(400).json({ message: "produnct count is not avliable" })
        }
        console.log(usercount)
        res.status(200).send({ count: userCount })
    } catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}
module.exports = {
    UserRegistration: UserRegistration,
    getUser: getUser,
    userdetailsById: userdetailsById,
    login: login,
    getuserCount: getuserCount
}