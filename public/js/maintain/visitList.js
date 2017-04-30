angular.module('sunApp').controller('visitListController', function ($scope, $rootScope, $http,$httpParamSerializer,$state) { 
    //头部title
    $rootScope.pageTitle = "访客授权列表";
    $rootScope.hasHeader = false;
    $rootScope.hasFooter = true;

    $scope.load = function(){
        $http({
            method:'POST',
            url: api_Data.MainTain.getVisitList,
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