'use strict';
let request = require('sync-request');
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
        console.log(1111)
        res.render('index', { title: 'Express' });
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
};