class PrimaryModalController {
	constructor(options){
		this.stores = options.stores;
		this.history = options.history;
		this.state = {};
	}

	async init(){
		this.stores.primaryModal.subscribe(this.handler.bind(this))
	}

	handler(){
		if(this.history.location.pathname !== '/primary') return;
		const state = this.stores.primaryModal.getStore;
		if(this.state.open !== state.open) this.handlerOpenState(state.open);
	}

	handlerOpenState(stateOpen){
		this.state.open = stateOpen;
		if(this.state.open === false) this.resetCatalog();
	}

	resetCatalog(){
		this.stores.catalogEvent.set({type: "reset"});
	}
}

export default PrimaryModalController;