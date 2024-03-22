const Order = require('../models/order');
const asynchandler = require("express-async-handler");


exports.create_Order = asynchandler(async (req, res, next) => {
    const userId = req.user._id;
    const orderData = { ...req.body, userId }
    console.log(orderData)
       try{
        const order = new Order(orderData)
        await order.save()
        res.status(200).send(order)

       } catch(error){
        res.status(400).send(error)
       }
});

exports.get_User_Orders = asynchandler(async (req, res, next) => {
    const userId = req.user._id;

    try {
        const orders = await Order.find({ userId });
        if (!orders) {
            res.status(301).send("couldn't find any user order");
        }
        res.status(200).send(orders);

    } catch (error) {

        res.status(400).send(error)
    }
});

exports.get_All_Orders = asynchandler(async (req, res, next) => {

    try {
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch (error) {
        res.status(400).send(error);
    }
});

exports.update_Order = asynchandler(async (req, res, next) => {
    const orderId = req.params.id
    const update = req.body
    try {
        const order = await Order.findByIdAndUpdate(orderId, update, { new: true });
        res.status(200).send(order)
    } catch (error) {
        res.status(400).send(error);
    }
});

exports.delete_Order = asynchandler(async (req, res, next) => {
    return req
});



