angular.module('sunApp').controller('neighborHomeController', function ($scope, $rootScope, $http,$httpParamSerializer,$state) { 
    $rootScope.hasHeader = false;
    $rootScope.hasFooter = true;

    $scope.load = function(){
        $http({
            method:'POST',
            url: api_Data.Neighbor.get,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response){
            if(response.data.code == 0){
                $scope.formData = response.data.obj;
            }else{
                $scope.formData = response.data.obj;
            }
        }, function errorCallback(response) {
            console.error('ajax失败');    
        });
    }
});