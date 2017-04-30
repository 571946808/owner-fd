angular.module('sunApp').controller('sendController', function ($scope, $rootScope, $http,$httpParamSerializer,$state) { 
    $rootScope.pageTitle = "发布帖子";
    $rootScope.hasHeader = false;
    $rootScope.hasFooter = true;

    $scope.submit = function(){
        var param = {
            send: $scope.send
        };
        $http({
            method: 'POST',
            // url: 'mock/common.json',
            url: api_Data.Neighbor.send,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            data: $httpParamSerializer(param)
        }).then(function successCallback(response){
            if(response.data.code == 0){
                layer.open({
                    content: '发布成功',
                    skin: 'msg',
                    time: 2 
                });
                $state.go('neighbor');
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