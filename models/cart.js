const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const cartSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'User', 
        required: true
    },
    products : [{
        productId : {
            type : mongoose.Schema.Types.ObjectId, 
            ref : 'Product', 
            required: true
        },
        name : {
            type : String,
        },
        quantity : {
            type : Number, 
            required : true,
            dedault : 1,
            min : 1
        },
        price : Number  
    }],
    bill : {
        type : Number, 
        required : true,
        default : 0
    },
   
}, {timestamps : true});


module.exports = mongoose.model('Cart', cartSchema);