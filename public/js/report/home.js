angular.module('sunApp').controller('reportHomeController', function ($scope, $rootScope, $http,$httpParamSerializer,$state) { 
    $rootScope.pageTitle = "意见反馈";
    $rootScope.hasHeader = true;
    $rootScope.hasFooter = true;
});