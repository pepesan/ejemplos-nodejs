var app = angular.module("myApp", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl : "main.htm"
        })
        .when("/listado", {
            templateUrl : "list.htm"
        })

});

