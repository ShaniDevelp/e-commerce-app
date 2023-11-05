#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Product = require("./models/product");
  
  const Products = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createProduct();
    await createInventory();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  // We pass the index to the ...Create functions so that, for example,
  // genre[0] will always be the Fantasy genre, regardless of the order
  // in which the elements of promise.all's argument complete.
  async function productCreate(index, name, description) {
    const categorydetail = {
        name: name,
        description: description,
      };
    const category = new Category(categorydetail);
    await category.save();
    Categories[index] = category;
    console.log(`Added category: ${name}`);
  }
  
  async function inventoryCreate(index, name, description, price, stock_Number, category) {
    const inventorydetail = { 
        inventory_name: name, 
        inventory_description: description,
        inventory_category : category,
        inventory_price : price,
        number_In_Stock : stock_Number

     };
  
    const inventory = new Inventory(inventorydetail);
  
    await inventory.save();
    Inventories[index] = inventory;
    console.log(`Added Inventory: ${name}`);
  }
  
  
  async function createProduct() {
    console.log("Adding categories");
    await Promise.all([
      productCreate(0, "Luxury", "These are luxury brands"),
      productCreate(1, "Medium", "These are Medium Brands"),
      productCreate(2, "Low Price", "These are Lower price Brands"),
    ]);
  }
  
  async function createInventory() {
    console.log("Adding Inventories");
    await Promise.all([
      inventoryCreate(0, 
        "Louis Vitton", "RLouis Vuitton bag can elevate your wardrobe. From leather wallets to larger totes, the instantly recognizable Louis Vuitton handbags are",
        120000,20, Categories[0]),
      inventoryCreate(0, 
        "Gucci", "RLouis Vuitton bag can elevate your wardrobe. From leather wallets to larger totes, the instantly recognizable Louis Vuitton handbags are",
        50000,50, Categories[1]),
      inventoryCreate(0, 
        "Dior", "RLouis Vuitton bag can elevate your wardrobe. From leather wallets to larger totes, the instantly recognizable Louis Vuitton handbags are",
        80000,100, Categories[1]),
      inventoryCreate(0, 
        "Marc Jaccobs", "RLouis Vuitton bag can elevate your wardrobe. From leather wallets to larger totes, the instantly recognizable Louis Vuitton handbags are",
        140000,70, Categories[0]), 
      inventoryCreate(0, 
        "Marc Jaccobs", "RLouis Vuitton bag can elevate your wardrobe. From leather wallets to larger totes, the instantly recognizable Louis Vuitton handbags are",
        20000,55, Categories[2]),  
    ]);
  }
  