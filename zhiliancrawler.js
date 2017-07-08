var cheerio = require('cheerio');
var request = require('sync-request');
var fs = require('fs');
//爬页面所有行业
var optionsUrl='http://top.zhaopin.com/Home/Top50?id=HotJobTop&city=749&time=2';
function getAllOptions(url){
	var html = request('GET', url).getBody().toString();
	var $ = cheerio.load(html);
	var opt=[];
	var outputFilePath='./options.json';
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
	var JsonObj=JSON.parse(fs.readFileSync(outputFilePath));
	console.log(JsonObj);
}
//getAllOptions(optionsUrl);
//爬页面所有行业end


//城市编号
var listCity;
//ajax爬全国
function getNationwide(url) {
	var html = request('GET', url).getBody().toString();
	var $ = cheerio.load(html);
	console.log($)
	// var opt=[];
	// var outputFilePath='./nationwide.json';
	// $('#industry_10').children('option').each(function () {
	// 	var json={};
	// 	json.val=$(this).val();
	// 	json.text=$(this).text();
	// 	opt.push(json);
	// });
    //
	// var filestr={
	// 	data:opt,
	// 	name:'全国'
	// };
	// fs.writeFileSync(outputFilePath,JSON.stringify(filestr));
	// var JsonObj=JSON.parse(fs.readFileSync(outputFilePath));
	// console.log(JsonObj);
}
var ajaxNationwideUrl='http://top.zhaopin.com/Home/_Top50Detail?Length=4';
getNationwide(ajaxNationwideUrl);
//ajax爬全国 end