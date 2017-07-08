'use strict';
// let request = require('sync-request');
let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
module.exports = function(app) {
    let crawlerhost="http://top.zhaopin.com/Home/Top50?id=HotJobTop&city=749&time=2";
    app.get('/', function (req, res) {
        res.render('index', { title: '首页' });
    });
    app.get('/city', function (req, res) {
        res.render('city', { title: 'Express' });
    });
    app.get('/optionsUrl',function (req,res){
        let type=req.body.type;
        let outputFilePath='./public/json/options.json';
        var filestr={};
        if(0==type){
            let url='http://top.zhaopin.com/Home/Top50?id=HotJobTop&city=749&time=2';
             getAllOptions(url,function(data){
                 res.send(data);
             });
        }else {
            if(fs.readFileSync(outputFilePath)){
                filestr=JSON.parse(fs.readFileSync(outputFilePath));
                res.send(filestr);
            }else {
                let url='http://top.zhaopin.com/Home/Top50?id=HotJobTop&city=749&time=2';
                getAllOptions(url,function(data){
                    res.send(data);
                });
            }
        }
    });
    app.get('/getDetailByCity', function (req, res) {
        getDetailByCity();
        res.send();
    });
    app.post('/getDataByCityId', function (req, res){
        let id=req.body.id;
        getDataByCityId(id,function (data) {
            res.send(data);
        });

    });
    //获取城市列表
    app.get('/getCityList', function (req, res){
        let type=req.query.type;
        let outputFilePath='./public/json/allCityList.json';
        var filestr={};
        console.log('************:'+type);
        if(0==type){
            let url=crawlerhost;
            getCityList(url,outputFilePath,function(data){
                res.send(data);
            });
        }else {
            if(fs.readFileSync(outputFilePath)){
                filestr=JSON.parse(fs.readFileSync(outputFilePath));
                res.send(filestr);
            }else {
                let url=crawlerhost;
                getCityList(url,function(data){
                    res.send(data);
                });
            }
        }

    });
    //爬虫所有行业选项
    function getAllOptions(url,callback){
       request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // 请求成功的处理逻辑
                let html = body.toString();
                let $ = cheerio.load(html);
                let opt=[];
                let outputFilePath='./public/json/options2.json';
                $('#industry_10').children('option').each(function () {
                    let json={};
                    json.val=$(this).val();
                    json.text=$(this).text();
                    opt.push(json);
                });
                let filestr={};
                filestr.name="所有行业选项";
                filestr.data=opt;
                fs.writeFileSync(outputFilePath,JSON.stringify(filestr));
                callback(filestr);
            }else {
                callback(error);
            }
        });
    }
    //获取城市列表
    function getCityList(url,outputFilePath,callback){
        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                // 请求成功的处理逻辑
                let html = body.toString();
                let $ = cheerio.load(html);
                let opt=[];
                $('#listCity').children('li').find('a').each(function () {
                    let onclickTex=$(this).attr('onclick');
                    let txt=$(this).text();
                    let json={};
                    json.option=txt;
                    json.id=onclickTex.split(',')[1].replace(')','');
                    opt.push(json);
                });
                var filestr={};
                filestr.name="所有城市选项";
                filestr.data=opt;
                fs.writeFileSync(outputFilePath,JSON.stringify(filestr));
                callback(filestr);
            }else {
                callback(error);
            }
        });
    }
    //获取城市的数据
    function getDataByCityId(id,callback){
        var options={
            url:'http://top.zhaopin.com/Home/Top50?id=HotJobTop&city='+id+'&time=2',
            method:"GET"
        };
        request(options,function (err, response, body) {
            if(err){
                callback(error);
            }else{
                console.log(25);
                let html = body.toString();
                let $ = cheerio.load(html);
                let opt=[];
                let outputFilePath='./public/json/options.json';
                $('#industry_10').children('option').each(function () {
                    let json={};
                    json.val=$(this).val();
                    json.text=$(this).text();
                    opt.push(json);
                });
                let filestr={};
                filestr.name="所有行业选项";
                filestr.data=opt;
                fs.writeFileSync(outputFilePath,JSON.stringify(filestr));
                callback(filestr);
                $('#top50')
            }
        })
    }
    //城市
    function getDetailByCityId(id,callback){
        var options={
            url:'http://top.zhaopin.com/Home/_Top50Detail?Length=4',
            method:"POST",
            data:{
                industry_10:'',
                time_10:2,
                cityId:489,
                cityName:'',
                isAjaxRequest:true,
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
};