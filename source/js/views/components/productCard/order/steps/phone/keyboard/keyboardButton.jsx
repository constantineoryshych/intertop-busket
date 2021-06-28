import KeyboardButtonView from '~/views/components/common/keyboardButtonView.jsx';

class KeyboardButton extends KeyboardButtonView {
	clickHandler() {
		this.props.stores.orderInputButton.set({ value: this.props.button });
	}

	getClass() {
		return this.props.button === "delete" ? "delete" : "";
	}

	getContext() {
		return this.props.button === "delete" ? "" : this.props.button;
	}
}

export default KeyboardButton;
