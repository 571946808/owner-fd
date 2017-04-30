angular.module('sunApp').controller('messageListController', function ($scope, $rootScope, $http,$httpParamSerializer,$state) { 
    $rootScope.pageTitle = "我的信息";
    $rootScope.hasHeader = true;
    $rootScope.hasFooter = true;

    $scope.load = function(){
        $http({
            method:'POST',
            url: api_Data.Neighbor.getList,
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