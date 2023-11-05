const Category = require('../models/categoryModel');
const asynchandler = require("express-async-handler");


exports.create_category = asynchandler(async(req, res, next)=> {

    const categorydata = req.body
    try{

        const category = new Category(categorydata);
        category.save();
        res.status(201).send(category)

    } catch (error){
        res.status(400).send(error)
    }
});



exports.get_all_categories = asynchandler(async(req, res, next)=> {

    try{
        const categories = await Category.find({});
        res.status(201).send(categories)

    } catch (error){
        res.status(400).send(error)
    }
});
