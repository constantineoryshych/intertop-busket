import _ from "lodash";

export function BrandParser(brand) {
	if (typeof brand === "string")
		return _.trim(brand).toLocaleLowerCase().replace(/[ ,:]/gi, "-");
}

export function ParsePhoneNamber(number) {
	const parsed = number.split("(")[1].split(")")[0];
	const valid = [
		"093",
		"063",
		"065",
		"039",
		"050",
		"066",
		"067",
		"068",
		"091",
		"094",
		"095",
		"096",
		"097",
		"098",
		"099",
		"073",
		"044"
	];
	return _.includes(valid, parsed);
}
