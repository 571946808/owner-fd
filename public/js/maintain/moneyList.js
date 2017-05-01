angular.module('sunApp').controller('moneyListController', function ($scope, $rootScope, $http,$httpParamSerializer,$state) { 
    //头部title
    $rootScope.pageTitle = "缴费账单";
    $rootScope.hasHeader = false;
    $rootScope.hasFooter = true;

    $scope.load = function(){
        $http({
            method:'POST',
            url: api_Data.MainTain.getMoneyList,
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