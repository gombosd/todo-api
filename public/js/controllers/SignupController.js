app.controller('SignupController', ['api', '$scope', '$window', function(api, $scope, $window){
	var resp = {}

	var validmail = function (email) {
	  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	  return re.test(email);
	}


	$scope.signup = function(){
		console.log(validmail(this.email))
		if ($scope.email && $scope.password && $scope.name && $scope.repassword) {
			if (validmail(this.email)) {
				if (this.password.length >= 6) {
					if(this.password === this.repassword){
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
						$scope.repassword = ""
						$scope.name = ""
						$window.location.href = '#/login'
					}
					else {
						$scope.message = "The given passwords are not matching!"
					}
				}
				else {
					$scope.message = "The password are not long enough!"
				}
			}
			else {
				$scope.message = "Please give us your real email adress!"
			}			
		}
		else {
			$scope.message = "Please fill all the fields!"
		}
	}
}]);
