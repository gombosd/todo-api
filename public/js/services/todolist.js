app.factory('todolist',['$http',function($http){
  return function(lat, long, callback, rad){
	  	$http.get('')
	    .success(function(data){
	    	callback(data)
	    })
	    .error(function(err){
	    	callback(err)
	    });
	}
}]);