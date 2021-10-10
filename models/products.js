const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
   name:{
       type:String,
       require:true
   },
   description:{
       type:String,
       require:true
   },
   richDescription:{
       type:String,
       default:""
   },
   image:{
       type:String,
       default:''
   },
   images:[{
       type:String,
   }],
   brand:{
       type:String
   },
   price:{
       type:Number
   },
   category:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'Category'
   },
   countInStock:{
       type:Number,
       require:true
   },
   rating:{
       type:Number,
       min:0
   },
   numReviews:{
       type:Number
   },
   isFeatured:{
       type:Boolean,
       default:false
   },
   dateCreated:{
       type:Date,
       default:Date.now
   }
})

productSchema.virtual('id').get(function(){
    return this._id.toHexString();
})

productSchema.set('toJSON',{
    virtuals:true
})

module.exports.Product = mongoose.model('Product', productSchema)