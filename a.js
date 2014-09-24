var fs = require("fs")

/**
 * [a code源码]
 * @type {String}
 */
var a = '[{"lotterytype":"SportteryNWDL","match":"100#1001,1008,1011|1001#8,17,23,34,35|1006#238,20,36,37,40,136,155,325|1007#24,44,131|1008#1,11,13,14,16,27,28,436,308,295,270,246,140,133,460|1009#357,384,463,465,480,498,679,1124,1132|1011#851,853|1010#19,21,29,80,101,213,217,323,327,328,329,330,333,334,335,336,346,373,1024|2029#3-4,4-5|1109#3-4","option":"","filter":"555#12,13,21,22,31|888#3","sort":"4259#2014-09-08_2_0_1","pass":"111#100_2","update_time":"2014-09-08 21:21:42","ver":1}]'

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
	// var _match = match.split("|")

	//获取联赛的筛选
	for (var i = 0; i < _match.length; i++) {
		// console.log(_match)
		var s_match = _match[i].split("#")
		// console.log(s_match)
		if( isNum(code , s_match[0]) )
		{

			var temp = s_match[1].split(",")
			// console.log(temp)
			for (var i_1 = 0; i_1 < temp.length; i_1++) {
				var result = getName(code,s_match[0],temp[i_1])
				// console.log("详细：" + result)
				if( s_match[0] == "100" )
				{
					console.log("联赛集合：" + result)
				}
				else
				{
					console.log("详细：" + result)
				}
			};
		}
		else//赔率
		{
			var temp = s_match[1].split(",")
			// console.log(temp)
			var result = getPriceName(code,s_match[0])
			console.log("赔率："+ result)
			console.log("范围：" + temp)
		}
	};

})

/**
 * [isNum 判断是否为自定义区间]
 * @param  {[json]}  code
 * @param  {[数值]}  num
 * @return {Boolean}
 */
function isNum(code,num)
{
	var temp_1 = code[0]["match"]["H985"]["child"];
	for (var i = 0; i < temp_1.length; i++) {
		if( temp_1[i] == "H" + num )
			return false;
	};
	var temp_2 = code[0]["match"]["H9859"]["child"]
	for (var i = 0; i < temp_2.length; i++) {
		if( temp_2[i] == "H" + num )
			return false
	};
	return true
}

/**
 * [getName 获取对应中文名字]
 * @json地图  {[json]} code
 * @对应的ID  {[type]} id
 * @对应的节点  {[type]} point
 * @return {[type]}
 */
function getName(code,id,point)
{
	return code[0]["match"]["H" + id]["default"][point]
}

/**
 * [getPriceName 获取对于赔率的名字]
 * @param  {[type]} code
 * @param  {[type]} id
 * @param  {[type]} point
 * @return {[type]}
 */
function getPriceName(code,id)
{
	return code[0]["match"]["H" + id]["name"]
}