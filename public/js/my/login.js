/*----------------------------------------------------------------
 * @Description:     登录
 * @Version:         1.0.0
 * @author:          jiangx(631724595@qq.com)
 * @date             2016.10.17
 * ==NOTES:=============================================
 * v1.0.0(2016.10.17):
 初始生成
 * ------------------------------------------------------------*/
angular.module('sunApp').controller('myLoginController', function($scope, $rootScope, $httpParamSerializer, $http, $state){
    //头部title
    // $rootScope.pageTitle = "登录";
    /**
     * 登录
     * @return {[type]} [description]
     */
    $scope.submit = function(){
        var param = {
            telephone: $scope.telphone,
            password: $scope.password
        };
        $http({
            method: 'POST',
            // url: 'mock/common.json',
            url: api_Data.My.login,
            headers:{
                'Content-Type':'application/x-www-form-urlencoded'
            },
            dataType: 'json',
            data: $httpParamSerializer(param)
        }).then(function successCallback(response){
            if(response.data.code == 0){
                layer.open({
                    content: '登录成功',
                    skin: 'msg',
                    time: 2 
                });
                $state.go('home');
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