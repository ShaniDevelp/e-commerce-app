const Product = require("../models/product");
// const multer = require('multer');
const fs = require("fs");

const asynchandler = require("express-async-handler");

exports.get_All_Products = asynchandler(async (req, res, next) => {
  console.log(req.query.category);
  let query = Product.find({});

  if (req.query.category) {
    query = query.find({ category: req.query.category });
  }
  if (req.query._limit && req.query._page) {
    const pageSize = req.query._limit;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
  }
  try {
    const products = await query.exec();
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
  console.log(req.body);
  try {
    const {
      title,
      brand,
      description,
      rating,
      price,
      discountPercentage,
      stock,
      category,
    } = req.body;

    let thumbnailImage = null;
    let image1 = null;
    let image2 = null;
    let image3 = null;
    let images = [];

    // Check if thumbnail exists in request
    if (req.files && req.files.thumbnailImage) {
      const thumbnailData = req.files.thumbnailImage[0];
      thumbnailImage = {
        data: fs.readFileSync(thumbnailData.path),
        contentType: thumbnailData.mimetype,
      };
      fs.unlinkSync(thumbnailData.path); // Remove temporary thumbnail file
    }

    if (req.files && req.files.image1) {
      const image1Data = req.files.image1[0];
      image1 = {
        data: fs.readFileSync(image1Data.path),
        contentType: image1Data.mimetype,
      };
      fs.unlinkSync(image1Data.path); // Remove temporary thumbnail file
    }

    if (req.files && req.files.image2) {
      const image2Data = req.files.image2[0];
      image2 = {
        data: fs.readFileSync(image2Data.path),
        contentType: image2Data.mimetype,
      };
      fs.unlinkSync(image2Data.path); // Remove temporary thumbnail file
    }

    if (req.files && req.files.image3) {
      const image3Data = req.files.image3[0];
      image3 = {
        data: fs.readFileSync(image3Data.path),
        contentType: image3Data.mimetype,
      };
      fs.unlinkSync(image3Data.path); // Remove temporary thumbnail file
    }

    // Check if images exist in request
    if (req.files && req.files.images) {
      images = req.files.images.map((image) => ({
        data: fs.readFileSync(image.path),
        contentType: image.mimetype,
      }));
      req.files.images.forEach((image) => fs.unlinkSync(image.path)); // Remove temporary image files
    }

    // Create new product with extracted data
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
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).send({ message: "Error creating product" });
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

// owner: req.user._id
// ...req.body, owner: req.user._id
