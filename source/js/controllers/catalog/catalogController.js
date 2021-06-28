import Catalog from "catalog-filtration";
import _ from "lodash";

class CatalogController {
	constructor(options) {
		this.stores = options.stores;
		this.catalog = null;
	}

	init() {
		return new Promise(resolve => {
			this.stores.goods.subscribe(() => {
				const goods = this.stores.goods.getStore;
				console.log(typeof goods, _.size(goods));
				this.initModule().then(resolve);
			});

			this.stores.lr.subscribe(this.insertLocalRests.bind(this));

			this.stores.catalogEvent.subscribe(() => {
				this.filter(this.stores.catalogEvent.getStore);
			});
		});
	}

	async initModule() {
		const options = {
			goods: this.stores.goods.getStore,
			rests: this.stores.lr.getStore,
			filterFields: [
				"BRAND",
				"VID_TOVARA_UA",
				"SIZE",
				"SEASON_UA",
				"CVET_UA",
				"STYLE_UA",
				"PODKL_UA",
				"VERX_UA",
				"PODOSHVA_UA",
				"TECHNOLOGY",
				"GENDER_UA",
				"ACCESSORY"
			],
			priceField: "PRICE_ACTION",
			presetsRules: {
				braska: {BRAND: ["Braska"]},
				timberland: {BRAND: ["Timberland"]},
				skechers: {BRAND: ["Skechers"]},
				ecco: {BRAND: ["ECCO"]},
				female: { GENDER_UA: ["Жіноче"], ACCESSORY: ["N"] },
				male: { GENDER_UA: ["Чоловіче"], ACCESSORY: ["N"] },
				kids: { GENDER_UA: ["Хлопчаче", "Дівчаче"], ACCESSORY: ["N"] },
				girl: { GENDER_UA: ["Дівчаче"], ACCESSORY: ["N"] },
				boy: { GENDER_UA: ["Хлопчаче"], ACCESSORY: ["N"] },
				accessory: {
					ACCESSORY: ["Y"],
					VID_TOVARA_UA: [
						"барсетка",
						"Біжутерія",
						"Браслет",
						"Намисто",
						"Візитниці",
						"Дзеркало",
						"клатч",
						"Ключниці",
						"Кільце",
						"Косметичка",
						"Гаманець",
						"набір аксесуарів",
						"рукавички",
						"портмоне",
						"Портфель",
						"ремінь",
						"рюкзак",
						"сумка"
					]
				},
				care: {
					VID_TOVARA_UA: [
						"Аерозоль для взуття",
						"Гелева продукція",
						"дезодорант",
						"Рідкий крем для взуття",
						"Рідина для чищення взуття",
						"Крем для взуття",
						"Ріжок",
						"Набір для чищення",
						"Піна для чищення",
						"Підп`яточник",
						"Промо-набір",
						"Устілки",
						"шнурки",
						"Щітка"
					]
				},
				clothes : {
					VID_TOVARA_UA: [
						"Топ",
						"Майка для тенісу",
						"Легінси",
						"Штани лижні",
						"Пуловер",
						"Сорочк",
						"Реглан",
						"Платок",
						"Парео",
						"Легінси",
						"Штани лижні",
						"Пуловер",
						"Сорочка",	
						"Реглан",
						"Кофта",
						"Пайта",
						"Светр",
						"Жилет",
						"Жилет пуховий",
						"Куртка пухова",
						"Куртка шкіряна",
						"Куртка лижна",
						"Пальто пухове",
						"Рукавиці",
						"Труси",
						"Бандана для тенниса",
						"Ветровка",
						"Гетры для футбола",
						"Горловик для футбола",
						"Лосины термо",
						"Набір аксесуарів",
						"Напульсник для тенниса",
						"Повязка для футбола",
						"Поло с длинным рукавом",
						"Реглан вратарский",
						"Ремінь",
						"Футболка термо",
						"Футболка термо с длинным рукав",
						"Чіноси",
						"Шорты вратарские",
						"Шорти для плавання",
						"Шорты термо",
						"Сукня",
						"Сукня для тенісу",
						"Комбінезон",
						"Кардиган",
						"Блуза",
						"Туніка",
						"Пальто",
						"Шарф",
						"Плащ",
						"Рукавички",
						"Спідниця",
						"Спідниця для тенісу",
						"Гольфи",
						"Купальник",
						"Футболка",
						"Майка",
						"Поло",
						"Футболка для тенниса",
						"Джинси",
						"Брюки",
						"Штани спортивні",	
						"Костюм",
						"Бриджи",
						"Сорочка з довгим рукавом",
						"Піджак",
						"Кофта спорт",
						"Куртка",
						"Куртка синтепонова",
						"Шапка",
						"Шкарпетки",
						"Капелюх",	
						"Кепка",
						"Спідня білизна",
						"Шорти",
						"Шорти для тенісу",
						"Колготки",
						"Бодi",
						"Брюки вратарские",
						"Комплект вратарской формы",
						"Комплект игровой формы",
						"Манишка",	
						"Панамка",
						"Перчатки вратарские",
						"Сорочка з коротким рукавом"
					]
				}
			},
			customStores: {
				productList: this.stores.productList,
				selectedFilters: this.stores.selectedFilters,
				availableFilters: this.stores.availableFilters
			}
		};

		global.console.time("CATALOG_INIT");
		this.catalog = new Catalog(options);
		global.console.timeEnd("CATALOG_INIT");
	}

	insertLocalRests() {
		if (this.catalog == null) return;
		const lr = this.stores.lr.getStore;
		this.catalog.insertRests({ rests: lr });
	}

	filter(data) {
		console.log(data);

		switch (data.type) {
			case "reset":
				this.catalog.reset();
				break;
			case "preset":
			default:
				this.catalog.filter(data.type, data.value);
				break;
		}
	}
}

export default CatalogController;
