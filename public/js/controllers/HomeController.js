app.controller('HomeController', ['$scope', function($scope){
	$scope.ptodo = ""
	$scope.todos = []
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