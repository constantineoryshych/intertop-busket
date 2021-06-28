import KeyboardButtonView from '~/views/components/common/keyboardButtonView.jsx';

class KeyboardButton extends KeyboardButtonView {
	clickHandler() {
		switch (this.props.button) {
			case "":
			case "enter":
			case "space":
				break;
			case "close":
				this.props.stores.search.reset();
				this.props.history.push("/primary");
				break;
			case "delete":
				this.props.stores.search.reset();
				break;
			case "backspace":
				this.props.stores.search.backspace();
				break;
			default:
				this.props.stores.search.inputChange(this.props.button);
				break;
		}
	}

	getClass() {
		switch (this.props.button) {
			default:
				return "simple-button";
		}
	}

	getContext() { //	eslint-disable-line
		switch (this.props.button) {
			case "delete":
				return "Очистити";
			case "enter":
				return "Готово";
			case "backspace":
			case "close":
			case "language":
			case "space":
				return "";
			default:
				return this.props.button;
		}
	}
}

export default KeyboardButton;
