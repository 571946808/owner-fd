/*----------------------------------------------------------------
 * @Description:     认证列表页
 * @Version:         1.0.0
 * @author:          jiangx(631724595@qq.com)
 * @date             2016.10.25
 * ==NOTES:=============================================
 * v1.0.0(2016.10.25):
 初始生成
 * ------------------------------------------------------------*/
angular.module('sunApp').controller('myAuthenticationList', function($scope, $rootScope, $http, $httpParamSerializer, $state){
    $rootScope.pageTitle = '认证列表';
    /**
     * 发送ajax获取列表信息
     * @param  {[type]} data)  {if(data.code [description]
     * @return {[type]}  [description]
     */
    $http({
        method: 'POST',
        // url: 'mock/authentication-list.json',
        url: api_Data.My.messageList,
        headers:{        
            'Content-Type':'application/x-www-form-urlencoded'      
        },
        withCredentials: true,
        dataType: 'json'
        // data: $httpParamSerializer()
    }).then(function successCallback(respones){
        console.log(respones.data.obj);
        if(respones.data.code == 0){
            $scope.list = respones.data.obj
        }else{
            layer.open({
                content: respones.data.errMsg,
                skin: 'msg',
                time: 2 
            });
        }
    }, function errorCallback(respones){
        console.error(respones.data);
    });
});