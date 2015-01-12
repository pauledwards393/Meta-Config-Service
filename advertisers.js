
// Dependencies
var express = require('express');
var router = express.Router();

var dbProvider = require('./databaseProvider');

// Get all advertisers
var getAdvertisers = function(callback, res) {
	dbProvider.findAll('advertisers', function(err, collection) {
		if (err)
			res.send(err);

		res.json(callback(collection));
	});
};

// Routes
router
	.get('/', function(req, res) {
		getAdvertisers(
			function(collection) {
				return collection.length;
			}, res
		);
	})
	.get('/:search', function(req, res) {
		getAdvertisers(
			function(collection) {

				var searchTerm = decodeURI(req.params.search.toLowerCase());

				var filteredAdvertisers = collection.filter(function(element) {
					return element.Brands.some(function(brand) {
						return brand.Inventories.some(function(inventory) {
							return inventory.Name.toLowerCase().indexOf(searchTerm) >= 0;
						});
					});
				});

				return filteredAdvertisers.map(function(advertiser) {
					return {
						id: advertiser._id,
						name: advertiser.Name
					};
				}).sort(function (a, b) {
					return a.name.localeCompare(b.name);
				})
			}, res
		);
	})
	.get('/filter/:n', function(req, res) {
		getAdvertisers(function(collection) {

			return collection.filter(function(element, index) {
				return index % req.params.n === 0 && element.Brands.length > 0;
			})
			.map(function(advertiser) {
				return advertiser.Brands.map(function(brand) {
					return {
						advertiser: advertiser.Name,
						brand: brand.Name
					}
				});
			})
			.reduce(function(a, b) {
				return a.concat(b);
			})
			.sort(function(a, b) {
				if (a.advertiser !== b.advertiser)
					return a.advertiser.localeCompare(b.advertiser);

				return a.brand.localeCompare(b.brand);
			});

		}, res);
	});

// Return router
module.exports = router;
