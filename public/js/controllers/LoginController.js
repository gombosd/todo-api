app.controller('LoginController', ['api', '$scope', '$window', function(api, $scope, $window){
	var resp = {}
	$scope.login = function(){
		if ($scope.email && $scope.password) {
			api('POST', 'auth/login', {
				email: this.email,
				password: this.password
			}, $scope.token, function(err, data){
				resp = data;
				console.log(resp)
				if (resp.token) {
					localStorage.setItem('token', resp.token);
					localStorage.setItem('name', resp.payload.name);
					$window.location.href = '#/home';
				}
				else {
					$scope.message = resp.message;
				}								
			})

			$scope.password = ""
			$scope.email = ""			
		}
		else {
			$scope.message = "Please fill both field!"
			$scope.password = ""
			$scope.email = ""
		}
	}
}]);
