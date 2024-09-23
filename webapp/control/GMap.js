/* global google */
sap.ui.define(["sap/ui/dom/includeScript", "sap/ui/core/Control"], function(includeScript, Control) {
	"use strict";

	const mapLoaded = function(apiKey, version = "weekly") {
		return new Promise((resolve, reject) => {

			window._____gmapInitCallback_____ = function() {
				resolve(google.maps);
				delete window._____gmapInitCallback_____;
			};

			includeScript(`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=${version}&loading=async&callback=_____gmapInitCallback_____`,
				"__gmapScript__",
				() => {
					// script calls the callback function above
				}, () => {
					reject();
					delete window._____gmapInitCallback_____;
				});

		});
	};

	return Control.extend("ui5demo.google.maps.control.GMap", {

		metadata: {
			properties: {
				"apiKey": {
					type: "string"
				},
				"version": {
					type: "string"
				},
				"zoom": {
					type: "int",
					defaultValue: 12
				},
				"lat": {
					type: "float"
				},
				"lng": {
					type: "float"
				},
				"height": {
					type: "sap.ui.core.CSSSize"
				},
				"width": {
					type: "sap.ui.core.CSSSize"
				},
			},
		},

		renderer: {
			apiVersion: 2,
			render: function(oRm, oControl) {
				oRm.openStart("div", oControl);
				oRm.style("height", oControl.getHeight());
				oRm.style("width", oControl.getWidth());
				oRm.openEnd();
				oRm.close("div");
			}
		},

		onBeforeRendering: function() {
			mapLoaded(this.getApiKey(), this.getVersion()).then(() => {
				this._map = new google.maps.Map(this.getDomRef(), {
					zoom: this.getZoom(),
					center: {
						lat: this.getLat(),
						lng: this.getLng(),
					}
				});
			});
		},

	});

});
