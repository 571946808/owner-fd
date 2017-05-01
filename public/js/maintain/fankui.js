angular.module('sunApp').controller('fankuiController', function ($scope, $rootScope, $http,$httpParamSerializer,$state,$location) { 
    $rootScope.pageTitle = "我要反馈";
    $rootScope.hasHeader = false;
    $rootScope.hasFooter = true;

    $scope.submit = function(){
        var param = {
            id: $location.search().id,
            send: $scope.send
        };
        $http({
            method: 'POST',
            // url: 'mock/common.json',
            url: api_Data.MainTain.sendFankui,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            data: $httpParamSerializer(param)
        }).then(function successCallback(response){
            if(response.data.code == 0){
                layer.open({
                    content: '发送成功',
                    skin: 'msg',
                    time: 2 
                });
                history.back();
            }else{
                layer.open({
                    content: response.data.errMsg,
                    skin: 'msg',
                    time: 2 
                });
            }
        }, function errorCallback(response){
            console.log(response.data);
        });
    }
});