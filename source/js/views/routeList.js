import LoaderView from "./components/loaderView.jsx";
import ScreenSaverComposition from "./components/screenSaver/screenSaverComposition.jsx";
import PrimaryComposition from "./components/primary/primaryComposition.jsx";
import SearchComposition from "./components/search/searchComposition.jsx";
import MainComposition from "./components/main/mainComposition.jsx";

const RouteList = {
	"/": {
		child: LoaderView,
		type: "load"
	},
	"/screenSaver": {
		child: ScreenSaverComposition,
		type: "unique"
	},
	"/primary": {
		child: PrimaryComposition,
		type: "common"
	},
	"/search": {
		child: SearchComposition,
		type: "common"
	},
	"/main": {
		child: MainComposition,
		type: "common"
	}
};

export default RouteList;
