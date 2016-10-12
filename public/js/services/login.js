app.factory('login',['$http', function($http){
  return function(body, callback){
	  	$http({
		    method: 'POST',
		    url: 'http://localhost:3000/api/auth/login',
		    data: body,
		    headers: {'Content-Type': 'application/json'}
			})
			.success(function(data){
	    	callback(data);
	    })
	    .error(function(err){
	    	callback(err);
	    });
	}
}]);