import { LandingPage } from "./Pages/LandingPage.js";
import { ConfigPage } from "./Pages/ConfigPage.js";
import { EnvironmentPage } from "./Pages/EnvironmentPage.js";
import { RunPage } from "./Pages/RunPage.js";
import { SettingState } from "./Configuration/SettingState.js"

let currentPage = "LANDING";

let landingPage;
let configPage;
let environmentPage;
let runPage;

window.setup = function () {
	createCanvas(windowWidth, windowHeight);
	window.settingState = new SettingState();
	landingPage = new LandingPage();
	configPage = new ConfigPage();
	environmentPage = new EnvironmentPage();
	runPage = new RunPage();

	// create DOMs to fix canvas size error
	// TODO switch to initDOM() function
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
window.windowResized = function () {
  	resizeCanvas(windowWidth, windowHeight);
	environmentPage.recalculateLayout();
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
	currentPage = "RUN";
}
window.closeRunPage = function () {
	currentPage = "LANDING";
}