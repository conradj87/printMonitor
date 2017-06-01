var gpio = require("pi-gpio");

var smokePin = 40;

gpio.open( smokePin, "input pulldown", function(err){
	var counter = 0;
	setInterval( function(){
		gpio.read( smokePin, function(err, val){
			if(err){
				callback(err);
			}
			
			if(val===0){
				console.log('SMOKE FOUND');
			}
			else{
				console.log('No Smoke');
			}
			
			if(counter++ > 100){
				cleanup();
			}
		});
	}, 500 );
});

var callback = function(err){
	if(err){
		console.log('Error: '+err);
		
		cleanup();
	}
}

var cleanup = function(){
	gpio.close(smokePin, callback);
	process.exit(0);
}
