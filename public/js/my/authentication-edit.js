/*----------------------------------------------------------------
 * @Description:     认证修改页
 * @Version:         1.0.0
 * @author:          jiangx(631724595@qq.com)
 * @date             2016.10.26
 * ==NOTES:=============================================
 * v1.0.0(2016.10.26):
 初始生成
 * ------------------------------------------------------------*/
angular.module("sunApp").controller('myAuthenticationEdit', function($scope, $rootScope, $http, $httpParamSerializer, $state, $stateParams){
    $rootScope.pageTitle = "修改认证信息";
    // $scope.formData = {};
    //住房信息需要的变量，这里用了jquery;
    var showContactDom = $('#show_contact'),
        contactProvinceCodeDom = $('#contact_province_code'),
        contactCityCodeDom = $('#contact_city_code');
    /**
     * 获取当前房屋的认证
     * @param  {[type]} data){}).error(function(){} [description]
     * @return {[type]}   [description]
     */
    $http({
        method: 'POST',
        // url: 'mock/house-info.json',
        url: api_Data.My.messageSkip,
        headers:{        
            'Content-Type':'application/x-www-form-urlencoded'      
        },
        dataType: 'json',
        data: $httpParamSerializer({id:$stateParams.id})
    }).then(function successCallback(respones){
        // if(respones.code)
        $scope.formData = respones.data[0];
    }, function errorCallback(respones){
        console.error('ajax失败');
    });
    /**
     * 选择住房城市的select
     * @return {[type]} [description]
     */
    $scope.selectArea = function(){
        var sccode = showContactDom.attr('data-city-code');
        var scname = showContactDom.attr('data-city-name');

        var oneLevelId = showContactDom.attr('data-province-code');
        var twoLevelId = showContactDom.attr('data-city-code');
        var threeLevelId = showContactDom.attr('data-district-code');
        var iosSelect = new IosSelect(3, [iosProvinces, iosCitys, iosCountys],
            {
                title: '地址选择',
                itemHeight: 35,
                oneTwoRelation: 1,
                twoThreeRelation: 1,
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                threeLevelId: threeLevelId,
                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                    contactProvinceCodeDom.val(selectOneObj.id); 
                    contactProvinceCodeDom.attr('data-province-name', selectOneObj.value);
                    contactCityCodeDom.val(selectTwoObj.id);
                    contactCityCodeDom.attr('data-city-name', selectTwoObj.value);
                    // $scope.provinceId = selectOneObj.id;
                    // $scope.cityId = selectTwoObj.id;
                    // $scope.districtId = selectThreeObj.id;
                    // $scope.provinceName = selectOneObj.value;
                    // $scope.cityName = selectTwoObj.value;

                    showContactDom.attr('data-province-code', selectOneObj.id);
                    showContactDom.attr('data-city-code', selectTwoObj.id);
                    showContactDom.attr('data-district-code', selectThreeObj.id);
                    showContactDom.html(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value);
                    $scope.formData.city = selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value;
                }
            }
        );
    };
    /**
     * 提交处理
     * @return {[type]} [description]
     */
    $scope.submit = function(){
        $http({
            method: 'POST',
            // url: 'mock/common.json',
            url: api_Data.My.messageEdit,
            headers:{        
                'Content-Type':'application/x-www-form-urlencoded'      
            },
            dataType: 'json',
            data: $httpParamSerializer($scope.formData)
        }).then(function successCallback(respones){
            if(respones.data.code == 0){
                layer.open({
                    content: '修改认证成功，等待物业核实信息',
                    skin: 'msg',
                    time: 2 
                });
                //跳回列表页
                $state.go('authenticationList');
            }else{
                layer.open({
                    content: respones.data.errMsg,
                    skin: 'msg',
                    time: 2 
                });
            }
        }, function errorCallback(respones){
            layer.open({
                content: data.errMsg,
                skin: 'msg',
                time:2 
            });
        });
    };
});