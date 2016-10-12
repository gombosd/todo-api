app.factory('login',['$http',function($http){
  return function(callback){
	  	$http.get('http://localhost:3000/api/login')
	    .success(function(data){
	    	callback(data)
	    })
	    .error(function(err){
	    	callback(err)
	    });
	}
}]);