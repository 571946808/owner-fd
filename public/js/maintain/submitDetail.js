/*----------------------------------------------------------------
* @Description:     提交详情
* @Version:         1.0.0
* @author:          yangyt(854369721@qq.com)
* @date             2016.11.21
* ==NOTES:=============================================
* v1.0.0(2016.11.21):
初始生成
* ------------------------------------------------------------*/
var app=angular.module('sunApp',[]);
app.controller('submitDetailController', function ($scope,$http, $rootScope,$httpParamSerializer,$state,$interval,$stateParams) { 
	//头部title
    $rootScope.pageTitle = "提交详情";
    $scope.deleteBtn = true;
    //发送请求
    // $scope.formData = {};
    if($stateParams.order){
    	$scope.formData.type=$stateParams.order;
	    $http({
				method:'POST',
				// url:'/owner-bd/index.php/Home/submitDetail/repairShow',
				url: 'mock/submitDetail-order.json',
				headers:{
		    		'Content-Type':'application/x-www-form-urlencoded'
		    	},
		    	dataType: 'json',
		    	data: $httpParamSerializer({id:$stateParams.id})
			}).then(function successCallback(response) {
				if(response.data.code == 0){
					if(response.data.obj.verifiedstate.text('待受理')){
						$scope.formData = response.data.obj;
					}else{
						$scope.formData = response.data.obj;
						$scope.deleteBtn = false;
					}
	       		}
	        }, function errorCallback(response) {
				console.error('ajax失败');	
			});
	}else{
		$scope.formData.type=$stateParams.guarantee;
		$http({
				method:'POST',
				// url:'/owner-bd/index.php/Home/submitDetail/serviceShow',
				url: 'mock/submitDetail-guarantee.json',
				headers:{
		    		'Content-Type':'application/x-www-form-urlencoded'
		    	},
		    	dataType: 'json',
		    	data: $httpParamSerializer({id:$stateParams.id})
			}).then(function successCallback(response) {
				if(response.data.code == 0){
	       			if(response.data.obj.verifiedstate.text('待受理')){
						$scope.formData = response.data.obj;
					}else{
						$scope.formData = response.data.obj;
						$scope.deleteBtn = false;
					}
				}	
	        }, function errorCallback(response) {
				console.error('ajax失败');	
			});
	};		
	//删除信息
	$scope.delete = function(){
		$http({
			method:'POST',
			// url:'/owner-bd/index.php/Home/submitDetail/repairShow',
			url: 'mock/submitDetail.json',
			headers:{
		    	'Content-Type':'application/x-www-form-urlencoded'
		    },
		    dataType: 'json',
		    data: $httpParamSerializer({id:$stateParams.id})
		}).then(function successCallback(response) {
			if(response.data.code == '0'){
				
	        }
	    }, function errorCallback(response) {
			console.log(response.data);	
		});
	}		
});

