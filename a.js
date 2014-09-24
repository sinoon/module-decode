var fs = require("fs")
var base = require("./base.js")
var async = require("async");

/**
 * [a code源码]
 * @type {String}
 */
var a = '[{"lotterytype":"SportteryNWDL","match":"121#1.48-1.66,1.86-2.03,2.04-2.24,2.25-10000.0|122#2.69-2.91,3.45-3.93,2.92-3.14,3.15-3.44,2.5-2.7|100#1001,1011|1001#8,17,23,34,35|1006#36,37,136,196,238,20|1007#24,44,131,182|1008#1,11,13,14,16,28,133,140,246,270,295,308,436,460|1009#7,357,463,465,498,1124,1132|1010#19,21,29,80,213,217,323,327,328,329,330,333,335,336,346,495,1024|1011#851,853","option":"","filter":"555#11,12,22|888#1","sort":"427#2014-09-09_2_0_1","pass":"111#100_2","update_time":"2014-09-09 18:03:15","ver":1}]'

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
var option = json[0]["option"].split("|")
var sort = json[0]["sort"]
var pass = json[0]["pass"]
var filter = json[0]["filter"].split("|")
var update_time = json[0]["update_time"]




	var content = []
if( (!lotterytype.indexOf("$") <= 0) && (lotterytype == "SportteryNWDL")) //判断是否为多场次选取
{
fs.readFile("code.json","utf-8",function (err,list){
	var code = eval(list)

	var _match = match
	// var _match = match.split("|")
	console.log("场次和赔率")
	content.push("场次和赔率","\n")
	//match
	for (var i = 0; i < _match.length; i++) {
		// console.log(_match)
		var s_match = _match[i].split("#")
		// console.log(s_match)
		if( base.isNum(code , s_match[0]) )
		{

			var temp = s_match[1].split(",")
			// console.log(temp)
			for (var i_1 = 0; i_1 < temp.length; i_1++) {
				var result = base.getName(code,"match",s_match[0],temp[i_1])
				// console.log("详细：" + result)
				if( s_match[0] == "100" )
				{
					console.log("联赛集合：" + result)
					content.push("联赛集合：" + result,"\n")
				}
				else
				{
					console.log("详细：" + result)
					content.push("详细：" + result,"\n")
				}
			}
		}
		else//赔率
		{
			var temp = s_match[1].split(",")
			// console.log(temp)
			var result = base.getPriceName(code,"match",s_match[0])
			console.log("赔率："+ result)
			content.push("赔率："+ result,"\n")
			console.log("范围：" + temp)
			content.push("范围：" + temp,"\n")
		}
	}//end of match

	console.log("___________________________________________________________________")
	content.push("___________________________________________________________________","\n")

	console.log("过滤")
	content.push("过滤","\n")
	//filter
	for (var i = 0; i < filter.length; i++) {
		var temp = filter[i].split("#")
		if( temp[0] == "999"  ) //赔率积
		{
			var result = temp[1].split(",")
			console.log("赔率积：",result.toString())
			content.push("赔率积：",result.toString(),"\n")
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
			content.push(paixu,":",result[1],"\n")
		}
		else
		{
			var result_1 = base.filter_type(code,temp[0])
			var result_2 = base.filter_name(code,temp[0],temp[1])

			console.log(result_1 , ":" ,result_2)
			content.push(result_1 , ":" ,result_2,"\n")
		}
	}//end of filter

	console.log("组合")
	content.push("组合","\n")
	//pass
	_pass = pass.split("_")
	console.log("过关方式：",_pass[1],"串 1")
	content.push("过关方式：",_pass[1],"串 1","\n")

	console.log("___________________________________________________________________")
	content.push("___________________________________________________________________","\n")

	console.log("筛选选项")
	content.push("筛选选项","\n")
	//option
	if( option != "")
	{
		for (var i = 0; i < option.length; i++) {
			// console.log(_match)
			var s_option = option[i].split("#")
			// console.log(s_option)
			if( base.isNum(code , s_option[0]) )
			{
				var temp = s_option[1].split(",")
				// console.log(temp)
				for (var i_1 = 0; i_1 < temp.length; i_1++) {
					var result_1 = base.getPriceName(code,"option",s_option[0])
					var result_2 = base.getName(code,"option",s_option[0],temp[i_1])
					// console.log("详细：" + result)
					console.log(result_1 , ":" , result_2)
					content.push(result_1 , ":" , result_2,"\n")
				}
			}
			else//赔率
			{
				var temp = s_option[1].split(",")
				// console.log(temp)
				var result = base.getPriceName(code,"option",s_option[0])
				console.log("赔率："+ result)
				content.push("赔率："+ result,"\n")
				console.log("范围：" + temp)
				content.push("范围：" + temp,"\n")
			}
		}
	}//end of option

	console.log("___________________________________________________________________")
	content.push("___________________________________________________________________","\n")

	console.log("截取方式")
	content.push("截取方式","\n")
	//sort
	var sort_ = sort.split("#") //423#2014-09-24_8_1_5
	var sort_1 = sort_[0]//423
	var sort_2 = sort_[1]//2014-09-24_8_1_5
	var sort_3 = sort_2.split("_")
	var sort_4 = sort_3[0]//2014-09-24
	var sort_5 = sort_3[1]//8
	var sort_6 = sort_3[2]//1
	var sort_7 = sort_3[3]//5

	var result_sort = base.getSortName(code,sort_1 + "_" + sort_6)
	console.log("按期排序截取：",result_sort)
	content.push("按期排序截取：",result_sort,"\n")
	console.log("从第几场开始：",sort_7)
	content.push("从第几场开始：",sort_7,"\n")
	console.log("截取场数：",sort_5)
	content.push("截取场数：",sort_5,"\n")



	async.eachSeries(content,function (list , next){
		// if(typeof list.proxy != "undefined") {
			// console.log(list)
			fs.appendFile('result.txt', list, function (err){  
			    	// console.log(list);
			    	next();    
			})
		// }
		// next()
		},function (err){
			if (err) return console.error(err.stack);

			console.log('完成');
		}); //end of async
})

}//结束判断 是否为多场次选取


// fs.unlink('result.txt', function (){
	// start(function(err,content){
	





	// })
// });//end of unlink