const mongoose = require('mongoose');
const { Schema } = mongoose;

const userAddressSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: Number, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    street: {type: String, required: true},
    info: {type: String},
});

const orderSchema = new Schema({
    userId : {type : mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    products : {type : [Schema.Types.Mixed], required: true},
    status : {type : String, required: true},
    address : {type : userAddressSchema , required: true},
    paymentMethod: {type: String, required: true},
    bill: {type: String, required: true},
    totalItems: {type: Number, required: true}
}, {timestamps : true});

module.exports = mongoose.model('Order', orderSchema);