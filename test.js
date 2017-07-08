'use strict';
// let request = require('sync-request');
let request = require('request');
let cheerio = require('cheerio');
let fs = require('fs');
let url='http://top.zhaopin.com/Home/Top50?id=HotJobTop&city=749&time=2';
// getAllOptions(url);
getAllOptions(url);
//爬虫所有行业选项
function getAllOptions(url){
    // let html = request('GET',url).getBody().toString();
  var filestr= request(url, function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                         // 请求成功的处理逻辑
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
                        var filestr={};
                        filestr.name="所有行业选项";
                        filestr.data=opt;
                        fs.writeFileSync(outputFilePath,JSON.stringify(filestr));
                        return filestr;
                    }
                });

}
//获取城市列表
function getCityList(url){
    let html = request('GET', url).getBody().toString();
    let $ = cheerio.load(html);
    let opt=[];
    let outputFilePath='./public/json/allCityList.json';
    $('#listCity').children('li a').each(function () {
        let onclickTex=$(this).attr('onclick');
        let txt=$(this).text();
        let json={};
        json.option=txt;
        json.id=onclickTex.split(',')[1];
        opt.push(json);
    });
    var filestr={};
    filestr.name="所有城市选项";
    filestr.data=opt;
    fs.writeFileSync(outputFilePath,JSON.stringify(filestr));
    return filestr;
}