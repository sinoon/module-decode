var fs = require("fs")
var base = require("./base.js")


/**
 * [a code源码]
 * @type {String}
 */
var a = '[{"lotterytype":"SportteryNWDL","match":"100#1001,1008,1011|1001#8,17,23,34,35|1006#238,20,36,37,40,136,155,325|1007#24,44,131|1008#1,11,13,14,16,27,28,436,308,295,270,246,140,133,460|1009#357,384,463,465,480,498,679,1124,1132|1011#851,853|1010#19,21,29,80,101,213,217,323,327,328,329,330,333,334,335,336,346,373,1024|2029#3-4,4-5|1109#3-4","option":"","filter":"555#12,13,21,22,31|888#3|999#1-2|556#2_3-4","sort":"4259#2014-09-08_2_0_1","pass":"111#100_2","update_time":"2014-09-08 21:21:42","ver":1}]'

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
var match = json[0]["match"].split("|")
var option = json[0]["option"]
var sort = json[0]["sort"]
var pass = json[0]["pass"]
var filter = json[0]["filter"].split("|")
var update_time = json[0]["update_time"]



fs.readFile("code.json","utf-8",function (err,list){
	var code = eval(list)

	var _match = match
	// var _match = match.split("|")

	//获取联赛的筛选
	for (var i = 0; i < _match.length; i++) {
		// console.log(_match)
		var s_match = _match[i].split("#")
		// console.log(s_match)
		if( base.isNum(code , s_match[0]) )
		{

			var temp = s_match[1].split(",")
			// console.log(temp)
			for (var i_1 = 0; i_1 < temp.length; i_1++) {
				var result = base.getName(code,s_match[0],temp[i_1])
				// console.log("详细：" + result)
				if( s_match[0] == "100" )
				{
					console.log("联赛集合：" + result)
				}
				else
				{
					console.log("详细：" + result)
				}
			}
		}
		else//赔率
		{
			var temp = s_match[1].split(",")
			// console.log(temp)
			var result = base.getPriceName(code,s_match[0])
			console.log("赔率："+ result)
			console.log("范围：" + temp)
		}
	}//end of match

	//filter
	for (var i = 0; i < filter.length; i++) {
		var temp = filter[i].split("#")
		if( temp[0] == "999"  ) //赔率积
		{
			var result = temp[1].split(",")
			console.log("赔率积：",result.toString())
		}
		else if( temp[0] == "556" ) //按注排序截取
		{
			var result = temp[1].split("_")
			if( result[0] == "1" )
			{
				var paixu = "奖金由高到低排序"
			}
			else
			{
				var paixu = "概率由高到低排序"
			}
			// var jiequ = 

			console.log(paixu,":",result[1])
		}
		else
		{
			var result_1 = base.filter_type(code,temp[0])
			var result_2 = base.filter_name(code,temp[0],temp[1])

			console.log(result_1 , ":" ,result_2)
		}

		
		
	};

})