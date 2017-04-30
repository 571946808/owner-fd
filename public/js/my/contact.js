angular.module('sunApp').controller('contactController', function ($scope, $rootScope, $http,$httpParamSerializer,$state) { 
    $rootScope.pageTitle = "联系我们";
    $rootScope.hasHeader = true;
    $rootScope.hasFooter = true;
});