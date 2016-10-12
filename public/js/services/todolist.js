app.factory('todolist',['$http',function($http){
  return function(token, callback){
	  	$http.get('http://localhost:3000/api/todos', {
		    headers: {
		        "Authorization": 'Token token='+token
		    }
		})
	    .success(function(data){
	    	callback(data)
	    })
	    .error(function(err){
	    	callback(err)
	    });
	}
}]);