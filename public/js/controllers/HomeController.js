app.controller('HomeController', ['api', '$window','$scope', function(api, $window, $scope){
	$scope.ptodo = ""
	$scope.todos = []	
	$scope.token = localStorage.getItem('token')
	$scope.name = localStorage.getItem('name')

	var gettodos = function(){
		api('GET', 'todos', '', $scope.token, function(err, data){
			$scope.todos = data;
		});
	}

	if (!$scope.token) {
		return $window.location.href = '#/'
	}
	else {
		$window.location.href = '#/home'
		gettodos()
	}

	$scope.plustodo = function(){
		if ($scope.ptodo) {
			$scope.todos.push({
				title: this.ptodo
			})

			api('POST', 'todos', {
				title: this.ptodo
			}, $scope.token, function(err, data){
				console.log(data)
				api('GET', 'todos', '', $scope.token, function(err, data){
					$scope.todos = data;
				});
			});

			$scope.ptodo = ""
		}
	}

	$scope.del = function($index){
		var id = $scope.todos[$index]._id
		console.log($index)
		console.log(id)

		api('DELETE', 'todos/' + id, {
				title: this.ptodo
			}, $scope.token, function(err, data){
				delete $scope.todos[$index];
				api('GET', 'todos', '', $scope.token, function(err, data){
					$scope.todos = data;
				});
				console.log(data)
		});
	}
}]);