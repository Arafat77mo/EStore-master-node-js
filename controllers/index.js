var express = require('express');
var router = express.Router();
var index = require.main.require('./models/index');
var dashboardModel = require.main.require('./models/admindashboard-model');
var index = require.main.require('./models/index')

// Request Handler

router.all('/', function (req, res) {
	dashboardModel.productlist(function (result) {
		if (result && result != null) {
			res.render('./index/index', {
				result: result
			});
		} else {
			res.render('./error/error');
		}
	});
});



router.all('/productdetails/:id?', function (req, res) {
	var data = {
		id: req.params.id
	};
	index.productdetails(data, function (result) {
		if (result && result != null) {
			res.render('./index/productdetails', {
				result: result
			});
		} else {
			res.render('./error/error');
		}
	});
});

router.post('/search', function (req, res) {
	var data = {
		productname: req.body.search
	};
	index.searchproduct(data, function (result) {
		if (result && result != null) {
			res.render('./index/index', {
				result: result
			});
		} else {
			res.render('./index/index', {
				errorMessage: {
					message: 'Opps....No Search Result Found.'
				}
			});
		}
	});
});

router.get('/catagorysearch/:catagory?', function (req, res) {
	var data = {
		catagory: req.params.catagory
	};
	console.log(req.params.catagoryname);
	index.searchproductcatagory(data, function (result) {
		if (result && result != null) {
			res.render('./index/index', {
				result: result
			});
		} else {
			res.render('./index/index', {
				errorMessage: {
					message: 'Opps....No Search Result Found.'
				}
			});
		}
	});
});

//Exports

module.exports = router;