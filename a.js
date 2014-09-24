var fs = require("fs")

var a = '[{"lotterytype":"SportteryNWDL","match":"105#4.04-4.04,3.0-3.2,4.02-4.02,4.57-4.57,3.71-3.71,4.6-4.6,3.91-3.91,4.68-4.68,4.01-4.01,3.22-3.22,3.23-3.23,4.76-4.76","option":"","filter":"555#12,22,23,33|888#1","sort":"428#2014-09-23_2_1_1","pass":"111#100_2","update_time":"2014-09-23 23:43:09","ver":1}]'
var json = eval(a)
var lotterytype = json[0]["lotterytype"]
var match = json[0]["match"]
var option = json[0]["option"]
var sort = json[0]["sort"]
var pas = json[0]["pass"]
var update_time = json[0]["update_time"]
// console.log(json[0]["match"])
// var b = a.split("|");
// var c = b[0].split("#");
// console.log(b[0])
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
 * @param  {[type]}  code
 * @param  {[type]}  num
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

// for (var i = 0; i < b.length; i++) {
// 	c = b[i].split("#");
// 	console.log(c[0])

// };

function decode(code)
{
	// switch(code[0])
	// {

	// }
}

// console.log(b[0],"\n",c[0]);
