angular.module('sunApp').controller('visitController', function ($scope, $rootScope, $http,$httpParamSerializer,$state) { 
    //头部title
    $rootScope.pageTitle = "访客授权";
    $rootScope.hasHeader = false;
    $rootScope.hasFooter = true;

    //初始化日期插件
    var calendarstart = new LCalendar();
    calendarstart.init({
        'trigger': '#timepickerstart',//标签id
        'type': 'date',//date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
    });
    var calendarend = new LCalendar();
    calendarend.init({
        'trigger': '#timepickerend',//标签id
        'type': 'date',//date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
    });

    $scope.submitted = false;
    $scope.submit = function(){ 

        //表单正常提交
        if($scope.mainForm.$valid){
            // var formData = {
            //     ownername: $scope.formData.ownername,
            //     telphone: $scope.formData.telphone,
            //     address: $scope.formData.address,
            //     time: $scope.formData.time,
            //     description: $scope.formData.description
            // };
            //表单提交
            $http({
                method: 'POST',
                //url: 'mock/common.json',
                url: api_Data.MainTain.submitVisit,
                headers:{        
                    'Content-Type':'application/x-www-form-urlencoded'      
                },
                dataType: 'json',
                data: $httpParamSerializer($scope.formData)
            }).then(function successCallback(response){
                if(response.data.code == 0){
                    $state.go('visitList');
                }else{
                    layer.open({
                        content: response.data.errMsg,
                        skin: 'msg',
                        time:2 
                    });
                }
            }, function errorCallback(response){
                console.log(response.data);
            });
        }
        else{
            $scope.submitted = true;
        }   
    };
});