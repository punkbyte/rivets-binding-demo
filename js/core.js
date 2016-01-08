var logIt = function () {  
	console.log(arguments);
	var count = Array.prototype.slice.call(arguments).length;
	$new = $("<pre></pre>").text(count+":"+Array.prototype.slice.call(arguments).join(' ')).appendTo("#container");
	return "Finished";
}
var startTime;
var data = {
	'list_name':'Boom Goes the Dynamite!',
	'list':[
		{'key':'key one','value':'value one!','count':0},
		{'key':'key two','value':'value two!!','count':0},
		{'key':'key three','value':'value three!!!','count':0},
		
	]
	
}


$(document).ready(function(){
	logIt("Starting","up");
	$(document).on("click","#trigger1",go_trigger1);
	$(document).on("click","#trigger2",go_trigger2);
	$(document).on("click","#trigger3",go_trigger3);
	
	rivets.formatters.addOne = function(val) {
		return val+1;
	};
	rivets.formatters.setIdName = function(val){
		return "item_"+val;
	}
	rivets.formatters.countList = function(val){
		if(val.length>0){
			return true;
		}else{
			return false;
		}
	}
	rivets.formatters.getCount = function(arr){	
		return arr.length;
	}

	rivets.bind($('#rivet-test'),{
		data:data,
		controller:{
			addItem:function(e,model){
				var l = 1+data.list.length;
				model.data.list.push({'key':'key '+l,'value':'value '+l,'count':0});

			},
			changeRandom:function(e,model){
				model.data.list[1].value = Math.random();
				
			},
			removeItem:function(e,model){
				var index = model.index;
				model.data.list.splice(index, 1);
			}
		},
		event:{
			changeTitle:function(){
				var count = data.list.length;
				return data.title+" "+count;
			}
		},
		item:{
			addItem2:function(e,model){
				var l = 1+data.list.length;
				model.data.list.push({'key':'key '+l,'value':'value '+l,'count':0});

			},
		},
		jeff:{
			addItem3:function(e,model){
				var l = 1+data.list.length;
				model.data.list.push({'key':'key '+l,'value':'value '+l,'count':0});

			},
			getJeff:function(e,model){
				data.list[0].value = Math.random();
				return "Jeff "+data.list_name+" "+data.list.length;
			},
			getClass:function(){
				var ran = Math.random()*10;
				console.log(ran);
				if(ran>5){
					return true;
				}else{
					return false;
				}
			},
			
		}
	});
});





//trigger 1
function go_trigger1(e){
	e.preventDefault();
	startTime = (new Date).getTime();
	$.when( 
		getPromise("Boom",1000),
		getPromise("Goes",2000),
		getPromise("The Dynamite",3000)
	).then(logIt);//.done(logIt);
}

function getPromise(valueIn,timer) {
	var deferred = $.Deferred();
	
	setTimeout(function(){
		deferred.resolve(valueIn);
	}, timer);
	
	deferred.done(function(e){
		var timeSpent = (((new Date).getTime()-startTime)/1000);
		logIt(timeSpent);
	});
	
	return deferred.promise();
}



//trigger 2
function go_trigger2(e){
	e.preventDefault();
	startTime = (new Date).getTime();
	$.when(
		def_1(),
		
		(function(){return "world";})()
	).then(logIt);
}

function def_1(){
	var deferred = $.Deferred();
	setTimeout(function(){
		deferred.resolve("hello");
	}, 2000);
	
	
	return deferred.promise();
}


//trigger3
function go_trigger3(e){
	e.preventDefault();
	startTime = (new Date).getTime();
	delay_echo("hello")
	.then(function(returned_echo){
		return delay_echo(returned_echo+" world");
	}).then(function(returned_echo){
		logIt(returned_echo);
		return "I'M DONE!!!";
	}).done(function(finished_str){
		var timeSpent = (((new Date).getTime()-startTime)/1000);
		logIt("done:"+timeSpent);
		$.when(
			delay_echo("hello"),
			delay_echo("world"),
			delay_echo("suckas"),
			delay_echo(timeSpent)
			
		).done(function(){
			var timeSpent = (((new Date).getTime()-startTime)/1000);
			console.log(arguments[2]);
			data.list.push({"key":"key from promise","value":"time spent:"+timeSpent});
			logIt(Array.prototype.slice.call(arguments),timeSpent);
		});
	}).then(function(ret){logIt(ret);var timeSpent = (((new Date).getTime()-startTime)/1000);
		logIt("then:"+timeSpent);
	});
	
	
}
function delay_echo(str){
	var deferred = $.Deferred();
	setTimeout(function(){
		deferred.resolve(str);
	}, 1000);
	
	
	return deferred.promise();
	
}


