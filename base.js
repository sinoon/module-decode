var request = require('request');

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
	var temp_3 = code[0]["option"]["H986"]["child"]
	for (var i = 0; i < temp_3.length; i++) {
		if( temp_3[i] == "H" + num )
			return false
	};
	var temp_4 = code[0]["option"]["H9869"]["child"]
	for (var i = 0; i < temp_4.length; i++) {
		if( temp_4[i] == "H" + num )
			return false
	};
	return true
}
exports.isNum = isNum


/**
 * [getName 获取对应中文名字]
 * @json地图  {[json]} code
 * @对应的ID  {[type]} id
 * @对应的节点  {[type]} point
 * @return {[type]}
 */
function getName(code,scope,id,point)
{
	return code[0][scope]["H" + id]["default"][point]
}
exports.getName = getName

/**
 * [getPriceName 获取对于赔率的名字]
 * @param  {[type]} code
 * @param  {[type]} id
 * @param  {[type]} point
 * @return {[type]}
 */
function getPriceName(code,scope,id)
{
	return code[0][scope]["H" + id]["name"]
}
exports.getPriceName = getPriceName

function filter_type(code,id)
{
	return code[0]["filter"]["H" + id]["name"]
}
exports.filter_type = filter_type

function filter_name(code,id,point) 
{
	if( id == "555" )
	{
		var result = []
		var temp;
		point = point.split(",")
		for (var i = 0; i < point.length; i++) {
			temp = code[0]["filter"]["H" + id]["default"][point[i]]
			result.push(temp)
		}
		return result
	}
	return code[0]["filter"]["H" + id]["default"][point]
}
exports.filter_name = filter_name

function getSortName(code,point)
{
	return code[0]["sort"]["S001"]["default"][point]
}
exports.getSortName = getSortName

function getModel(mId,callback)
{
	request({url:'http://winner.okooo.com/model/info?mid=' + mId,headers:{'User-Agent':'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
	  'Accept':'text/html;q=0.9,*/*;q=0.8',
	  'Accept-Charset':'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
	  'Connection':'close',
	  'Referer':'None'}}, function (err, res,body) {
	  if (err) return err;

	  var _model = body.match("var methodlist = '(.*)'")
	  var model = "[" + _model[1] + "]";

	  var _name = body.match("<h2 class=\"model_name\">(.*)<a href");
	  var name = _name[1].split("-");
	  var authorName = name[0];
	  var modelName = name[1];

	  callback(model,authorName,modelName);
	  // 输出结果
	});
}

exports.getModel = getModel;

function getModelName(mId,callback)
{
	request({url:'http://winner.okooo.com/model/info?mid=' + mId,headers:{'User-Agent':'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11',
	  'Accept':'text/html;q=0.9,*/*;q=0.8',
	  'Accept-Charset':'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
	  'Connection':'close',
	  'Referer':'None'}}, function (err, res,body) {
	  if (err) return err;

	  var t = body.match("<h2 class=\"model_name\">(.*)<a href")
	  // var a = "[" + t[1] + "]";
	  var t = t[1].split("-");

	  callback(t[0],t[1]);
	  // 输出结果
	});
	
}

exports.getModelName = getModelName; 