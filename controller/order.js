const express = require('express')
const { Order } = require('../models/order')
const { OrderItem } = require('../models/order-items')

const order = async (req, res) => {
    try {
        const orderItemsIds = Promise.all(req.body.orderItems.map(async (orderItem) => {
            let newOrderItem = new OrderItem({
                quantity: orderItem.quantity,
                product: orderItem.product
            })

            newOrderItem = await newOrderItem.save();

            return newOrderItem._id;
        }))
        const orderItemsIdsResolved = await orderItemsIds;

        const orders = new Order({
            orderItems: orderItemsIdsResolved,
            shippingAddress1: req.body.shippingAddress1,
            shippingAddress2: req.body.shippingAddress2,
            city: req.body.city,
            zip: req.body.zip,
            country: req.body.country,
            phone: req.body.phone,
            // status: req.body.status,
            totalPrice: req.body.totalPrice,
            user: req.body.user
        })
        await orders.save()
        if (!orders) {
            res.status(400).json({ message: "order cannot be created" })
        }
        res.status(200).json({ message: "order created sucessfully", orders })
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong", err });
        console.log(err)
    }
}

const getOrder = async (req, res) => {
    console.log(res,'res')
    // try {
        // console.log(res)
        if( !mongoose.Types.ObjectId.isValid(id) ) return false;
        const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});

        if(!orderList) {
            res.status(500).json({success: false})
        } 
        res.send(orderList);
    // }
    // catch (err) {
    //     res.status(400).json({ message: "Something went wrong", err });
    //     console.log(err) 
    // }
}


module.exports = {
    order: order,
    getOrder:getOrder
}