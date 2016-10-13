app.controller('SignupController', ['api', '$scope', '$window', function(api, $scope, $window){
	var resp = {}
	$scope.signup = function(){
		if ($scope.email && $scope.password && $scope.name) {
			api('POST', 'auth/signup', {
				email: this.email,
				password: this.password,
				name: this.name
			}, '', function(err, data){
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
			$window.location.href = '#/login'			
		}
	}
}]);
