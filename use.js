var fs = require("fs");
var base = require("./base");

function use( parameter , optionType,lotteryType) 
{
	switch (type)
		"match" : 
			return _match(parameter,lotteryType);
			break;
		"option" :
			return _option(parameter,lotteryType);
			break;
		"filter":
			return _filter(parameter,lotteryType);
			break;
		"sort": 
			return _sort(parameter,lotteryType);
			break;
		"pass" :
			return _pass(parameter,lotteryType);
			break;
		default:
			return false;
}

function _match(parameter,lotteryType)
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

	})
}