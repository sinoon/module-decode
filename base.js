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
exports.isNum = isNum


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
exports.getName = getName

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
		for (var i = 0; i < id.length; i++) {
			temp = code[0]["filter"]["H" + id]["default"][point[i]]
			result.push(temp)
		}
		return result
	}
	return code[0]["filter"]["H" + id]["default"][point]
}
exports.filter_name = filter_name