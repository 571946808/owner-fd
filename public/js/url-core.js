(function(){
	var 
		site ={
            //website:'http://api.voidking.com', //站点地址
            website: '',
            staticWebsite: '/', // 前端服务器地址
        };

    api_Data={
    	//我是业主
    	My:{
    		//login
    		'login': site.website + '/owner-bd/index.php/Home/Index/login',
    		//authentication-add
    		'messageAdd': site.website + '/owner-bd/index.php/Home/Identify/messageAdd',
    		//authentication-list
    		'messageList': site.website + '/owner-bd/index.php/Home/Identify/messageList',
    		//authentication-edit
    		'messageSkip': site.website + '/owner-bd/index.php/Home/Identify/messageSkip',
    		'messageEdit': site.website + '/owner-bd/index.php/Home/Identify/messageEdit',
    		//register
    		'mobileVerify': site.website + '/owner-bd/index.php/Home/Register/mobileVerify',
    		'checkPicCode': site.website + '/owner-bd/index.php/Home/CheckCode/checkPicCode',
    		'getSMSCode': site.website + '/owner-bd/index.php/Home/SMS/getSMSCode',
    		'checkSMSCode': site.website + '/owner-bd/index.php/Home/SMS/checkSMSCode',
    		'getPicCode': site.website + '/owner-bd/index.php/Home/CheckCode/getPicCode',
    		'register': site.website + '/owner-bd/index.php/Home/Register/register'
    	},
        MainTain:{
            'submitHome': site.website + '/owner-bd/index.php/Home/HomeMaintain/homeMaintain',
            'submitPublic': site.website + '/owner-bd/index.php/Home/PublicMaintain/publicMaintain'

        }
    }
})();