import DataChunk from "~/stores/dataChunk";
import SearchStore from "~/stores/searchStore";
import PrimaryModalStore from "~/stores/views/primaryModalStore";

const StoreList = [
	{
		name: "loaderProgress",
		options: {
			initState: { percentage: 0, err: null }
		}
	},
	{
		name: "dataChunk",
		store: DataChunk
	},
	{
		name: "goods",
		options: {
			initState: {}
		}
	},
	{
		name: "sizes",
		options: {
			initState: {}
		}
	},
	{
		name: "shops",
		options: {
			initState: {}
		}
	},
	{
		name: "weather",
		options: {
			initState: {}
		}
	},
	{
		name: "lr",
		options: {
			initState: {}
		}
	},
	{
		name: "sellers",
		options: {
			initState: {}
		}
	},
	{
		name: "dateTime",
		options: {
			initState: {
				time: null,
				dayOfWeek: null,
				date: null
			}
		}
	},
	{
		name: "infoBlock",
		options: {
			initState: { slide: 0 }
		}
	},
	{
		name: "screenSaverSlider",
		options: {
			initState: { current: 1 }
		}
	},
	{
		name: "availableFilters",
		options: {
			initState: {}
		}
	},
	{
		name: "productList",
		options: {
			initState: []
		}
	},
	{
		name: "productListSize",
		options: {
			initState: { size: 0 }
		}
	},
	{
		name: "selectedFilters",
		options: {
			initState: {}
		}
	},
	{
		name: "catalogEvent",
		options: {
			initState: { type: null, value: null }
		}
	},
	{
		name: "search",
		store: SearchStore
	},
	{
		name: "searchResult",
		options: {
			initState: { result: [] }
		}
	},
	{
		name: "primaryModal",
		store: PrimaryModalStore
	},
	{
		name: "previewSliderView",
		options: {
			initState: { slide: 1 }
		}
	},
	{
		name: "orderCities",
		options: {
			initState: { list: [] }
		}
	},
	{
		name: "orderInputFocus",
		options: {
			initState: { focus: "phone" }
		}
	},
	{
		name: "orderInputButton",
		options: {
			initState: { value: null }
		}
	},
	{
		name: "orderPhone",
		options: {
			initState: { number: "" }
		}
	},
	{
		name: "orderPhoneParsed",
		options: {
			initState: { number: "+38 (0__) ___-__-__" }
		}
	},
	{
		name: "orderSeller",
		options: {
			initState: { number: "" }
		}
	},
	{
		name: "sellerName",
		options: {
			initState: { name: null }
		}
	},
	{
		name: "orderSend",
		options: {
			initState: { status: null, answer: null, error: null }
		}
	},
	{
		name: "mainViewGrid",
		options: {
			initState: { grid: 9 }
		}
	},
	{
		name: "productSort",
		options: {
			initState: { sort: "recom", open: false }
		}
	},
	{
		name: "mainModal",
		options: {
			initState: { open: false, currentCategory: "VID_TOVARA_UA" }
		}
	},
	{
		name: "mainViewed",
		options: {
			initState: { cnt: 0 }
		}
	},
	{
		name: "viewport",
		options: {
			initState: { viewport: "/" }
		}
	},
	{
		name: "error",
		options: {
			initState: {
				type: null,
				code: null,
				class: null,
				method: null,
				dependencies: null
			}
		}
	},
	{
		name: "productCardType",
		options: {
			initState: {
				type: null
			}
		}
	},
	{
		name: "productCardState",
		options: {
			initState: {
				open: false,
				key: null,
				item: null,
				spec: false
			}
		}
	},
	{
		name: "restsData",
		options: {
			initState: {
				origin: null,
				parsed: null,
				err: null
			}
		}
	},
	{
		name: "restsTab",
		options: {
			initState: {
				tab: "store"
			}
		}
	},
	{
		name: "availableOrder",
		options: {
			initState: {
				reserve: false,
				delivery: false,
				pickUp: false
			}
		}
	},
	{
		name: "orderSize",
		options: {
			initState: {
				size: null
			}
		}
	},
	{
		name: "orderSizeTarget",
		options: {
			initState: {
				rests: null
			}
		}
	},
	{
		name: "orderStep",
		options: {
			initState: { step: 0 }
		}
	},
	{
		name: "orderType",
		options: {
			initState: { type: null }
		}
	},
	{
		name: "orderDeliveryType",
		options: {
			initState: { type: null }
		}
	},
	{
		name: "orderCity",
		options: {
			initState: { city: null }
		}
	},
	{
		name: "orderStore",
		options: {
			initState: { store: null }
		}
	},
	{
		name: "orderCode",
		options: {
			initState: { code: null }
		}
	}
];

export default StoreList;
