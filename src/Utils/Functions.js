

function stringRemoveMultipleSpaces(inputString) {
	if (inputString.length === 1 && inputString[0] === " ") {
		return "";
	} else {
		return inputString.replace(/  +/gm, " ");
	}
}

function stringRemoveBeginingSpaces(inputString) {
	return inputString.replace(/^ +/gm, "");
}

function stringRemoveEndingSpaces(inputString) {
	return inputString.replace(/ +$/gm, "");
}
function stringRemoveAllSpaces(inputString) {
	return inputString.replace(/ /gm, "");
}

function stringNormalizeSpaces(inputString) {
	let s = stringRemoveMultipleSpaces(inputString);
	s = stringRemoveBeginingSpaces(s);
	s = stringRemoveEndingSpaces(s);
	return s;
}

function isValidEmail(inputString) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(inputString)) {
		return true;
	}
	return false;
}
function isValidPhoneNumber(inputString) {
	if (/(^0\d\d\d\d\d\d\d\d\d$)/.test(inputString)) {
		return true;
	}
	return false;
}

function stringIsNumber(inputString) {
	if (/^\d+$/.test(inputString) || inputString.length === 0) {
		return true;
	}
	return false;
}

function isValidTime(inputString) {
	switch (inputString.length) {
		case 0:
			return true;
		case 1:
			if (/^(0|1|2)/.test(inputString)) {
				return true;
			} else {
				return false;
			}
		case 2:
			if (/^(00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23)/.test(inputString)) {
				return true;
			} else {
				return false;
			}
		case 4:
			if (/^(00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23):(0|1|2|3|4|5)/.test(inputString)) {
				return true;
			} else {
				return false;
			}
		case 5:
			if (/^(00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23):(00|01|02|03|04|05|06|07|08|09|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30|31|32|33|34|35|36|37|38|39|40|41|42|43|44|45|46|47|48|49|50|51|52|53|54|55|56|57|58|59)$/.test(inputString)) {
				return true;
			} else {
				return false;
			}
	}
}


function timeIsInOrder(begin, end) {
	if (parseInt(begin.substring(0, 2)) < parseInt(end.substring(0, 2))) {
		return true;
	} else if (parseInt(begin.substring(0, 2)) === parseInt(end.substring(0, 2))) {
		if (parseInt(begin.substring(3, 5)) < parseInt(end.substring(3, 5))) {
			return true;
		}
	}
	return false;
}

function biggerTime(time1, time2) {
	if (parseInt(time1.substring(0, 2)) < parseInt(time2.substring(0, 2))) {//HH < HH
		return time2;
	} else if (parseInt(time1.substring(0, 2)) > parseInt(time2.substring(0, 2))) { //HH > HH
		return time1;
	} else { // HH == HH
		if (parseInt(time1.substring(3, 5)) < parseInt(time2.substring(3, 5))) { //MM < MM
			return time2;
		} else {//MM >= MM
			return time1;
		}
	}
}

function periodIncludeTime(period, time) {
	if (biggerTime(period.start, time) === time && biggerTime(period.end, time) === period.end) {
		return true;
	} else {
		return false;
	}
}

function periodsAreIntersected(period1, period2) {
	if (periodIncludeTime(period1, period2.start) || (periodIncludeTime(period1, period2.end))) {
		return true;
	} else {
		return false;
	}
}

function sortPeriods(periods) {
	let newPeriods = [...periods];
	if (periods.length > 1) {
		let temp = null;
		for (let i = 0; i < periods.length; i++) {
			for (let j = 0; j < periods.length-1; j++) {
				if (biggerTime(newPeriods[j].start, newPeriods[j + 1].start) === newPeriods[j].start) {
					temp = { ...newPeriods[j] };
					newPeriods[j] = { ...newPeriods[j + 1] };
					newPeriods[j + 1] = { ...temp };
				}
			}
		}
	}
	return newPeriods;
}

function timeSomme(time1, time2){
	let t1 = {
		h: parseInt(time1.substring(0, 2)),
		m: parseInt(time1.substring(3, 5))
	};
	let t2 = {
		h: parseInt(time2.substring(0, 2)),
		m: parseInt(time2.substring(3, 5))
	};
	let r = {
		h: 0,
		m: 0
	}

	if (t1.m + t2.m < 60){
		r.m = t1.m + t2.m;
		r.h = t1.h + t2.h;
		if (r.h>=24){
			r.h = r.h - 24;
		}
	}else{
		r.m = ((t1.m + t2.m) - 60);
		r.h = t1.h + t2.h + 1;
		if (r.h>=24){
			r.h = r.h - 24;
		}
	}
	if (r.h>9 && r.m>9){
		return r.h+":"+r.m;
	}else if(r.h<10 && r.m>9){
		return "0"+r.h+":"+r.m;
	}else if(r.h>9 && r.m<10){
		return r.h+":"+"0"+r.m;
	}else{
		return "0"+r.h+":"+"0"+r.m;
	}
	// 18:29
	// 00:45
	// 19:14
}

let o = {
	stringRemoveMultipleSpaces,
	stringRemoveBeginingSpaces,
	stringRemoveEndingSpaces,
	stringNormalizeSpaces,
	isValidEmail,
	isValidPhoneNumber,
	stringIsNumber,
	stringRemoveAllSpaces,
	isValidTime,
	timeIsInOrder,
	periodsAreIntersected,
	sortPeriods,
	timeSomme
};
export default o;