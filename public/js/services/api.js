app.factory('api',['$http', function($http){
  return function(met, uri, body, token, callback){
	  	$http({
		    method: met,
		    url: '/api/' + uri,
		    data: body,
		    headers: {
		    	'Content-Type': 'application/json',
		    	'Authorization': 'Bearer ' + token
		    }
			})
			.success(function(data){
	    	callback(null, data);
	    })
	    .error(function(err){
	    	callback(err);
	    });
	}
}]);