app.controller('HomeController', ['api', '$window','$scope', function(api, $window, $scope){
	$scope.ptodo = ""
	$scope.todos = []
	$scope.name = ''
	if (localStorage.getItem('name')) {
		$scope.name = localStorage.getItem('name')
	}	
	$scope.token = localStorage.getItem('token')

	var gettodos = function(){
		api('GET', 'todos', '', $scope.token, function(err, data){
			$scope.todos = data;
			console.log(data)
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
		console.log($scope.todos)
		if ($scope.ptodo) {
			$scope.todos.push({
				title: this.ptodo
			})

			api('POST', 'todos', {
				title: this.ptodo
			}, $scope.token, function(err, data){
				console.log(data)
			});

			$scope.ptodo = ""
		}
	}
}]);