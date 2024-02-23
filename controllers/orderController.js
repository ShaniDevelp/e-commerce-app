const Order = require('../models/order');
const asynchandler = require("express-async-handler");


exports.create_Order = asynchandler(async(req, res, next) => {

    console.log(req.body)
   try{
    const order = new Order(req.body)
    await order.save()
    res.status(200).send(order)

   } catch(error){
    res.status(400).send(error)
   }
});

exports.get_User_Orders = asynchandler(async(req, res, next) => {
    const userId = req.params.id;

    try{
        const orders = await Order.find({userId});
        if(!orders){
            res.status(301).send("couldn't find any user order");
        }
        res.status(200).send(orders);

    } catch(error ){
    
        res.status(400).send(error)
    }
});

exports.get_All_Orders = asynchandler(async(req, res, next) => {
    
    try{
        const orders = await Order.find();
        res.status(200).send(orders);
    } catch(error){
        res.status(400).send(error);
    }
});

exports.update_Order = asynchandler(async(req, res, next) => {
    const orderId = req.body.id
    const update = req.body.update
    try{
        const order = await Order.findByIdAndUpdate(orderId, update, {new: true});
        res.status(200).send(order)
    } catch(error){
        res.status(400).send(error);
    }
});


exports.delete_Order = asynchandler(async(req, res, next) => {
    return req
});



