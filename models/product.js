const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    owner : {
        type:  mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    title : {
        type : String,
        required : true,
    },
    description: {
        type: String,
        required: true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Category', 
        required: true
    },
    quantity : {
        type : Number, 
        required : true
    }
}, {timestamps : true});


module.exports = mongoose.model('Product', productSchema);