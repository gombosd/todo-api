app.controller('HomeController', ['todolist', '$scope', function(todolist, $scope){
	$scope.ptodo = ""
	$scope.todos = [
		{
			title: "Elso tennivalom"
		},
		{
			title: "Masik tennivalom" 
		},
		{
			title: "Megy egy tennivalo"
		},
		{
			title: "Lol meg mindig van"
		},
		{
			title: "Na ennyi eleg mara"
		}
	];

	$scope.plustodo = function(){
		if ($scope.ptodo) {
			$scope.todos.push({
				title: this.ptodo
			})
			$scope.ptodo = ""
		}
	}
}]);