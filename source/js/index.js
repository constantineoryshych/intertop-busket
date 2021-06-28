/**
 * @namespace
 * @name Index
 * @description Main entry point of App
 */

import "./../style/stylesheets/main.sass";

import LoaderController from "bbt-loader"; //eslint-disable-line
import LoaderList from "@/loaderList"; //eslint-disable-line

/**
 * @constant {Object} Index.loader - {@link https://www.npmjs.com/package/bbt-loader}.
 */
const loader = new LoaderController({ loaderList: LoaderList }); //eslint-disable-line
