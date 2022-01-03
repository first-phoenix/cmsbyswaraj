const Product = require('../models/productModel');



// create product -- Admin

exports.createProduct = async (req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
}



//Gert All Products
exports.getAllProducts = async(req, res) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    });
}

//update product -- Admin

exports.updateProduct = async (req, res, next) => {
    let product = Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: 'product not found'
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        product
    });
}