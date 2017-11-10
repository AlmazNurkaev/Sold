'use strict';

/* Controllers */
var soldcatApp = angular.module('soldcatApp', ['ngRoute', 'ngResource']);

/* Config */
soldcatApp.config([
    '$routeProvider', '$locationProvider',
    function($routeProvide){
        $routeProvide
            .when('/',{
                templateUrl:'template/home.html',
                controller:'StatusListCtrl'
            })
            .when('/name/:name',{
                templateUrl:'template/name.html',
                controller:'NameCtrl'
            })
            .when('/statuses/:soldcoId', {
                templateUrl: 'template/status-detail.html',
                controller: 'StatusDetailCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);

/* Factory statusDetail */
soldcatApp.factory('component', [
    '$resource', function($resource) {
        return $resource('statuses/statuses.:format', {
            statusId: 'soldcoId',
            format: 'json',
            apiKey: 'someKeyThis'
        }, {
        });
    }
]);

soldcatApp.controller('StatusListCtrl',[
    '$scope','$http', '$location', 'component',
    function($scope, $http, $location, component) {
        component.query({soldcoId: 'statuses'}, function(data) {
            $scope.statuses = data; //  $scope.statuses = data;
            $http.get('/statuses/flatx_data.json').success(function(f_data) {
                $scope.flatexes = f_data;
            });

        });
    }
]);


/* Detail Controller */
soldcatApp.controller('StatusDetailCtrl',[
    '$scope','$http', '$location', '$routeParams', 'component',
    function($scope, $http, $location, $routeParams, component) {
        //$http.get('statuses/statuses.json').success(function(data) {
            //$scope.statuses = data;
        // });
        //SoldcoID
        $scope.soldcoId = $routeParams.soldcoId;
        var soldcoId = Number($routeParams.soldcoId);
        $scope.nameId = _.findWhere(component, { id: soldcoId });

    }
]);

soldcatApp.controller('NameCtrl',[
    '$scope','$http', '$location', '$routeParams', 'component',
    function($scope, $http, $location, $routeParams, component) {
//NameID
        $scope.name = $routeParams.name;
        var name = Number($routeParams.name);
        $scope.nameId = _.findWhere(component, { name: name });


    }
]);
