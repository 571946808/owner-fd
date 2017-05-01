/*----------------------------------------------------------------
 * @Description:     认证添加页
 * @Version:         1.0.0
 * @author:          jiangx(631724595@qq.com)
 * @date             2016.10.18
 * ==NOTES:=============================================
 * v1.0.0(2016.10.18):
 初始生成
 * ------------------------------------------------------------*/
angular.module("sunApp").controller('renzhengController', function($scope, $rootScope, $http, $httpParamSerializer, $state){
    // $rootScope.pageTitle = "添加认证信息";
    
    //住房信息需要的变量，这里用了jquery
    var showContactDom = $('#show_contact'),
        contactProvinceCodeDom = $('#contact_province_code'),
        contactCityCodeDom = $('#contact_city_code');

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
                    //給formData加属性start
                    // $scope.formData.provinceId = selectOneObj.id;
                    // $scope.formData.cityId = selectTwoObj.id;
                    // $scope.formData.districtId = selectThreeObj.id;
                    //給formData加属性end
                    showContactDom.attr('data-province-code', selectOneObj.id);
                    showContactDom.attr('data-city-code', selectTwoObj.id);
                    showContactDom.attr('data-district-code', selectThreeObj.id);
                    showContactDom.html(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value);
                    showContactDom.removeClass('iosselect');
                    $scope.formData.city = selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value;
                }
            }
        );
    };

    /**
     * 提交处理
     * @return {[type]} [description]
     */
    // console.log(api_Data.My.messageAdd);
    $scope.submit = function(){
        $http({
            method: 'POST',
            // url: 'mock/common.json',
            url: api_Data.My.messageAdd,
            headers:{        
                'Content-Type':'application/x-www-form-urlencoded'      
            },
            dataType: 'json',
            data: $httpParamSerializer($scope.formData)
        }).then(function successCallback(response){
            if(response.data.code == 0){
                layer.open({
                    content: '添加认证成功，等待物业核实信息',
                    skin: 'msg',
                    time:2 
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
    };
});