var gpio = require("pi-gpio");

var relay1 = 11;
var relay2 = 13;

var relay1State = false;
var relay2State = true;

var callback = function(err){
	if(err){
		console.log('Error: '+err);
	}
}

gpio.open( relay1, "output", function(err){
	if(err){
		console.log('Error opening pin '+relay1);
	}

	gpio.open( relay2, "output", function(err){
        	if(err){
                	console.log('Error opening pin '+relay2);
        	}

		var counter = 0;
		setInterval( function(){
        		counter++;
			
			var val = relay1State ? 0:1;
			gpio.write(relay1, val, callback);
	
			val = relay2State ? 0:1;
			gpio.write(relay2, val, callback);
 			
			relay1State = !relay1State;
			relay2State = !relay2State;
			if(counter > 10){
				cleanup();
			}
		}, 1000 );
	});
});

var cleanup = function(){
	gpio.write(relay1, 0, callback);
	gpio.write(relay2, 0, callback);
	gpio.close(relay1, callback);
	gpio.close(relay2, callback);	
	process.exit(0);
}
