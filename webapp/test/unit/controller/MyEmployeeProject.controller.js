/*global QUnit*/

sap.ui.define([
	"uiMySecondEmployee./secondemployee_project/controller/MyEmployeeProject.controller"
], function (Controller) {
	"use strict";

	QUnit.module("MyEmployeeProject Controller");

	QUnit.test("I should test the MyEmployeeProject controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
