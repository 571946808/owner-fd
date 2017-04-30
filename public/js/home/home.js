angular.module('sunApp').controller('homeHomeController', function ($scope,$rootScope,$http,$httpParamSerializer,$state) { 
    $rootScope.hasHeader = false;
    $rootScope.hasFooter = true;

    $scope.load1 = function(){

        $http({
            method:'POST',
            url: api_Data.Home.getInfo,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response){
            if(response.data.code == 0){
                $scope.formData1 = response.data.obj;
            }else{
                $scope.formData1 = response.data.obj;
            }
        }, function errorCallback(response) {
            console.error('ajax失败');    
        });
    }

    $scope.load2 = function(){

        $http({
            method:'POST',
            url: api_Data.Neighbor.getListLimt,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response){
            if(response.data.code == 0){
                $scope.formData2 = response.data.obj;
            }else{
                $scope.formData2 = response.data.obj;
            }
        }, function errorCallback(response) {
            console.error('ajax失败');    
        });
    }
});