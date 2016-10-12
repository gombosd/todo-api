app.controller('HomeController', [ 'todolist', '$scope', function( todolist, $scope){
	$scope.ptodo = ""
	$scope.todos = []
	$scope.todos.push(todolist())
	var token = ""

	$scope.plustodo = function(){
		console.log($scope.todos)
		if ($scope.ptodo) {
			$scope.todos.push({
				title: this.ptodo
			})
			$scope.ptodo = ""
		}
	}
}]);