import { LandingPage } from "./LandingPage/LandingPage.js";
import { ConfigPage } from "./ConfigPage/ConfigPage.js";

let currentPage = "LANDING";
currentPage = "CONFIG"; // remove after testing

let landingPage;
let configPage;

window.setup = function () {
	createCanvas(windowWidth, windowHeight);
	landingPage = new LandingPage();
	configPage = new ConfigPage();
};

window.draw = function () {
  	background(50);
	switch (currentPage) {
		case "LANDING":
			landingPage.draw();
			break;
		case "CONFIG":
			landingPage.draw();
			configPage.draw();
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
		default:
			break;
	}
}

window.openConfigPage = function () {
	currentPage = "CONFIG";
}
window.closeConfigPage = function () {
	currentPage = "LANDING";
}