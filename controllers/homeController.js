﻿// this contains the routes
(function (homeController) {
	var data = require('../data');

	homeController.init = function (app) {
		app.get("/", function (req, res) {
			
			data.getNoteCategories(function (err, results) {
				res.render("index", {
					title: "The Board", 
					error: err, 
					categories: results,
					newCatError: req.flash("newCatName"),
					user: req.user
				});
			});
		});

		app.post("/newCategory", function (req, res) {
			var categoryName = req.body.categoryName;

			data.createNewCategory(categoryName, function (err) {
				if (err) {
					console.log(err);
					req.flash("newCatName", err);
					res.redirect("/");
				} else {
					res.redirect("/notes/" + categoryName);
				}
			});
		});

		app.get('/notes/:categoryName', function (req, res) {
			var categoryName = req.params.categoryName;
			res.render('notes', { title: categoryName, user: req.user });
		});

	}; // init

})(module.exports); // anonieme functie die meteen wordt aangeroepen met module.exports als argument.
                    // homeController is nu dus eigenlijk hetzelfde als module.exports