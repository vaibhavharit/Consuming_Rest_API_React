module.exports = function(app) {

	var companies = require('../controllers/companies.controller.js')
	
	app.get('/companies/init', companies.init);

	// Create a new Company
    app.post('/companies', companies.create);

    // Retrieve all Companies
    app.get('/companies', companies.findAll);

    //Retrieve a single Company with companyId
    app.get('/companies/:companyId', companies.findOne);

    // Update a Company with companyId
    app.put('/companies/:companyId', companies.update);

	//Delete a Company with companyId
	app.delete('/companies/:companyId', companies.delete);
}