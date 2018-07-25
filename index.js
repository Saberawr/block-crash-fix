module.exports = function(dispatch) {
	var delay = 100;	// ms
	var lastPackets = [-1, -1, -1];	// sActionStage, sActionEnd, sAbnormieRefresh
	
	dispatch.hook('S_ACTION_STAGE', 6, function(event) {
		if (event.skill.id == 20100) {
			return checkLastTime(0);
		}
	});
	
	dispatch.hook('S_ACTION_END', 4, function(event) {
		if (event.skill.id == 20100) {
			return checkLastTime(1);
		}
	});
	
	dispatch.hook('S_ABNORMALITY_REFRESH', 1, function(event) {
		if (event.id == 22040 || event.id == 22020) {
			return checkLastTime(2);
		}
	});
	
	// quick & dirty implementation b/c making objects to store corresponding character & use times might defeat the purpose of this module
	function checkLastTime(index) {
		return ((Date.now() > (lastPackets[index] + delay)) && (lastPackets[index] = Date.now()));
	};
};
