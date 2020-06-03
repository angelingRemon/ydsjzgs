var first = null;
function back(){
    api.addEventListener({
        name: 'keyback'
    }, function(ret, err){
        if (!first) {
            first = new Date().getTime();
            api.toast({
                msg: '再按一次退出',
                duration:1500,
                location: 'bottom'
            });
            setTimeout(function() {
                first = null;
            }, 1000);
        } else {
            if (new Date().getTime() - first < 1000) {
                api.closeWidget({
                    silent:true
                });
            }
        }
    });
}
/**
 * 判断是否是空
 * @param value
 */
function is_define(value) {
	if (value == null || value == "" || value == "undefined" || value == undefined || value == "null" || value == "(null)" || value == 'NULL' || typeof (value) == 'undefined') {
		return false;
	} else {
		value = value + "";
		value = value.replace(/\s/g, "");
		if (value == "") {
			return false;
		}
		return true;
	}
}

//提示框
function $toast(txt,duration,location){
	if (!is_define(txt)){
		txt='Loading...';
	}
	if (!is_define(duration)){
		duration=2000;
	}
	if (!is_define(location)){
		location='middle';
	}
	api.toast({
		msg : txt,
		duration : duration,
		location : location
	});
}

 var decimal_places = 2;
 var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);
 $('#decimals')
 	.animateNumber({
 			number: 5 * decimal_factor,

 			numberStep: function (now, tween) {
 				var floored_number = Math.floor(now) / decimal_factor,
 					target = $(tween.elem);

 				if (decimal_places > 0) {
 					// force decimal places even if they are 0
 					floored_number = floored_number.toFixed(decimal_places);

 					// replace '.' separator with ','
 					floored_number = floored_number.toString().replace('.', ',');
 				}

 				target.text('$' + floored_number);
 			}
 		},
 		20000
 	);