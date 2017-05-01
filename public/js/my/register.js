/*----------------------------------------------------------------
* @Description:     注册
* @Version:         1.0.0
* @author:          yangyt(854369721@qq.com)
* @date             2016.10.30
* ==NOTES:=============================================
* v1.0.0(2016.10.30):
初始生成
* ------------------------------------------------------------*/
var app=angular.module('sunApp',[]);
app.controller('registerController', function ($scope,$http, $rootScope,$httpParamSerializer,$state,$interval) { 
$scope.picCodeUrl = api_Data.My.getPicCode;
$scope.isShow1 = true;
$scope.isShow2 = false;
$scope.btnSMSText = '获取验证码';
$scope.phoneNoCheck = true;
$scope.imgNoCheck = true;
/**
 * 注册[pageTitle description]
 * @type {String}
 */
$rootScope.pageTitle = "注册";
/*
手机号验证
 */
$scope.mobileCode = function(){
	var param = {
		mobileInput: $scope.mobile
	};
	var myreg=/^[1]{1}[34578]{1}[0-9]{9}$/;
	if(myreg.test($scope.mobile)){
		$http({
			method:'POST',
			url:api_Data.My.mobileVerify,
			// url: '/owner-fd/mock/register.json',
			headers:{
	    		'Content-Type':'application/x-www-form-urlencoded'
	    	},
	    	withCredentials: true,
	    	dataType: 'json',
	    	data: $httpParamSerializer(param)
		}).then(function successCallback(response) {
			if(response.data.code == 0){
                $scope.phoneNoCheck = false;
            }else{
            	layer.open({
                	content: response.data.errMsg,
                	skin: 'msg',
                	time:2 
            	});
            }
        }, function errorCallback(response) {
			console.log(response.data);	
		});
	}	
}
/*
图片验证
 */
$scope.imgCode = function(){
	var param = {
		code: $scope.picCode
	};
	if($scope.picCode){
		$http({
			method:'POST',
			url: api_Data.My.checkPicCode,
			// url: '/owner-fd/mock/imgCode.json',
			headers:{
		    	'Content-Type':'application/x-www-form-urlencoded'
		    },
		    withCredentials: true,
		    dataType: 'json',
		    data: $httpParamSerializer(param)
		}).then(function successCallback(response) {
			if(response.data.code == '0'){
				$scope.imgNoCheck = false;
	        }else{
	        	layer.open({
	                content: response.data.ext,
	                skin: 'msg',
	                time:2 
	            });
	        }
	    }, function errorCallback(response) {
			console.log(response.data);	
		});
	}else{
		layer.open({
            content: "请输入图片验证码",
            skin: 'msg',
            time:2 
        });
	}
}
/**
 * 获取短信验证码
 */
$scope.getSMSCode = function(){
	var param = {
		mobile:$scope.mobile
	};
  	$http({
    	method:'POST',
    	url: api_Data.My.getSMSCode,
    	// url: '/owner-fd/mock/common.json',
    	headers:{
    		'Content-Type':'application/x-www-form-urlencoded'
    	},
    	withCredentials: true,
    	dataType: 'json',
    	data: $httpParamSerializer(param)
  	}).then(function successCallback(response) {
		if(response.data.code == 0){
			$scope.phoneNoCheck = true;
			var time = 60;
			var timer = null;
		    timer = $interval(function(){
		        time = time - 1;
		        $scope.btnSMSText = time+'秒';
		        if(time == 0) {
		            $interval.cancel(timer);
		            $scope.phoneNoCheck =false;
		            $scope.btnSMSText = '重新获取';
		        }
		    }, 1000);
		}
	}, function errorCallback(response) {
		console.log(response.data);
	});
}
/**
 * 验证短信验证码
 */
$scope.next = function(){
	var param = {
		mobile:$scope.mobile,
		code: $scope.SMSCode
	};
  	$http({
    	method:'POST',
    	url: api_Data.My.checkSMSCode,
    	// url: '/owner-fd/mock/common.json',
    	headers:{
    		'Content-Type':'application/x-www-form-urlencoded'
    	},
    	dataType: 'json',
    	data: $httpParamSerializer(param)
  	}).then(function successCallback(response) {
		console.log(response.data);
		if(response.data.code == 0){
			$scope.isShow1 = false;
			$scope.isShow2 = true;
		}else{
			layer.open({
                content: '手机验证码错误',
                skin: 'msg',
                time:2 
            });
		}
	}, function errorCallback(response) {
		console.log(response.data);
	});
}
/**
 * 刷新图片验证码
 */
$scope.refresh = function(){
  	$scope.picCodeUrl = api_Data.My.getPicCode+'?'+Math.random();
  	$scope.imgNoCheck = true;
}	

/*
提交注册表单
 */
$scope.submit = function(){
	var formData = {
		mobileInput: $scope.mobile,
		passwordInput:$scope.passwordInput,
		passwordaginInput:$scope.passwordaginInput
	};
    $http({
        method: 'POST',
        // url: 'mock/common.json',
        url: api_Data.My.register,
        headers:{        
            'Content-Type':'application/x-www-form-urlencoded'      
        },
        dataType: 'json',
        data: $httpParamSerializer(formData)
    }).then(function successCallback(response){
        if(response.data.code == 0){
            $state.go('renzheng');
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
};
});

