

function stringRemoveMultipleSpaces(inputString) {
	if (inputString.length === 1 && inputString[0] === " "){
		return "";
	}else{
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

let o = {
	stringRemoveMultipleSpaces,
	stringRemoveBeginingSpaces,
	stringRemoveEndingSpaces,
	stringNormalizeSpaces,
	isValidEmail,
	isValidPhoneNumber,
	stringIsNumber,
	stringRemoveAllSpaces
};
export default o;