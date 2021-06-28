import moment from "moment";

class DateTimeController {
	constructor(options) {
		this.stores = options.stores;

		this.days = [
			"Неділя",
			"Понеділок",
			"Вівторок",
			"Середа",
			"Четвер",
			"П'ятниця",
			"Субота"
		];

		this.tick();
	}

	tick() {
		const now = moment();

		this.stores.dateTime.set({
			time: now.format("HH:mm"),
			dayOfWeek: this.days[now.format("d")],
			date: now.format("D.M.YYYY")
		});

		setTimeout(this.tick.bind(this), 30000);
	}
}

export default DateTimeController;
