/*----------------------------------------------------------------
* @Description:     我的提交
* @Version:         1.0.0
* @author:          Puzy(243151687@qq.com)
* @date             2016.11.23
* ==NOTES:=============================================
* v1.0.0(2016.11.23):
初始生成
* ------------------------------------------------------------*/
var app=angular.module('sunApp',[]);
app.controller('mycommitController', function ($scope,$http, $rootScope,$httpParamSerializer,$state,$interval) { 
	$rootScope.pageTitle = "我的提交";
	/**
	 * 我的提交[pageTitle description]
	 * @type {String}
	 */
	$scope.types = function(){
		$http({
			method:'POST',
			// url:'/owner-bd/index.php/Home/',
			headers:{
		    	'Content-Type':'application/x-www-form-urlencoded'
		    },
		    dataType: 'json',
		    data: $httpParamSerializer(param)
		}).then(function successCallback(response){
			if(response.data.code == 0){
       			$scope.formData = response.data.obj;
       		}else{
       			$scope.formData = response.data.obj;
       		}
        }, function errorCallback(response) {
			console.error('ajax失败');	
		});
    }
});