var app = angular.module("Todo", ['ngRoute']);

app.config(function ($routeProvider) { 
  $routeProvider 
    .when('/', { 
      controller: 'HomeController', 
      templateUrl: 'views/start.html' 
    })
    .when('/login', { 
      controller: 'LoginController', 
      templateUrl: 'views/login.html' 
    })
    .when('/signup', { 
      controller: 'SignupController', 
      templateUrl: 'views/signup.html' 
    })
    .when('/home', { 
      controller: 'HomeController', 
      templateUrl: 'views/home.html' 
    })
    .otherwise({ 
      redirectTo: '/' 
    }); 
});