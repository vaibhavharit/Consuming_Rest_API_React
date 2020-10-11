module.exports = function(app) {
    var products = require('../controllers/products.controller.js');
		
	// Find all Products of a Company
    app.get('/products/company/:companyId', products.findByCompanyId);

    //Create a new Product
    app.post('/products', products.create);

    // Retrieve all products
    app.get('/products', products.findAll);

    // Find a single Product by Name
    app.get('/products/:productName', products.findByName);

    //Update a Product with productId
    app.put('/products/:productId', products.update);

    // Delete a Note with productId
    app.delete('/products/:productId', products.delete);
}