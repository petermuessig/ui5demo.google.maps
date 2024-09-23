sap.ui.define(["./BaseController", "sap/m/MessageBox"], function (BaseController, MessageBox) {
	"use strict";

	return BaseController.extend("ui5demo.google.maps.controller.Main", {
		sayHello: function () {
			MessageBox.show("Hello World!");
		}
	});
});
