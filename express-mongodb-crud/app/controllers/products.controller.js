const Company = require('../models/company.model.js');
const Product = require('../models/product.model.js');


// SHOW ALL products
exports.findAll = (req, res) => {
	Product.find()
    .then(products => {
        res.send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Find a Products by Name
exports.findByName = (req, res) => {
	Product.findOne({ name: req.params.productName })
	.populate('company')
	.exec(function (err, product) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Products not found with given name " + req.params.productName
				});                
			}
			return res.status(500).send({
				message: "Error retrieving Products with given Company Id " + req.params.productName
			});
		}
					
		res.send(product);
	});
};

// Find all products by a CompanyId
exports.findByCompanyId = (req, res) => {
    Product.find({ company : req.params.companyId })
	.exec(function (err, products) {
		if (err){
			if(err.kind === 'ObjectId') {
				return res.status(404).send({
					message: "Products not found with given Company Id " + req.params.companyId
				});                
			}
			return res.status(500).send({
				message: "Error retrieving Products with given Company Id " + req.params.companyId
			});
		}
					
		res.send(products);
	});
};

//CREATE and save a new Product
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Product name can not be empty"
        });
    }

    // Create a Product
    const product = new Product({
        name: req.body.name || "Untitled Product", 
		code: req.body.code,
		details: req.body.details,
		companyId: req.body.company._id
    });

    // Save Product in the database
    product.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Product."
        });
    });
};


// DELETE a product with the specified productId in the request
exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send({message: "Product deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    });
};


//UPDATE Product data by ID
exports.update = (req, res) => {
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Product name can not be empty"
        });
    }

    // Find product and update it with the request body
    Product.findByIdAndUpdate(req.params.productId, {
        name: req.body.name || "Untitled Product", 
		code: req.body.code,
		details: req.body.details,
		companyId: req.body.company._id
    }, {new: true})
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        }
        res.send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });                
        }
        return res.status(500).send({
            message: "Error updating product with id " + req.params.productId
        });
    });
};
