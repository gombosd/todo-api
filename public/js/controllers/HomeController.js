app.controller('HomeController', ['api', '$window','$scope', function(api, $window, $scope){
	$scope.ptodo = ""
	$scope.todos = []
	$scope.needtodos = []	
	$scope.donetodos = []	
	$scope.token = localStorage.getItem('token')
	$scope.name = localStorage.getItem('name')

	var sort = function(){
		if ($scope.todos.length > 0) {
			for (var i = $scope.todos.length - 1; i >= 0; i--) {
				if ($scope.todos[i].completed) {
					$scope.donetodos.push($scope.todos[i]);
				}
				else {
					$scope.needtodos.push($scope.todos[i]);
				}
			}
		}
	}

	var gettodos = function(){
		api('GET', 'todos', '', $scope.token, function(err, data){
			$scope.todos = data;
			$scope.needtodos = []	
			$scope.donetodos = []
			sort();
		});
	}

	if (!$scope.token) {
		return $window.location.href = '#/'
	}
	else {
		$window.location.href = '#/home'
		gettodos();
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
				gettodos();
			});

			$scope.ptodo = ""
		}
	}

	$scope.needdel = function($index){
		var id = $scope.needtodos[$index]._id

		api('DELETE', 'todos/' + id, {
				title: this.ptodo
			}, $scope.token, function(err, data){
				delete $scope.todos[$index];
				gettodos();
				console.log(data)
		});
	}

	$scope.needdone = function($index){
		var id = $scope.needtodos[$index]._id

		api('PUT', 'todos/' + id, {
				completed: true
			}, $scope.token, function(err, data){
				gettodos();
				console.log(data)
		});
	}

	$scope.donedel = function($index){
		var id = $scope.donetodos[$index]._id

		api('DELETE', 'todos/' + id, {
				title: this.ptodo
			}, $scope.token, function(err, data){
				delete $scope.todos[$index];
				gettodos();
				console.log(data)
		});
	}

	$scope.donedone = function($index){
		var id = $scope.donetodos[$index]._id

		api('PUT', 'todos/' + id, {
				completed: true
			}, $scope.token, function(err, data){
				gettodos();
				console.log(data)
		});
	}
}]);