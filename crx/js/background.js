/*
 * @Author: Query 
 * @Date: 2018-04-18 10:23:12 
 * @Last Modified by: Query
 * @Last Modified time: 2018-05-11 10:44:03
 */


 var apiUrl = "https://dev-browser-plugin.qiang100.com/api/";

var background={
    init:function(){
        //this.showBadge('99+', [215, 0, 0, 215]);

        var _this = this;
        //this.downloadOptions();
        //this.uploadOptions();
        this.stratSyncSiteSession();

        var timer = setTimeout(function(){
            _this.getUserInfo(function(userInfo) {
                if (userInfo) {      //已登录获取用户信息
                    console.log('已登录状态，用户信息：' + JSON.stringify(userInfo));
                    
                   _this.downloadOptions(); 
                   _this.uploadOptions();
                  
                } else {
                    console.log('未登录状态');      //检测本地是否有配置
                   
                    var getOptions = localStorage.getItem('setOptions');
                    //alert(getOptions);

                    if (getOptions) {
                        console.log('本地有配置')
                    } else {
                        console.log('本地无配置')

                        var defaultOptions = {
                            "priceLineForList": true,
                            "selectedCategories": ["数码", "电器"],
                            "priceLineForDetail": false,
                            "needPush": false,
                            "selectedKeywords": [],
                            "categories": ["食品", "母婴", "个护", "数码", "电器", "日用", "运动", "服饰鞋帽", "玩模乐器", "办公", "家装", "汽车", "图书", "旅行"]
                        };

                        localStorage.setItem('setOptions', JSON.stringify(defaultOptions))

                    }

                    


                    
                }
            });
        }, 2000);
    },


    downloadOptions:function(){
        var _this = this;
        $.ajax({
            type: "GET",
            url: apiUrl +  "optionPage/downloadOptions",
            dataType: "json",
        }).done(function (res) {

            if (res.code == 100) {  //已登录请求配置

                function downLoad(){
                    var downloadOptions = JSON.stringify(res.data.options);
                    localStorage.setItem('downloadOptions', downloadOptions);
    
                    localStorage.setItem('setOptions', downloadOptions)
                    localStorage.setItem('lastModified', '')
                };

                downLoad()
                console.log('下载配置成功')



            } else {            //未登录检测本地是否有配置
               console.log('下载配置失败')






               
            }

        }).fail(function () {
            console.log('网络错误')
        }).always(function () {

        });





    },
    
    showBadge:function (str,bgColor) { //修改图标上文字提醒
        chrome.browserAction.setBadgeBackgroundColor({ color: bgColor });
        chrome.browserAction.setBadgeText({ text: str });
    },

 
    uploadOptions:function(){
        var secondAgo = '';
        var getOptions= '';
        var downloadOptions ='';
        var lastModified ='';
        setInterval(function(){
            downloadOptions = JSON.parse(localStorage.getItem('downloadOptions'));
            setOptions = JSON.parse(localStorage.getItem('setOptions'));

            var strModified =localStorage.getItem('lastModified');
            lastModified = new Date(strModified);
            var date = new Date();

            //console.log(lastModified + '\n' + date);

            if(strModified){
                secondAgo = parseInt((date- lastModified)/1000);
                if(secondAgo >10){
                    console.log('发请求' + secondAgo);

                    var getOptions = JSON.parse(localStorage.getItem('setOptions'));
                    console.log(getOptions);

                                
                    $.ajax({
                        type: "POST",
                        url:  apiUrl + "optionPage/uploadOptions",

                        dataType: "json",
                        data: JSON.stringify({
                            options: getOptions
                        }),

                    }).done(function (res) {
                        if(res.code == -100){
                            console.log('需要登录')
                        }else if(res.code == 100){
                            
                            var doneRes = JSON.stringify(res);
                            localStorage.setItem('downloadOptions' ,doneRes)
    
                            console.log('上传成功')
                        }else{
                            alert('请求失败')
                        }

                    }).fail(function () {
                        console.log('网络错误')
                    }).always(function () {
                        return null
                    })
            
                    localStorage.setItem('lastModified','');
                }else{
                    console.log('不发请求' + secondAgo)
                }
            }else{  
                console.log('不执行')
            }

        },1000);
        

        
    },


    log(){
        console.log('欢迎访问百强聚惠!官网:https://www.qiang100.com\ndeveloped by Query : http://www.zbx.store')
    },

    //同步网站的会话
    syncSiteSession() {
        chrome.cookies.get({
            url: 'https://dev-www.qiang100.com/',
            name: 'PHPSESSID'
        }, function(cookie) {
            // console.log(cookie);
            if (cookie) {
                chrome.cookies.set({
                    url: 'https://dev-browser-plugin.qiang100.com/',
                    name: 'PHPSESSID',
                    value: cookie.value,
                    expirationDate: cookie.expirationDate
                }, function(cookie) {
                    // console.log(cookie);
                });
            }
        });
    },

    //启动定时同步网站的会话
    stratSyncSiteSession() {
        let self = this;
        setInterval(function() {
            self.syncSiteSession();
        }, 1000);
    },

    getUserInfo(callback) {
        $.ajax({
            type: "GET",
            url: "https://dev-browser-plugin.qiang100.com/api/bgPage/getUserInfo",
            dataType: "json",
        }).done(function (res) {
            if(res.code == 100 && res.data && res.data.id){
                if (callback) {
                    callback(res.data);
                }
            } else {
                if (callback) {
                    callback(false);
                }
            }
        }).fail(function () {
            console.log('网络错误')
            if (callback) {
                callback(false);
            }
        }).always(function () {

        })
    }

}

background.init()
