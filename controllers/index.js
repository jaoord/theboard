(function (controllers) {
	
	var homeController = require('./homeController');
	var notesController = require('./notesController.js');

	controllers.init = function (app) {
		
		homeController.init(app);
		notesController.init(app);

	};

})(module.exports);