import StoreList from "@/storeList";
import SubscriptionMap from "@/subscriptionMap.js";
import { StoreController } from "redux-store-controller";
import ErrorController from "~/controllers/errorController";
import LoaderController from "~/controllers/views/loader/loaderController";
import Lang from "~/lang/index";
import Adapting from "~/services/adapting";
import ViewController from "~/views/viewController";
import history from "~/stores/history";
import WsClient from "~/network/wsClient";
import Logger from "~/network/logger";

import LiveboardArgsController from "~/controllers/data/liveboardArgsController";
import DataController from "~/controllers/data/dataController";

import CatalogController from "~/controllers/catalog/catalogController";
import ProductListSizeController from "~/controllers/catalog/productListSizeController";
import SortController from "~/controllers/catalog/sortController";

import SearchController from "~/controllers/search/searchController";
import BarcodeScannerController from "~/controllers/search/scanner/barcodeScannerController";

import InfoBlockController from "~/controllers/views/infoBlockController";
import DateTimeController from "~/controllers/views/dateTimeController";
import MainGridController from "~/controllers/views/mainGridController";
import PrimaryModalController from "~/controllers/views/primaryModalController";
import ProductCardController from "~/controllers/views/productCard/productCardController";
import SellerNameController from "~/controllers/views/sellerNameController";

import ProductCardTypeController from "~/controllers/views/productCard/productCardTypeController";
import BuyButtonsActivator from "~/controllers/views/productCard/buyButtonsActivator";
import OrderTypeController from "~/controllers/views/productCard/orderTypeController";
import OrderDeliveryTypeController from "~/controllers/views/productCard/orderDeliveryTypeController";

import OrderCitiesController from "~/controllers/order/orderCitiesController";
import OrderInputController from "~/controllers/order/orderInputController";
import OrderPhoneParseController from "~/controllers/order/orderPhoneParseController";
import SendOrderController from "~/controllers/order/sendOrderController";
import RestsController from "~/controllers/order/restsController";

import HistoryController from "~/controllers/historyController";
import SessionController from "~/session/sessionController";

const LoaderList = [
	{
		step: 0,
		isLoaded: false,
		parts: [
			{
				name: "storeList",
				type: "data",
				controller: StoreList,
				params: [],
				isLoaded: false
			},
			{
				name: "subscriptionMap",
				type: "data",
				controller: SubscriptionMap,
				params: [],
				isLoaded: false
			},
			{
				name: "history",
				type: "data",
				controller: history,
				params: [],
				isLoaded: false
			},
			{
				name: "stores",
				type: "class",
				controller: StoreController,
				params: ["storeList", "subscriptionMap"],
				isLoaded: false
			},
			{
				name: "lang",
				type: "class",
				controller: Lang,
				params: [],
				isLoaded: false
			},
			{
				name: "errorController",
				type: "init",
				controller: ErrorController,
				params: ["stores", "lang"],
				isLoaded: false
			},
			{
				name: "adapting",
				type: "init",
				controller: Adapting,
				params: [],
				isLoaded: false
			},
			{
				name: "liveboardArgsController",
				type: "init",
				controller: LiveboardArgsController,
				params: [],
				isLoaded: false
			}
		]
	},
	{
		step: 1,
		isLoaded: false,
		parts: [
			{
				name: "LoaderController",
				type: "init",
				controller: LoaderController,
				params: ["stores", "loaderStore", "history"],
				isLoaded: false
			},
			{
				name: "session",
				type: "init",
				controller: SessionController,
				params: ["history"],
				isLoaded: false
			},
			{
				name: "view",
				type: "class",
				controller: ViewController,
				params: ["stores", "lang", "history", "session"],
				isLoaded: false
			}
		]
	},
	{
		step: 2,
		isLoaded: false,
		parts: [
			{
				name: "ws",
				type: "init",
				controller: WsClient,
				params: ["stores", "lang"],
				isLoaded: false
			},
			{
				name: "logger",
				type: "class",
				controller: Logger,
				params: ["stores", "ws", "lang"],
				isLoaded: false
			}
		]
	},
	{
		step: 3,
		isLoaded: false,
		parts: [
			{
				name: "dateTime",
				type: "class",
				controller: DateTimeController,
				params: ["stores"],
				isLoaded: false
			},
			{
				name: "infoBlock",
				type: "class",
				controller: InfoBlockController,
				params: ["stores"],
				isLoaded: false
			},
			{
				name: "productListSize",
				type: "init",
				controller: ProductListSizeController,
				params: ["stores", "lang", "logger"],
				isLoaded: false
			},
			{
				name: "sortController",
				type: "init",
				controller: SortController,
				params: ["stores"],
				isLoaded: false
			},
			{
				name: "historyController",
				type: "init",
				controller: HistoryController,
				params: ["stores", "history"],
				isLoaded: false
			},
			{
				name: "searchController",
				type: "init",
				controller: SearchController,
				params: ["stores", "lang", "logger"],
				isLoaded: false
			},
			{
				name: "barcodeScannerController",
				type: "class",
				controller: BarcodeScannerController,
				params: ["stores", "history"],
				isLoaded: false
			},
			{
				name: "primaryModalController",
				type: "init",
				controller: PrimaryModalController,
				params: ["stores", "history"],
				isLoaded: false
			},
			{
				name: "mainGridController",
				type: "init",
				controller: MainGridController,
				params: ["stores"],
				isLoaded: false
			},
			{
				name: "productCardController",
				type: "init",
				controller: ProductCardController,
				params: ["stores", "lang", "history"],
				isLoaded: false
			},
			{
				name: "restsController",
				type: "init",
				controller: RestsController,
				params: ["stores", "lang", "history"],
				isLoaded: false
			},
			{
				name: "productCardTypeController",
				type: "class",
				controller: ProductCardTypeController,
				params: ["stores", "selfName"],
				isLoaded: false
			},
			{
				name: "buyButtonsActivator",
				type: "class",
				controller: BuyButtonsActivator,
				params: ["stores", "selfName"],
				isLoaded: false
			},
			{
				name: "orderDeliveryTypeController",
				type: "class",
				controller: OrderDeliveryTypeController,
				params: ["stores", "selfName"],
				isLoaded: false
			},
			{
				name: "orderTypeController",
				type: "class",
				controller: OrderTypeController,
				params: ["stores", "selfName"],
				isLoaded: false
			},
			{
				name: "orderCitiesController",
				type: "init",
				controller: OrderCitiesController,
				params: ["stores"],
				isLoaded: false
			},
			{
				name: "orderInputController",
				type: "init",
				controller: OrderInputController,
				params: ["stores"],
				isLoaded: false
			},
			{
				name: "orderPhoneParseController",
				type: "init",
				controller: OrderPhoneParseController,
				params: ["stores"],
				isLoaded: false
			},
			{
				name: "sendOrderController",
				type: "init",
				controller: SendOrderController,
				params: ["stores"],
				isLoaded: false
			},
			{
				name: "sellerNameController",
				type: "init",
				controller: SellerNameController,
				params: ["stores"],
				isLoaded: false
			},
			{
				name: "data",
				type: "class",
				controller: DataController,
				params: ["stores", "lang", "logger"],
				isLoaded: false
			},
			{
				name: "catalog",
				type: "init",
				controller: CatalogController,
				params: ["stores", "lang", "logger"],
				isLoaded: false
			}
		]
	}
];

export default LoaderList;
