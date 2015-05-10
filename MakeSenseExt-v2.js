(function(ext) {
	var win = null;
	var canvas = null;
	var ctx = null;
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };


	ext.pollaxisData = function(channel) {
	 var c = .007874015748031482;
	 var gp = navigator.getGamepads()[0];
	 var dataChannel= 0;
	 //Sorts through individual Channels
	 console.log("orbit Camera Called", "getGamepads" in navigator);
	 if(channel=="Channel 0"){
	 	dataChannel= 0;
	 }if(channel=="Channel 1"){
	 	dataChannel= 1;
	 }if(channel=="Channel 2"){
	 	dataChannel= 2;
	 }if(channel=="Channel 3"){
	 	dataChannel= 3;
	 }if(channel=="Channel 4"){
	 	dataChannel= 4;
	 }if(channel=="Channel 5"){
	 	dataChannel= 5;
	 }
	 
	 //retrieves and converts data
	 var dataIn = gp.axes[dataChannel]; 
	 if(dataIn!=0){
		 dataIn = (127+(dataIn/c));
		 console.log("Converted Data: ", dataIn);
		 if(dataIn<.5){
			 dataIn = 0;
		 }if(dataIn>254){
			 dataIn = 255;
		 }
	 }else{
		 dataIn = 127;
	 }
	 console.log("Raw Data: ", gp.axes[dataChannel]);
	    return (dataIn);
	   };

	 //
	   ext.pollButtonData = function(channel){
	   	var gp = navigator.getGamepads()[0];
		var dataChannel= 0;
		if(channel=="Channel 6"){
			dataChannel = 0;
		}if(channel=="Channel 7"){
			dataChannel = 1;
		}
		var dataIn = gp.buttons[dataChannel]; 
		console.log("Button Data: ", gp.buttons[dataChannel].pressed);
		return gp.buttons[dataChannel].value;
	   }

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            // Block type, block name, function name, param1 default value, param2 default value
            ['r', 'Get Analog Data %m.anaChannels', 'pollaxisData', "Channel 0"],
			['r', 'Button Pressed %m.boolChannels', 'pollButtonData', "Channel 6"]
        ],
		
		menus: {
			anaChannels: ['Channel 0', 'Channel 1', 'Channel 2','Channel 3', 'Channel 4', 'Channel 5'],
			boolChannels: ['Channel 6', 'Channel 7']
		}
    };

    // Register the extension
    ScratchExtensions.register('Make!Sense', descriptor, ext);
})({});
