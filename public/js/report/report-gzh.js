angular.module('sunApp').controller('reportGzhController', function ($scope, $rootScope, $http,$httpParamSerializer,$state) { 
    $rootScope.pageTitle = "吐槽公众号";
    $rootScope.hasHeader = true;
    $rootScope.hasFooter = true;

    $scope.submit = function(){
        var param = {
            comment: $scope.comment
        };
        $http({
            method: 'POST',
            // url: 'mock/common.json',
            url: api_Data.Report.commentgzh,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            data: $httpParamSerializer(param)
        }).then(function successCallback(response){
            if(response.data.code == 0){
                layer.open({
                    content: '留言成功',
                    skin: 'msg',
                    time: 2 
                });
                $state.go('report');
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