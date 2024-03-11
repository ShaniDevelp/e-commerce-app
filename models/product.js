const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = new Schema({
    title: {
        type: String,
        // required : true,
    },
    brand: {
        type: String,
        // required : true,
    },
    description: {
        type: String,
        // required: true
    },
    rating: {
        type: Number,
        // required: true
    },
    price: {
        type: Number,
        // required : true
    },
    discountPercentage: {
        type: Number,
        // required : true
    },
    stock: {
        type: Number,
        // required : true
    },
    category: {
        type: String,
        // required: true
    },
    thumbnailImage: {
        type: String,
    },
    image1: {
        type: String,
    },
    image2: {
        type: String,
},
    image3: {
        type: String,
    }
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);