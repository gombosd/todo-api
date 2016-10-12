app.controller('LoginController', ['login', '$scope', function(login, $scope){
	$scope.password = ""
	var token = ""

	$scope.login = function(){
		if ($scope.email && $scope.password) {
			login({
				email: this.email,
				password: this.password
			}, function(data){
				$scope.resp = data;
			})

			$scope.password = ""
			$scope.email = ""

			console.log('lol1')
			console.log($scope.message)
		}
	}
}]);
