const Cart = require('../models/cart');
const Product = require('../models/product');
const asynchandler = require("express-async-handler");



exports.get_Cart = asynchandler(async(req, res, next)=> {

    const user = req.user._id
    try{
        const cart = await Cart.findOne({user})
        if (cart && cart.products.length > 0) {
            res.status(200).send(cart);
       } else {
             res.send(null);
       }
    } catch (error){
        res.status(500).send()
    }

});

exports.create_Cart = asynchandler(async(req, res, next)=> {

    const user = req.user._id
    const { productId, quantity } = req.body;

    try {
        const cart = await Cart.findOne({user});
        const product = await Product.findOne({_id : productId})

        if (!product) {
            res.status(404).send({ message: "product not found" });
            return;
        }  
            const price = product.price;
            const name = product.name;

        if (cart) {
            const productIndex = cart.products.findIndex((product) => product.productId === productId);

            if(productIndex > -1){
                let product = cart.products[productIndex];
                product.quantity += quantity
                cart.bill = cart.products.reduce((acc, curr) => {
                    return acc + curr.quantity * curr.price;
                },0)
                cart.products[productIndex] = product;
                await cart.save();
                res.status(200).send(cart);
            } else {
                cart.products.push({ productId, name, quantity, price });
                cart.bill = cart.products.reduce((acc, curr) => { return acc + curr.quantity * curr.price;},0)  
                await cart.save();
                res.status(200).send(cart);
            }
        } else {
            const newCart = await Cart.create({
                user,
                products: [{ productId, name, quantity, price }],
                bill: quantity * price,
            });
            return res.status(201).send(newCart);
        }
    } catch(error){
        console.log(error);
        res.status(500).send("something went wrong");
    }

});

exports.delete_Product_In_Cart = asynchandler(async(req, res, next) => {
    const user = req.user._id
    const productId = req.query.productId

    try{
        const cart = await Cart.findOne({user});
        const productIndex = cart.products.findIndex((product) => product.productId === productId);
        if(productIndex > -1){
            let item = cart.products[productIndex]
            cart.bill -= item.quantity * item.price;
            if(cart.bill < 0) {
                cart.bill = 0
            }
            cart.products.splice(productIndex, 1);
            cart.bill = cart.products.reduce((acc, curr) => {
               return acc + curr.quantity * curr.price;
            },0)

            cart = await cart.save();
            res.status(200).send(cart);
        } else {
            res.status(404).send("product not found");
        }

    } catch (error){
        console.log(error);
        res.status(400).send();
    }

})