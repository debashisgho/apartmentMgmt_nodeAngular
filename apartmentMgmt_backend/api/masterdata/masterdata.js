var express = require('express');
var router = express.Router();
var authMiddleware = require('../../middleware/authChecker.js');

MasterData = require('../../models/masterdata');

/*function requireLogIn(request, response, next){
	console.log('inside middleware to check if loggedIn');
	if(!request.session.user){
		console.log('user not logged in');
		//response.redirect('/aptmgmt');
		return false;
	}
	else{
		next();
	}
}*/

/*router.all('/aptmgmt/api/masterdata/*',function(req,res,next){
	console.log('inside router all');
	authMiddleware.checkAuth(req,res,next);
	console.log('going out of checkAuth()');
	next();   
});
*/

//get masterdata categories
router.get('/aptmgmt/api/masterdata/categories', authMiddleware.checkAuth, function(request, response){
	MasterData.getCategories(function(err,categories){
		console.log('starting get categories');
		console.log(categories);
		if(err){
			response.json(err);	
			return;
		}		
		response.json(categories);
	});
});

module.exports = router;