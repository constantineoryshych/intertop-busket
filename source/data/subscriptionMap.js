const SubscriptionMap = [
	{
		class: "productCardTypeController",
		storesRules: [
			{
				store: "productCardType",
				fields: ["type"]
			},
			{
				store: "productCardState",
				fields: ["key"]
			}
		]
	},
	{
		class: "buyButtonsActivator",
		storesRules: [
			{
				store: "orderSizeTarget",
				fields: ["rests"]
			},
			{
				store: "restsTab",
				fields: ["tab"]
			},
			{
				store: "orderSize",
				fields: ["size"]
			}
		]
	},
	{
		class: "orderTypeController",
		storesRules: [
			{
				store: "orderType",
				fields: ["type"]
			}
		]
	},
	{
		class: "orderDeliveryTypeController",
		storesRules: [
			{
				store: "orderDeliveryType",
				fields: ["type"]
			}
		]
	},

	{
		component: "indexView",
		storesRules: [
			{
				store: "viewport",
				fields: ["viewport"]
			}
		]
	},
	{
		component: "viewedView",
		storesRules: [
			{
				store: "productListSize",
				fields: ["size"]
			},
			{
				store: "mainViewed",
				fields: ["cnt"]
			}
		]
	},
	{
		component: "footerView",
		storesRules: [
			{
				store: "mainModal",
				fields: ["open"]
			}
		]
	},
	{
		component: "productCardComposition",
		storesRules: [
			{
				store: "productCardType",
				fields: ["type"]
			}
		]
	},
	{
		component: "infoComposition",
		storesRules: [
			{
				store: "productCardState",
				fields: ["key", "item", "spec"]
			}
		]
	},
	{
		component: "detailComposition",
		storesRules: [
			{
				store: "productCardState",
				fields: ["item"]
			}
		]
	},
	{
		component: "previewComposition",
		storesRules: [
			{
				store: "productCardState",
				fields: ["item"]
			},
			{
				store: "previewSliderView",
				fields: ["slide"]
			}
		]
	},
	{
		component: "previewSlideView",
		storesRules: [
			{
				store: "previewSliderView",
				fields: ["slide"]
			},
			{
				store: "productCardState",
				fields: ["key"]
			}
		]
	},
	{
		component: "thumbnailSlideView",
		storesRules: [
			{
				store: "previewSliderView",
				fields: ["slide"]
			},
			{
				store: "productCardState",
				fields: ["key"]
			}
		]
	}


];

export default SubscriptionMap;
