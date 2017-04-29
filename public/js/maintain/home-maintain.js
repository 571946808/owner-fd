/*----------------------------------------------------------------
 * @Description:     家庭维修
 * @Version:         1.0.0
 * @author:          jiangx(631724595@qq.com)
 * @date             2016.11.28
 * ==NOTES:=============================================
 * v1.0.0(2016.11.28):
 初始生成
 * ------------------------------------------------------------*/
angular.module('sunApp').controller('homeMaintainCtrl', function($scope, $rootScope, $httpParamSerializer, $http, $state, fileReader){
    //头部title
    $rootScope.pageTitle = "家庭维修";
    //初始化日期插件
    var calendar = new LCalendar();
    calendar.init({
        'trigger': '#timepicker',//标签id
        'type': 'date',//date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
    });

    //angular方法
    $scope.getFile = function () {
        fileReader.readAsDataUrl($scope.file, $scope).then(function(result) {
            $scope.imageSrc = result;
        });
    };

    $scope.submitted = false;
    $scope.submit = function(){ 

        //表单正常提交
        if($scope.maintainForm.$valid){
            var formData = {
                ownername: $scope.formData.ownername,
                telphone: $scope.formData.telphone,
                address: $scope.formData.address,
                time: $scope.formData.time,
                description: $scope.formData.description
            };
            //表单提交
            $http({
                method: 'POST',
                //url: 'mock/common.json',
                url: api_Data.MainTain.submitHome,
                headers:{        
                    'Content-Type':'application/x-www-form-urlencoded'      
                },
                dataType: 'json',
                data: $httpParamSerializer(formData)
            }).then(function successCallback(response){
                if(response.data.code == 0){
                    $state.go('maintain');
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
　　　　　　　　　　　　　　　　　　　　　　　　
        // $http({
        //     method: 'post',
        //     url: '/comm/test.php',
        //     data:$scope.form,
        // }).success(function(data) {
        //     console.log(data);   
        // })
    };

    // var postData = {
    //     vacationType: $scope.leave.type,
    //     reason: $scope.leave.reason,
    //     familyRelation: +$scope.leave.type == 7 ? $scope.leave.relation : "",
    //     startTime: startTime,
    //     endTime: endTime,
    //     fileName: $scope.imageSrc,
    //     workDelivers: workDelivers,
    //     ccmailNickNames: sendPersons,
    //     realDays: +$scope.leave.type == 8 ? $scope.leave.timeLong : ""
    // };
    // var promise = postMultipart('/maldives/leave/save', postData); 
    // function postMultipart(url, data) {
    //     var fd = new FormData();
    //     angular.forEach(data, function(val, key) {
    //         fd.append(key, val);
    //     });
    //     var args = {
    //         method: 'POST',
    //         url: url,
    //         data: fd,
    //         headers: {'Content-Type': undefined},
    //         transformRequest: angular.identity
    //     };
    //     return $http(args);
    // }

//     $scope.reader = new FileReader();   //创建一个FileReader接口
//     $scope.form = {     //用于绑定提交内容，图片或其他数据
//         image:{},
//     };
//     $scope.thumb = {};      //用于存放图片的base64
//     $scope.thumb_default = {    //用于循环默认的‘加号’添加图片的框
//         1111:{}
//     };

//     $scope.img_upload = function(files) {       //单次提交图片的函数
//         $scope.guid = (new Date()).valueOf();   //通过时间戳创建一个随机数，作为键名使用
//         $scope.reader.readAsDataURL(files[0]);  //FileReader的方法，把图片转成base64
//         $scope.reader.onload = function(ev) {
//             $scope.$apply(function(){
//                 $scope.thumb[$scope.guid] = {
//                     imgSrc : ev.target.result,  //接收base64
//                 }
//             });
//         };
        
//         var data = new FormData();      //以下为像后台提交图片数据
//         data.append('image', files[0]);
//         data.append('guid',$scope.guid);
//         $http({
//             method: 'post',
//             url: '/comm/test-upload.php?action=success',
//             data:data,
//             headers: {'Content-Type': undefined},
//             transformRequest: angular.identity
//         }).success(function(data) {
//             if (data.result_code == 'SUCCESS') {
//                 $scope.form.image[data.guid] = data.result_value;
//                 $scope.thumb[data.guid].status = 'SUCCESS';
//                 console.log($scope.form)
//             }
//             if(data.result_code == 'FAIL'){
//                 console.log(data)
//             }
//         })
//     };

//     $scope.img_del = function(key) {    //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
//         var guidArr = [];
//         for(var p in $scope.thumb){
//             guidArr.push(p);
//         }
//         delete $scope.thumb[guidArr[key]];
//         delete $scope.form.image[guidArr[key]];
//     };
//     $scope.submit_form = function(){    //图片选择完毕后的提交，这个提交并没有提交前面的图片数据，只是提交用户操作完毕后，
// 　　　　　　　　　　　　　　　　　　　　　　　　//到底要上传哪些，通过提交键名或者链接，后台来判断最终用户的选择,整个思路也是如此
//         $http({
//             method: 'post',
//             url: '/comm/test.php',
//             data:$scope.form,
//         }).success(function(data) {
//             console.log(data);   
//         })
//     };
        

});

angular.module('sunApp').directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs, ngModel) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function(event){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
                //附件预览
                    scope.file = (event.srcElement || event.target).files[0];
                scope.getFile();
            });
        }
    };
}]);

angular.module('sunApp').directive('turnBackgrd',function(){
    //改变label颜色
        return {
            restrict:'AE',
            scope: {},
            link: function(scope,element,attr){
                element.bind("click",function(event){
                    if(element.hasClass("blue")){
                        element.removeClass("blue");
                    }
                    else{
                        element.addClass("blue");
                    }
                }
                )
            }
        }
});

angular.module('sunApp').factory('fileReader', ["$q", "$log", function($q, $log){
    var onLoad = function(reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };
    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };
    var getReader = function(deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        return reader;
    };
    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();
        var reader = getReader(deferred, scope);         
        reader.readAsDataURL(file);
        return deferred.promise;
    };
    return {
        readAsDataUrl: readAsDataURL  
    };
}])