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
    discountprice: {
        type: Number,
        // required : true
    },
    stock: {
        type: Number,
        // required : true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: "Category",
        // required: true
    },
    thumbnailImage: {
        data: Buffer,
        contentType: String
    },
    image1: {
        data: Buffer,
        contentType: String
    },
    image2: {
        data: Buffer,
        contentType: String
},
    image3: {
        data: Buffer,
        contentType: String
    }
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);