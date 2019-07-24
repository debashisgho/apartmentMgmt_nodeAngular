//authentication - check if loggedIn;
module.exports.checkAuth= function (request, response, next){
	console.log('inside middleware to check if Auth');
	//connect to Database
	var appConfig = require('../config/app.js');	
	//console.log(request.session.user);
	if(appConfig.authenticationEnabledAtServer =='true'){
		console.log('authentication is enabled');

		if(typeof request =='undefined' || (typeof request.session =='undefined' || request.session) || (typeof request.session.user =='undefined' || request.session.user)){
    	console.log('No session or user present');
		//response.redirect('/aptmgmt');
		response.json({status:401, message:"Please login to continue"});	
	}
	else{
		next();
	}

	}
	else{
		console.log('authentication is disabled');
		next();
	}
    
}
