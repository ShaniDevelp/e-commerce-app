const Product = require('../models/product');

const asynchandler = require("express-async-handler");


exports.get_All_Products = asynchandler(async (req, res, next) => {
    try{
        const products = await Product.find({});
        res.status(202).send(products)
    } catch (error) {
        res.status(400).send(error)
    }
});


exports.get_One_Product = asynchandler(async (req, res, next) => {
    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            res.status(404).send({error : "product not found"})
        }
        res.status(200).send(product)
    } catch (error) {
        res.status(400).send(error)
    }
});


exports.create_Product = asynchandler(async(req, res, next)=> {

    console.log(req.body)
    try{

        const product = new Product(req.body);
        await product.save();
        res.status(201).send(product)
    } catch (error) {
        res.status(400).send({message : "error"})
    }
    // owner: req.user._id
    // ...req.body, owner: req.user._id
});

exports.update_Product = asynchandler(async(req, res, next)=> {
    
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'price', 'category', 'quantity' ]
    const isValidOperation = updates.every((update) =>  allowedUpdates.includes(update));
    if(!isValidOperation){
        return res.status(400).send({error : "invalid Updates"})
    }

    try{
        const product = await Product.findById(req.params.id);
        if(!product){
            res.status(400).send(error)
        }
        updates.forEach((update) => product[update] = req.body[update])
        await product.save();
        res.send(product)
    } catch (error){
        res.status(400).send({message : "error"})   
    }

});

exports.delete_Product = asynchandler(async(req, res, next) => {
    try{
        const deletedproduct = await Product.findByIdAndDelete(req.params.id);
        if(!deletedproduct){
            res.status(400).send(error)
        }
        res.status(201).send(deletedproduct)
    } catch (error) {
        res.status.send(error)
    }
});