const mongoose = require('mongoose');
const { Schema } = mongoose;

const userAddressSchema = new Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true},
    pnone: {type: Number, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    address: {type: String, required: true},
    info: {type: String},
});

module.exports = mongoose.model('Address', userAddressSchema);