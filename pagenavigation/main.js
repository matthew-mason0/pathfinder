import { LandingPage } from "./LandingPage/LandingPage.js";
import { ConfigPage } from "./ConfigPage/ConfigPage.js";
import { EnvironmentPage } from "./EnvironmentPage/EnvironmentPage.js";
import { RunPage } from "./RunPage/RunPage.js";

let currentPage;

let landingPage;
let configPage;
let environmentPage;
let runPage;

window.setup = function () {
	createCanvas(windowWidth, windowHeight);
	landingPage = new LandingPage();
	configPage = new ConfigPage();
	environmentPage = new EnvironmentPage();
	runPage = new RunPage();

	// create DOMs to fix canvas size error
	environmentPage.draw();
	window.closeEnvironmentPage();
	configPage.draw();
	window.closeConfigPage();
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
		case "RUN":
			runPage.draw();
			break;
		default:
			break;
	}
};

window.mousePressed = function () {
	window.handleClick(mouseX, mouseY);
}
window.touchStarted = function (e) {
	if (e.target.tagName !== "INPUT") {
		window.handleClick(mouseX, mouseY);
		return false;
	}
}

window.handleClick = function (mX, mY) {
	switch (currentPage) {
		case "LANDING":
			landingPage.mousePressed(mX, mY);
			break;
		case "CONFIG":
			configPage.mousePressed(mX, mY);
			break;
		case "ENVIRONMENT":
			environmentPage.mousePressed(mX, mY);
			break;
		case "RUN":
			runPage.mousePressed(mX, mY);
			break;
		default:
			break;
	}
}

window.openConfigPage = function () {
	configPage.settingsList.showDOMs();
	currentPage = "CONFIG";
}
window.openEnvironmentPage = function () {
	environmentPage.settingsList.showDOMs();
	currentPage = "ENVIRONMENT";
}
window.closeConfigPage = function () {
	configPage.settingsList.hideDOMs();
	currentPage = "LANDING";
}
window.closeEnvironmentPage = function () {
	environmentPage.settingsList.hideDOMs();
	currentPage = "LANDING";
}
window.openRunPage = function () {
	// TODO get setting state
	currentPage = "RUN";
}