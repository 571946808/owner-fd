/*----------------------------------------------------------------
* @Description:     找回密码
* @Version:         1.0.1
* @author:          Puzy(243151687@qq.com)
* @date             2016.11.6
* ==NOTES:=============================================
* v1.0.1(2016.11.6):
初始生成
* ------------------------------------------------------------*/

var app=angular.module('sunApp',[]);
app.controller('passwordController', function ($scope,$http, $rootScope,$httpParamSerializer,$state,$interval) { 
	$scope.picCodeUrl = '/owner-bd/index.php/Home/CheckCode/getPicCode';
	$scope.isShowone = true;
	$scope.isShowtwo = false;
	$scope.btnSMSText = '获取验证码';
	$scope.btnSMSDisabled = false;
	/**
	 * 找回密码[pageTitle description]
	 * @type {String}
	 */
	$rootScope.pageTitle = "找回密码";
	/*
	手机号验证
	 */
	// $scope.mobileCode = function(){
	// 	var param = {
	// 		telephone: $scope.mobile
	// 	};
	// 	var myreg=/^[1]{1}[34578]{1}[0-9]{9}$/;
	// 	if(myreg.test($scope.mobile)){
	// 		$http({
	// 			method:'POST',
	// 			// url:'localhost/owner-bd/index.php/Home/Register/register',
	// 			url: '/owner-fd/mock/find-password.json',
	// 			headers:{
	// 	    		'Content-Type':'application/x-www-form-urlencoded'
	// 	    	},
	// 	    	dataType: 'json',
	// 	    	data: $httpParamSerializer(param)
	// 		}).then(function successCallback(response) {
	// 			if(response.data.code == 0){
	//                 $scope.btnSMSDisabled = true;
	//                 // $scope.formOne.telephone.$invalid = false;
	//             }else{
	//             	console.log(response.data.errMsg);
	//             }
	//         }, function errorCallback(response) {
	// 			console.log(response.data);	
	// 		});
	// 	}	
	// }
	/**
	 * 获取短信验证码
	 */
	$scope.getSMSCode = function(){
		var param = {
			mobile: $scope.mobile
		};
		var myreg=/^[1]{1}[34578]{1}[0-9]{9}$/;
		if(myreg.test($scope.mobile)){
	  	$http({
	    	method:'POST',
	    	url:'/owner-bd/index.php/Home/SMS/getSMSCode',
	    	// url: '/owner-fd/mock/common.json',
	    	headers:{
	    		'Content-Type':'application/x-www-form-urlencoded'
	    	},
	    	dataType: 'json',
	    	data: $httpParamSerializer(param)
	  	}).then(function successCallback(response) {
			if(response.data.code == '0'){
				$scope.btnSMSDisabled = true;
				var 
					time = 60,
			    	timer = $interval(function(){
				        time = time - 1;
				        $scope.btnSMSText = time+'秒';
				        if(time == 0) {
				            $interval.cancel(timer);
				            $scope.btnSMSDisabled = false;
				            $scope.btnSMSText = '重新获取'; 
				        }
				    }, 1000);
			}
		}, function errorCallback(response) {
			console.log(response.data);
		});
	}
	}
	/**
	 * 验证短信验证码
	 */
	$scope.next = function(){
		var param = {
			mobile: $scope.mobile,
			code: $scope.SMSCode
		};
	  	$http({
	    	method:'POST',
	    	url:'/owner-bd/index.php/Home/SMS/checkSMSCode',
	    	// url: '/owner-fd/mock/common.json',
	    	headers:{
	    		'Content-Type':'application/x-www-form-urlencoded'
	    	},
	    	dataType: 'json',
	    	data: $httpParamSerializer(param)
	  	}).then(function successCallback(response) {
			if(response.data.code == '0'){
				$scope.isShowone = false;
				$scope.isShowtwo = true;
			}
			else{
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
	/*
	提交重置密码表单
	 */
	$scope.submit = function(){
	    $http({
	        method: 'POST',
	        // url: 'mock/common.json',
	        url: '/owner-bd/index.php/Home/FindPsw/findPsw',
	        headers:{        
	            'Content-Type':'application/x-www-form-urlencoded'      
	        },
	        dataType: 'json',
	        data: $httpParamSerializer($scope.formData)
	    }).then(function successCallback(response){
	        if(response.data.code == 0){
	            // layer.msg('修改密码成功');
	            layer.open({
						content: '设置密码成功',
						skin: 'msg' ,
					time: 2
				});
	            $state.go('login');
	        }else{
	            //layer.msg(response.data.errMsg);
	            layer.open({
						content: response.data.errMsg,
						skin: 'msg' ,
					time: 2
				});
	        }
	    }, function errorCallback(response){
	        console.log(response.data);
	    });
	};
});

