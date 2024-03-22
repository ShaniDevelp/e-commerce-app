const Product = require("../models/product");
const uploadImage = require('../utils/cloudinaryUpload')
const asynchandler = require("express-async-handler");

exports.get_All_Products = asynchandler(async (req, res, next) => {
  let query = Product.find({});
  let totalProductsQuery = Product.find({});

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalProductsQuery = totalProductsQuery.find({ category: req.query.category });
  }

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
    totalProductsQuery = totalProductsQuery.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalProductsQuery.count().exec();


  if (req.query._limit && req.query._page) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }


  try {
    const products = await query.exec();
    res.set('X-Total-Count', totalDocs)
    res.status(202).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

exports.get_One_Product = asynchandler(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).send({ error: "product not found" });
    }
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

exports.create_Product = asynchandler(async (req, res, next) => {

  let thumbnailImage = null;
  let image1 = null;
  let image2 = null;
  let image3 = null;

  if (req.files && req.files.thumbnailImage) {
    const path = req.files.thumbnailImage[0].path
    thumbnailImage = await uploadImage(path)

  }

  if (req.files && req.files.image1) {
    const path = req.files.image1[0].path
    image1 = await uploadImage(path)
  }

  if (req.files && req.files.image2) {
    const path = req.files.image2[0].path
    image2 = await uploadImage(path)

  }

  if (req.files && req.files.image3) {
    const path = req.files.image3[0].path
    image3 = await uploadImage(path)

  }

  try {


    const { title, brand, description, rating, price, discountPercentage, stock, category, } = req.body;

    const product = new Product({
      title,
      brand,
      description,
      rating,
      price,
      discountPercentage,
      stock,
      category,
      thumbnailImage,
      image1,
      image2,
      image3,
    });

    // Save product to database
    await product.save();

    res.status(201).send(product);

  } catch (err) {
    res.status(400).send(err)
  }
});

exports.update_Product = asynchandler(async (req, res, next) => {

  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "title",
    "rating",
    "description",
    "price",
    "stock",
    "discountPercentage",
    "category",
    "brand",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid Updates" });
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(400).send(error);
    }
    updates.forEach((update) => (product[update] = req.body[update]));
    if (req.files) {
      if (req.files.thumbnailImage) {
        const path = req.files.thumbnailImage[0].path
        product.thumbnailImage = await uploadImage(path)
      }
      if (req.files.image1) {
        const path = req.files.image1[0].path
        product.image1 = await uploadImage(path)
      }
      if (req.files.image2) {
        const path = req.files.image2[0].path
        product.image2 = await uploadImage(path)
      }
      if (req.files.image3) {
        const path = req.files.image3[0].path
        product.image3 = await uploadImage(path)
      }
    }
    await product.save();
    res.send(product);
  } catch (error) {
    res.status(400).send({ "message": error });
  }
});

exports.delete_Product = asynchandler(async (req, res, next) => {
  try {
    const deletedproduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedproduct) {
      res.status(400).send(error);
    }
    res.status(201).send(deletedproduct);
  } catch (error) {
    res.status.send(error);
  }
});
