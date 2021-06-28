import _ from "lodash";

export function innerNumberGenerator() { //eslint-disable-line
	const letters = [
		"Q",
		"W",
		"R",
		"T",
		"Y",
		"U",
		"A",
		"S",
		"D",
		"F",
		"G",
		"J",
		"K",
		"Z",
		"V",
		"N",
		"M"
	];
	const alpha = letters[_.random(0, _.size(letters) - 1)];
	const numeric = _.random(1000, 9999);
	return `${alpha}-${numeric}`;
}
