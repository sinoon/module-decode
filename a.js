var fs = require("fs")

/**
 * [a code源码]
 * @type {String}
 */
var a = '[{"lotterytype":"SportteryNWDL","match":"105#4.04-4.04,3.0-3.2,4.02-4.02,4.57-4.57,3.71-3.71,4.6-4.6,3.91-3.91,4.68-4.68,4.01-4.01,3.22-3.22,3.23-3.23,4.76-4.76","option":"","filter":"555#12,22,23,33|888#1","sort":"428#2014-09-23_2_1_1","pass":"111#100_2","update_time":"2014-09-23 23:43:09","ver":1}]'

/**
 * [json 解析源码]
 * @type {[type]}
 */
var json = eval(a)

/**
 * [lotterytype 	description]
 * [match 			description]
 * [option 			description]
 * [sort 			description]
 * [update_time 	description]
 * @type {[string]}
 */
var lotterytype = json[0]["lotterytype"]
var match = json[0]["match"]
var option = json[0]["option"]
var sort = json[0]["sort"]
var pass = json[0]["pass"]
var update_time = json[0]["update_time"]



fs.readFile("code.json","utf-8",function (err,list){
	var code = eval(list)
	var _match = match.split("|")
	// console.log(_match)
	var s_match = _match[0].split("#")
	//分割完毕-105,3.0-3.2
	// console.log(s_match)
	console.log(isNum(code,"100"))
	// console.log(code[0]["match"])
})

/**
 * [isNum 判断是否为自定义区间]
 * @param  {[json]}  code
 * @param  {[数值]}  num
 * @return {Boolean}
 */
function isNum(code,num)
{
	var temp = code[0]["match"]["H985"]["child"];
	for (var i = 0; i < temp.length; i++) {
		if( temp[i] == "H" + num )
			return false;
	};
	return true
}
