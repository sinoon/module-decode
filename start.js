var decode = require("./decode").decode;
var base = require("./base")


base.getModel("1411986036837",function (a){

decode(a,function (s1,filter,pass,length){
	console.log(length)
	var s1 = s1[1][0];

	for (var i = 1; i < s1.length; i++) {
		
		console.log(i,s1[i].length)
		console.log("=========top===========")
		console.log(s1[i])
		console.log("==========down=========")
	};
	
	console.log(filter[0][1])

	console.log(pass)
})

})