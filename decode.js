var use = require("./use").use;
var EventProxy = require("eventproxy");


function decode(a,callback) {



	// var a ='[{"lotterytype":"SportteryNWDL$SportteryNWDL","match":"121#1.59-2.18|122#2.8-3.8|1219#1.48-2.08|1109#2.91-3.40,3.41-4.15|100#1009,1001,1008,1011|1001#17,23,34,35,8|1006#20,36,40,136,155,196,238,37,325|1007#18,24,44,131,182|1008#1,11,13,14,27,28,133,140,246,270,295,308,436,460,16|1009#7,357,384,463,465,480,498,679,1124,1132|1011#851,853|1010#19,80,101,213,327,217,328,329,330,334,335,336,346,1024,29,373,21,333,323|110#2.36-2.90,2.91-3.40$2029#3-4|100#1001,1009,1011,1008,1010,1007|1001#8,17,34,35,23|1006#20,36,37,40,136,155,238,242,325|1007#24,44,131,402,182,18|1008#1,11,13,14,27,28,133,140,246,270,295,308,436,460,16|1009#7,357,384,463,465,480,498,679,1124,1132|1011#851,853|1010#19,29,80,101,213,217,323,327,328,329,330,333,334,335,336,346,373,495,1024,21","option":"$","filter":"555#12,22,21,13,31|888#3","sort":"425#2014-09-13_1_0_1$4259#2014-09-13_1_0_1","pass":"111#100_2","update_time":"2014-09-14 01:35:18","ver":1}]';

	var json = eval(a);

	var lotterytype = json[0]["lotterytype"];

	var _lotterytype = lotterytype.split("$");
	var _match = json[0]["match"].split("$");
	var _sort = json[0]["sort"].split("$");
	var _option = json[0]["option"].split("$");
	var _filter = json[0]["filter"]
	var _pass = json[0]["pass"].split("|");

	var content = [];
	var result_1 = []

	var ep = new EventProxy();

	ep.all("s1","filter","pass","length",function(s1,filter,pass,length){
		callback(s1,filter,pass,length+1)
	})

	for (var i = 0; i < _lotterytype.length; i++) 
	{
		// console.log("start")
			result_1[i] = []
			result_1[i][0] = []
			// result_1[i][1] = []
			// result_1[i][2] = []
			use(_match[i],"match",_lotterytype[i], function(result) 
			{
				// console.log("match")
				// console.log(result);
				result_1[i][0].push(result)
			})
			use(_sort[i],"sort",_lotterytype[i], function(result) 
			{
				// console.log("sort")
				// console.log(result);
				result_1[i][0].push(result)
			})
			use(_option[i],"option",_lotterytype[i], function(result) 
			{
				// console.log("option")
				// console.log(result);
				result_1[i][0].push(result)
			})
			if( i + 1 == _lotterytype.length )
			{
				ep.emit("s1",result_1);
				ep.emit("length",i)
				break;
			}
	}

	var result_filter = [];
	use(_filter,"filter",_lotterytype[0],function(result){
		// console.log("filter")
		// console.log(result);
		var temp = {"1" : result}
		result_filter.push(temp)

		ep.emit("filter",result_filter)
	})

	var result_pass = []
	use(_pass,"pass",_lotterytype[0],function (result){
		// console.log("pass")
		// console.log(result);
		result_pass.push(result)
		ep.emit("pass",result_pass)
		
	})


}

exports.decode = decode