const Product = require('../models/productModel');
const ErrorHander = require('../utils/errorhander');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require('../utils/apifeatures');



// create product -- Admin

exports.createProduct = catchAsyncErrors(
  async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});



//Gert All Products
exports.getAllProducts = catchAsyncErrors(async(req, res) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();


  const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage);

  const products = await apiFeature.query;

    res.status(200).json({
        success: true,
        products,
        productsCount
    });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
        // return res.status(500).json({
        //     success: false,
        //     message: "Product not found"
        // })
    }
  
    res.status(200).json({
      success: true,
      product,
    });
  });


// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
  
    if (!product) {
      return next(new ErrorHander("Product not found", 404));
    }
  
    // Images Start Here
    // let images = [];
  
    // if (typeof req.body.images === "string") {
    //   images.push(req.body.images);
    // } else {
    //   images = req.body.images;
    // }
  
    // if (images !== undefined) {
    //   // Deleting Images From Cloudinary
    //   for (let i = 0; i < product.images.length; i++) {
    //     await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    //   }
  
    //   const imagesLinks = [];
  
    //   for (let i = 0; i < images.length; i++) {
    //     const result = await cloudinary.v2.uploader.upload(images[i], {
    //       folder: "products",
    //     });
  
    //     imagesLinks.push({
    //       public_id: result.public_id,
    //       url: result.secure_url,
    //     });
    //   }
  
    //   req.body.images = imagesLinks;
    // }
  
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    res.status(200).json({
      success: true,
      product,
    });
  });


// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
  
    if (!product) {
    //   return next(new ErrorHander("Product not found", 404));
        return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
    }
  
    // Deleting Images From Cloudinary
    // for (let i = 0; i < product.images.length; i++) {
    //   await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    // }
  
    await product.remove();
  
    res.status(200).json({
      success: true,
      message: "Product Delete Successfully",
    });
  });