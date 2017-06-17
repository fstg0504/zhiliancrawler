'use strict';
// let request = require('sync-request');
let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
//城市
function getDetailByCity(){
    var options={
        url:'http://top.zhaopin.com/Home/_Top50Detail?Length=4',
        method:"POST",
        data:{
            industry_10:'',
            time_10:2,
            cityId:489,
            cityName:'',
            // isAjaxRequest:true,
            id:'HotJobTop'
        },
        headers:{
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Methods":"GET,POST",
            "Accept":'*/*',
             "Connection":'keep-alive',
             "Content-Type":'application/x-www-form-urlencoded',
             "Host":'top.zhaopin.com',
             "Origin":'http://top.zhaopin.com',
             "Referer":'http://top.zhaopin.com/Home/Top50?id=HotJobTop&city=749&time=2',
             "X-Requested-With":'XMLHttpRequest'
        }
    };
    request(options,function (err, response, body) {
        if(err){
            console.log(22);
            console.log(err);
        }else{
            console.log(25);
            console.log(body);
        }
    })

}
getDetailByCity();