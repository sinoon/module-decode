var decode = require("./decode").decode;
var base = require("./base")

var model;

base.getModel("1410426920114",function (model,atthorName,modelName){

	decode(model,function (s1,filter,pass,length){
		console.log("作者：",atthorName);
		console.log("模型名字：",modelName);
		for (var i = 0; i < s1.length; i++) {
			// console.log(i)
			var temp = s1.length;
			// console.log(temp)
			for (var i_1 = 0; i_1 < 4; i_1++) {
				console.log(i_1)
				console.log(s1[i][i_1])
				console.log("==========")
			};
			console.log("-------------------")
		};

		// console.log(filter[0][1])

		// console.log(pass)
	})

})