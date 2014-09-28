var fs = require("fs");
var base = require("./base");

function use( parameter , optionType,lotteryType,callback) 
{
	switch (optionType)
	{
		case "match" : 
			_match(parameter,lotteryType,function (result){
				callback(result);
			})
			// callback((_match(parameter,lotteryType))
			break
		case "option" :
			_option(parameter,lotteryType,function (result){
				callback(result);
			})
			// callback(_option(parameter,lotteryType))
			break
		case "filter":
			_filter(parameter,lotteryType,function (result) {
				callback(result);
			})
			// callback(_filter(parameter,lotteryType))
			break
		case "sort": 
			// console.log("11111"   + parameter)
			_sort(parameter,lotteryType,function (result) {
				callback(result);
			})
			// callback(_sort(parameter,lotteryType))
			break
		// case "pass" :
		// 	callback(_pass(parameter))
		// 	break
		default:
			callback(false)
	}
}

function _match(parameter,lotteryType,callback)
{
	var type = lotteryType;
	if( type == "SportteryNWDL" )
	{
		//非让球模型
		type = "code.json";
	}
	else
	{
		//让球模型
		type = "code-new.json";
	}
	fs.readFile(type,"utf-8",function (err,list){
		var code = eval(list); //解析json

		var result = [];

		// result.push("场次和赔率","\n");

		var param = parameter.split("|");//分割参数

		for (var i = 0; i < param.length; i++) { //使用了i
			//处理每一个小单元参数
			var  s_match = param[i].split("#");

			if( base.isNum(code,s_match[0]) )
			{
				//联赛
				var temp = s_match[1].split(",");

				for (var i_1 = 0; i_1 < temp.length; i_1++) {
					if( s_match[0] == "100" )
					{
						result.push("联赛集合：" + base.getName(code,"match",s_match[0],temp[i_1]) + "\n");
					}
					else
					{
						result.push("联赛：" + base.getPriceName(code,"match",s_match[0]) + base.getName(code,"match",s_match[0],temp[i_1]) + "\n");
					}
				}
			}
			else
			{
				var temp = s_match[1].split(",");

				var peilvName = base.getPriceName(code,"match",s_match[0]);

				if( s_match[0].length == 3 )
				{
					//初始赔率
					result.push("初始赔率：" + peilvName + "\n");
					result.push("范围：" + temp + "\n");
				}
				else
				{
					//新赔
					result.push("最新赔率：" + peilvName + "\n");
					result.push("范围：" + temp + "\n");
				}
			}
		}
		//返回值
		callback(result);
	})
}

function _filter(parameter,lotteryType,callback)
{
	var result = [];

	var type = lotteryType;
	if( type == "SportteryNWDL" )
	{
		//非让球模型
		type = "code.json";
	}
	else
	{
		//让球模型
		type = "code-new.json";
	}
	fs.readFile(type,"utf-8",function (err,list){
		var code = eval(list); //解析json
		var filter = parameter.split("|");
		for (var i = 0; i < filter.length; i++) {
			var s_filter = filter[i].split("#");

			if( s_filter == "999" ) //999 赔率积
			{
				var temp = s_filter[1].split(",");

				result.push("赔率积：" + temp + "\n");
			}
			else if( s_filter[0] == "556") // 按注排序截取
			{
				var temp = s_filter[1].split("_");
				if( temp[0] == "1" )
				{
					var paixu = "奖金由高到低排序";
				}
				else
				{
					var paixu = "概率由高到底排序";
				}

				result.push(paixu + ":"  + temp[1] + "\n");
			}
			else
			{
				var filter_result_1 = base.filter_type(code,s_filter[0]);
				var filter_result_2 = base.filter_name(code,s_filter[0],s_filter[1]);

				result.push(filter_result_1 + ":" + filter_result_2 + "\n");
			}
		};
		callback(result);
	})
}

function _pass(parameter,callback)
{
	var result = [];
	var temp = parameter.split("_");

	result.push("过关方式： " + temp[1] + " 串 1 "  + "\n");
	callback(result);
}

function _option( parameter,lotteryType,callback)
{
	var result = [];
	// console.log(Number(parameter)  != NaN)
	if( Number(parameter)  != NaN)
	{
		// console.log("kong")
		callback(result);
		return false;
	}

	var option = parameter.split("|");

	var type = lotteryType;
	if( type == "SportteryNWDL" )
	{
		//非让球模型
		type = "code.json";
	}
	else
	{
		//让球模型
		type = "code-new.json";
	}

	fs.readFile(type,"utf-8",function (err,list){
		var code = eval(list); //解析json

		for (var i = 0; i < option.length; i++) {
			var s_option = option[i].split("#");

			if( base.isNum(code, s_option[0]) )
			{
				var temp = s_option[1].split(",");
				for (var i_1 = 0; i_1 < temp.length; i_1++) {
					var result_1 = base.getPriceName(code,"option",s_option[0]);
					var result_2 = base.getName(code,"option",s_option[0],temp[i_1]);

					result.push(result_1 + " ：" + result_2 + "\n");
				};
			}
			else
			{
				var temp = s_option[1].split(",")
				// console.log("temp")
				result.push("赔率："+ base.getPriceName(code,"option",s_option[0]),"\n")
				result.push("范围：" + temp,"\n")
			}
		};
		callback(result);
	})
}

function _sort(parameter,lotteryType,callback)
{
	// console.log( "sdfsdf" + parameter )
	var result = [];

	var type = lotteryType;

	if( type == "SportteryNWDL" )
	{
		//非让球模型
		type = "code.json";
	}
	else
	{
		//让球模型
		type = "code-new.json";
	}
	// console.log("json"  + type)
	var sort_ = parameter.split("#") //423#2014-09-24_8_1_5
	var sort_1 = sort_[0]//423
	var sort_2 = sort_[1]//2014-09-24_8_1_5
	var sort_3 = sort_2.split("_")
	var sort_4 = sort_3[0]//2014-09-24
	var sort_5 = sort_3[1]//8
	var sort_6 = sort_3[2]//1
	var sort_7 = sort_3[3]//5

	fs.readFile(type,"utf-8", function (err,list){

		var code = eval(list);
		// console.log( "sdfsdfdf" + base.getSortName(code,sort_1 + "_" + sort_6))
		var result_sort = base.getSortName(code,sort_1 + "_" + sort_6)

		result.push("按期排序截取：",result_sort,"\n");
		result.push("从第几场开始：",sort_7,"\n");
		result.push("截取场数：",sort_5,"\n");

		callback(result);
	})
}

exports.use = use;