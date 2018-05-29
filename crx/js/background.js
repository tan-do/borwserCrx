/*
 * @Author: Query 
 * @Date: 2018-04-18 10:23:12 
 * @Last Modified by: Query
 * @Last Modified time: 2018-05-29 16:25:37
 */

//测试环境 
/* var apiUrl = "https://dev-browser-plugin.qiang100.com/";
var siteUrl = "https://dev-www.qiang100.com/"; */

//线上环境

var apiUrl = "https://browser-plugin.qiang100.com/";
var siteUrl = "https://www.qiang100.com/";


var background = {
    init: function () {
        //this.showBadge('99+', [215, 0, 0, 215]);
        var _this = this;
        this.stratSyncSiteSession();
        this.uploadOptions();
        this.downloadOptions();
        this.sendContent();
        this.needPush();
        var timer = setTimeout(function () {
            _this.getUserInfo(function (userInfo) {
                if (userInfo) { //已登录获取用户信息
                    console.log('已获取用户信息，用户信息：' + JSON.stringify(userInfo));
                    var userData = JSON.stringify(userInfo);
                    var setUser = localStorage.setItem('user',userData)
                } else {
                    console.log('未获取用户信息');

                }
            });
        }, 2000);
    },
    
    needPush(){
        var _this = this;
        var timer = setInterval(function(){
            var getOptions = JSON.parse(localStorage.getItem('setOptions'));
            var needPush =  getOptions.needPush;
            if(needPush){
                $.ajax({
                    type: "GET",
                    url: apiUrl + "api/bgPage/getPush",
                    dataType: "json",
                }).done(function(res){
                    if(res.code = 100){
                        /*  
                        res.data.pushList= [
                          {
                              "content": "220g*2袋辣条面筋休闲小吃零食魔芋丝香麻辣毛肚",
                              "icon": "https://static-zhi-image.qiang100.com/zdmimg/20180529/93B6557225.jpeg_resize.jpg",
                              "title": "卫龙魔芋爽素毛肚",
                              "url": "https://www.qiang100.com/zhi/16641978.html"
                          },
                          {
                              "content": "2018新茶春茶大佛越乡雨前龙井茶绿茶叶茶农直销250g包邮（券）",
                              "icon": "https://static-zhi-image.qiang100.com/zdmimg/20180517/29A6484D33.jpeg_resize.jpg",
                              "title": "农庄有约 西湖龙井茶 ",
                              "url": "https://www.qiang100.com/zhi/16641914.html"
                          },
                          {
                              "content": "银色 256GBApple iPhone X 智能手机 银色 256GB 8799元",
                              "icon": "https://static-zhi-image.qiang100.com/zdmimg/20180529/F45A6D7E84.jpeg_resize.jpg",
                              "title": "Apple iPhone X 智能手机",
                              "url": "https://www.qiang100.com/zhi/16641914.html"
                          },
                        ]; 
                        */
                        for(var i=0;i<res.data.pushList.length;i++){
                           
                            var title = res.data.pushList[i].title; //获取通知标题
                            var url = res.data.pushList[i].url  //获取通知url
                            res.data.pushList[i].body = res.data.pushList[i].content;
                            var options = res.data.pushList [i];  //获取通知选项
                            _this.pushNotice(title,options,url)
                        }
                       
                    }else{
                        return null
                    }
                });
                console.log('接受服务器通知')
            }else{
                console.log('推送设置已关')
            }
        },60000)
    },

    
    pushNotice(title,options,url){
        var _this  = this;
        if (!("Notification" in window)) {
            console.log("当前浏览器不支持推送通知");
        }else if (Notification.permission === "granted") {
           var notification = new Notification(title, options);
            notification.onclick = function (event) {
                event.preventDefault(); // prevent the browser from focusing the Notification's tab
                window.open(url, '_blank');
            };

            setTimeout(function() {
                notification.close()
            }, 10000);



        }else if (Notification.permission !== "denied") {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    var notification = new Notification(title, options);
                    notification.onclick = function (event) {
                        event.preventDefault(); // prevent the browser from focusing the Notification's tab
                        window.open(url, '_blank');
                    }
                    setTimeout(function () {
                        notification.close()
                    }, 10000);
                }
            });
        }
    },

    sendContent:function(){
        chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
            //alert(request.message)
            var getOptions = JSON.parse(localStorage.getItem('setOptions'));
            var getPriceDetail = getOptions.priceLineForDetail;
            sendResponse(getPriceDetail)
        });
    },

    downloadOptions: function () {
        var _this = this;
        $.ajax({
            type: "GET",
            url: apiUrl + "api/optionPage/downloadOptions",
            dataType: "json",
        }).done(function (res) {

            if (res.code == 100) { //已登录请求配置

                var downloadOptions = JSON.stringify(res.data.options);
                localStorage.setItem('downloadOptions', downloadOptions);
                localStorage.setItem('setOptions', downloadOptions);
                localStorage.setItem('lastModified', '');
                console.log('下载配置成功')

            } else if (res.code == 101) { //未登录检测本地是否有配置
                console.log("未登录")
                var getOptions = localStorage.getItem('setOptions');
                if (getOptions) {
                    console.log('本地有配置,使用本地配置')
                } else {
                    console.log('本地无配置,返回默认配置')
                    var defaultOptions = JSON.stringify(res.data.options);
                    localStorage.setItem('setOptions', defaultOptions)
                }
            } else {
                return null
            }

        }).fail(function () {
            console.log('网络错误')
        }).always(function () {

        });

    },


    uploadOptions: function () {
        var secondAgo = '';
        var getOptions = '';
        var downloadOptions = '';
        var lastModified = '';
        setInterval(function () {
            downloadOptions = JSON.parse(localStorage.getItem('downloadOptions'));
            setOptions = JSON.parse(localStorage.getItem('setOptions'));

            var strModified = localStorage.getItem('lastModified');
            lastModified = new Date(strModified);
            var date = new Date();

            //console.log(lastModified + '\n' + date);

            if (strModified) {
                secondAgo = parseInt((date - lastModified) / 1000);
                if (secondAgo > 3) {
                    console.log('发请求' + secondAgo);

                    var getOptions = JSON.parse(localStorage.getItem('setOptions'));
                    console.log(getOptions);


                    $.ajax({
                        type: "POST",
                        url: apiUrl + "api/optionPage/uploadOptions",

                        dataType: "json",
                        data: JSON.stringify({
                            options: getOptions
                        }),

                    }).done(function (res) {
                        if (res.code == -100) {
                            console.log('需要登录')
                        } else if (res.code == 100) {

                            var doneRes = JSON.stringify(res);
                            localStorage.setItem('downloadOptions', doneRes)

                            console.log('上传成功')
                        } else {
                            alert('请求失败')
                        }

                    }).fail(function () {
                        console.log('网络错误')
                    }).always(function () {
                        return null
                    })

                    localStorage.setItem('lastModified', '');
                } else {
                    console.log('不发请求' + secondAgo)
                }
            } else {
                console.log('不执行')
            }

        }, 1000);



    },


    //同步网站的会话
    syncSiteSession() {
        chrome.cookies.get({
            //url: 'https://dev-www.qiang100.com/',
            url: siteUrl,
            name: 'PHPSESSID'
        }, function (cookie) {
            // console.log(cookie);
            if (cookie) {
                chrome.cookies.set({
                    //url: 'https://dev-browser-plugin.qiang100.com/',
                    url: apiUrl,
                    name: 'PHPSESSID',
                    value: cookie.value,
                    expirationDate: cookie.expirationDate
                }, function (cookie) {
                    // console.log(cookie);
                });
            }
        });
    },

    //启动定时同步网站的会话
    stratSyncSiteSession() {
        let self = this;
        setInterval(function () {
            self.syncSiteSession();
        }, 1000);
    },

    getUserInfo(callback) {
        $.ajax({
            type: "GET",
            url: apiUrl + "api/bgPage/getUserInfo",
            dataType: "json",
        }).done(function (res) {
            if (res.code == 100 && res.data && res.data.id) {
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

