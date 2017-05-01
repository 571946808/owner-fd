angular.module('sunApp').controller('moneyDetailController', function ($scope, $rootScope, $http,$httpParamSerializer,$state,$location) { 
    //头部title
    $rootScope.pageTitle = "缴费专区";
    $rootScope.hasHeader = false;
    $rootScope.hasFooter = true;

    $scope.load = function(){
        var formData = {
            type: $location.search().id
        };
        $http({
            method:'POST',
            url: api_Data.MainTain.getMoneyDetail,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            data: $httpParamSerializer(formData)
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