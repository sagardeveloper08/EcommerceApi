const mongoose = require('mongoose');

const orderItemSchemma = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})

orderItemSchemma.virtual('id').get(function () {
    return this._id.toHexString();
})

orderItemSchemma.set('toJSON', {
    virtuals: true
})

module.exports.OrderItem = mongoose.model('OrderItem', orderItemSchemma)