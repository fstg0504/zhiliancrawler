'use strict';
var request = require('sync-request');
var cheerio = require('cheerio');
var fs = require('fs');
module.exports = function (app) {
    app.get('/optionsUrl',function (req,res) {
        console.log("optionsUrl");
        var url='http://top.zhaopin.com/Home/Top50?id=HotJobTop&city=749&time=2';
        var html = request('GET', url).getBody().toString();
        var $ = cheerio.load(html);
        var opt=[];
        var outputFilePath='./public/json/options.json';
        $('#industry_10').children('option').each(function () {
            var json={};
            json.val=$(this).val();
            json.text=$(this).text();
            opt.push(json);
        });
        var filestr={
            data:opt,
            name:'所有行业选项'
        };
        fs.writeFileSync(outputFilePath,JSON.stringify(filestr));
        res.send(filestr);
    });
    app.get('/', function (req, res) {
        console.log(1111)
        res.render('index', { title: 'Express' });
    });
};