var decode = require("./decode").decode;
var base = require("./base")


base.getModel("1412010961144",function (model,atthorName,modelName){

decode(model,function (s1,filter,pass,length){
	// console.log(length)
	console.log("作者：",atthorName);
	console.log("模型名字：",modelName);
	// console.log("s1:",s1.length)
	// console.log("s1",s1.length)
	var s1 = s1[s1.length-1][0];
	// console.log(s1)
	for (var i = 1; i < s1.length; i++) {
		
		console.log(i,s1[i].length)
		console.log("=========top===========")
		console.log(s1[i])
		console.log("==========down=========")
	};

	// console.log(filter[0][1])

	// console.log(pass)
})

})