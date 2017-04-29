var sunApp = angular.module('sunApp',['ui.router','oc.lazyLoad']);
sunApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        debug: true
    });
}]);
sunApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.withCredentials = true;
}]);
sunApp.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.when('','/home');

    $stateProvider.state('home',{
        url:'/home',
        templateUrl: 'views/home/home.html',
        controller: 'homeHomeController',
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'homeHomeController',
                    files:[
                        'public/js/home/home.js',
                        'public/js/partial/footer.js',
                        'public/css/partial/footer.css'
                    ]
                })
            }]
         }
    });

    $stateProvider.state('neighbor',{
        url:'/neighbor',
        templateUrl:'views/neighbor/home.html',
        controller: 'neighborHomeController',
        resolve:{
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'neighborHomeController',
                    files:['public/js/neighbor/home.js']
                })
            }
        }
    });

    $stateProvider.state('report',{
        url: '/report',
        templateUrl: 'views/report/home.html',
        controller: 'reportHomeController',
        resolve:{
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'reportHomeController',
                    files:['public/js/report/home.js']
                })
            }
        }
    });

    $stateProvider.state('my',{
        url: '/my',
        templateUrl: 'views/my/home.html',
        resolve:{
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'ownerEditController',
                     files:[
                        'public/css/my/home.css',
                        'public/js/partial/footer.js',
                    ]
                })
            }
        }
    })

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'views/my/login.html',
        controller: 'myLoginController',
        resolve: {
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'myLoginController',
                    files:[
                        'public/js/my/login.js',
                        'public/css/my/login.css'
                    ]
                })
            }
        }
    });
    $stateProvider.state('findPassword', {
        url: '/findPassword',
        templateUrl: 'views/my/find-password.html',
        controller: 'passwordController',
        resolve: {
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'passwordController',
                    files:[
                        'public/js/my/find-password.js',
                        'public/css/my/find-password.css'
                    ]
                })
            }
        }
    });
    $stateProvider.state('authenticationAdd', {
        url: '/authenticationAdd',
        templateUrl: 'views/my/authentication-add.html',
        controller: 'myAuthenticationAdd',
        resolve: {
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'myAuthenticationAdd',
                    files:[
                        'public/js/my/authentication-add.js',
                        'public/css/my/authentication.css',
                        'public/libs/iosselect/merge/iosSelect.js',
                        'public/libs/iosselect/merge/iosSelect.css',
                        'public/libs/iosselect/merge/areaData_v2.js'
                    ]
                })
            }
        }
    });
    $stateProvider.state('authenticationEdit', {
        url: '/authenticationEdit/:id',
        templateUrl: 'views/my/authentication-edit.html',
        controller: 'myAuthenticationEdit',
        resolve: {
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'myAuthenticationEdit',
                    files:[
                        'public/js/my/authentication-edit.js',
                        'public/css/my/authentication.css',
                        'public/libs/iosselect/merge/iosSelect.js',
                        'public/libs/iosselect/merge/iosSelect.css',
                        'public/libs/iosselect/merge/areaData_v2.js'
                    ]
                })
            }
        }
    });
    $stateProvider.state('authenticationList', {
        url: '/authenticationList',
        templateUrl: 'views/my/authentication-List.html',
        controller: 'myAuthenticationList',
        resolve: {
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'myLoginController',
                    files:[
                        'public/js/my/authentication-list.js',
                        'public/css/my/authentication.css'
                    ]
                })
            }
        }
    });

    $stateProvider.state('register', {
        url: '/register',
        templateUrl: 'views/my/register.html',
        controller: 'registerController',
        resolve: {
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'registerController',
                    files:[
                        'public/js/my/register.js',
                        'public/css/my/register.css'
                    ]
                })
            }
        }
    });
    //维修报修
    $stateProvider.state('maintain', {
        url: '/maintain',
        templateUrl: 'views/maintain/maintain.html',
        controller: 'maintain',
        resolve: {
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'maintain',
                    files:[
                        'public/js/maintain/maintain.js',
                        'public/css/maintain/maintain.css',
                        'public/libs/calendar/dist/css/LCalendar.min.css',
                        'public/libs/calendar/dist/js/LCalendar.min.js'
                    ]
                })
            }
        }
    });
    //维修报修--家庭
    $stateProvider.state('homeMaintain', {
        url: '/homeMaintain',
        templateUrl: 'views/maintain/home-maintain.html',
        controller: 'homeMaintainCtrl',
        resolve: {
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'maintainController',
                    files:[
                        'public/js/maintain/home-maintain.js',
                        'public/css/maintain/home-maintain.css',
                        'public/libs/calendar/dist/css/LCalendar.min.css',
                        'public/libs/calendar/dist/js/LCalendar.min.js'
                    ]
                })
            }
        }
    });
    //维修报修--公共
    $stateProvider.state('publicMaintain', {
        url: '/publicMaintain',
        templateUrl: 'views/maintain/public-maintain.html',
        controller: 'publicMaintainCtrl',
        resolve: {
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'publicMaintainCtrl',
                    files:[
                        'public/js/maintain/public-maintain.js',
                        'public/css/maintain/public-maintain.css'
                    ]
                })
            }
        }
    });
    //提交详情
    $stateProvider.state('submitDetail', {
        url: '/submitDetail/:id',
        templateUrl: 'views/maintain/submitDetail.html',
        controller: 'submitDetailController',
        resolve: {
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'submitDetailController',
                    files:[
                        'public/js/maintain/submitDetail.js',
                        'public/css/maintain/submitDetail.css'
                    ]
                })
            }
        }
    });
    //我的提交
    $stateProvider.state('mycommit', {
        url: '/mycommit/:id',
        templateUrl: 'views/maintain/mycommit.html',
        controller: 'mycommitController',
        resolve: {
            loadMyCtrl:function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'mycommitController',
                    files:[
                        'public/js/maintain/mycommit.js',
                        'public/css/maintain/mycommit.css'
                    ]
                })
            }
        }
    });
});

// sunApp.controller('footerController',function($scope, $rootScope, $location){
//     var url = $location.url();
//     $scope.currentTab = url.substr(1);
//     $scope.changeTab = function(tabname){  
//         $scope.currentTab = tabname;
//     }; 
//     $rootScope.hasHeader = false;
//     $rootScope.hasFooter = true;
// });

