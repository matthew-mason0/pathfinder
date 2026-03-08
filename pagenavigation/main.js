import { LandingPage } from "./LandingPage/LandingPage.js";
import { ConfigPage } from "./ConfigPage/ConfigPage.js";
import { EnvironmentPage } from "./EnvironmentPage/EnvironmentPage.js";

let currentPage = "ENVIRONMENT";

let landingPage;
let configPage;
let environmentPage;

window.setup = function () {
	createCanvas(windowWidth, windowHeight);
	landingPage = new LandingPage();
	configPage = new ConfigPage();
	environmentPage = new EnvironmentPage(10);
};

window.draw = function () {
	switch (currentPage) {
		case "LANDING":
			landingPage.draw();
			break;
		case "CONFIG":
			landingPage.draw();
			configPage.draw();
			break;
		case "ENVIRONMENT":
			landingPage.draw();
			environmentPage.draw();
			break;
		default:
			break;
	}
};

window.mousePressed = function () {
	switch (currentPage) {
		case "LANDING":
			landingPage.mousePressed(mouseX, mouseY);
			break;
		case "CONFIG":
			configPage.mousePressed(mouseX, mouseY);
			break;
		case "ENVIRONMENT":
			environmentPage.mousePressed(mouseX, mouseY);
			break;
		default:
			break;
	}
}

window.openConfigPage = function () {
	currentPage = "CONFIG";
}
window.openEnvironmentPage = function () {
	currentPage = "ENVIRONMENT";
}
window.closePage = function () {
	currentPage = "LANDING";
}