'use strict';
// let request = require('sync-request');
let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
module.exports = function(app) {
    app.post('/optionsUrl',function (req,res){
        let type=req.body.type;
        let outputFilePath='./public/json/options.json';
        var filestr={};
        if(0==type){
            let url='http://top.zhaopin.com/Home/Top50?id=HotJobTop&city=749&time=2';
             filestr=getAllOptions(url);
        }else {
            if(fs.readFileSync(outputFilePath)){
                filestr=JSON.parse(fs.readFileSync(outputFilePath));
            }else {
                let url='http://top.zhaopin.com/Home/Top50?id=HotJobTop&city=749&time=2';
                 filestr=getAllOptions(url);
            }
        }
        res.send(filestr);
    });
    app.get('/', function (req, res) {
        res.render('index', { title: 'Express' });
    });
    app.get('/getDetailByCity', function (req, res) {
        getDetailByCity();
        res.send();
    });
    //爬虫所有行业选项
    function getAllOptions(url){
        let html = request('GET', url).getBody().toString();
        let $ = cheerio.load(html);
        let opt=[];
        let outputFilePath='./public/json/options.json';
        $('#industry_10').children('option').each(function () {
            let json={};
            json.val=$(this).val();
            json.text=$(this).text();
            opt.push(json);
        });
        var filestr={};
        filestr.name="所有行业选项";
        filestr.data=opt;
        fs.writeFileSync(outputFilePath,JSON.stringify(filestr));
        return filestr;
    }
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