define([
	'underscore',
	'marionette',
	'i18n!nls/report',
	'tpl!views/directory/TabTop.html',
	'tpl!views/util/ProgressBar.html',
	'tpl!views/util/SortLink.html',
	'tpl!views/util/SortDropdown.html'
], function(_, Marionette, Lang, Template, TemplateProgressBar, TemplateSortLink, TemplateSortDropdown) {
	'use strict';

	return Marionette.ItemView.extend({

		className: 'du-tab-top',

		template: function(args) {
			if (args.top === 'loading')
				return '<div class="du-loading" style="height: 24px; margin-top: 16px;"></div>';

			else if (args.top === 'NOT_FOUND')
				return '<div class="du-mesage-error"><span class="glyphicon glyphicon-exclamation-sign"></span> ' + Lang.message_not_found + '</div>';

			else if (args.top === 'NO_DATA')
				return '<div class="du-mesage-info"><span class="glyphicon glyphicon-info-sign"></span> ' + Lang.message_no_data + '</div>';

			return Template.apply(this, arguments);
		},

		constructor: function(options) {
			if (options)
				_.extend(this, _.pick(options, [ 'app', 'top', 'route' ]));

			Marionette.ItemView.apply(this, arguments);
		},

		initialize: function() {
			Marionette.ItemView.prototype.initialize.apply(this, arguments);

			var _this = this;
			var dir = this.model;

			var app = this.app;
			var route = this.route || app.getRoute();

			this.top = 'loading';

			app.request('GetGroupTop', dir, route.sort.top, route.page)
				.done(function(data) {
					_this.top = data;

					if (_this._isRendered)
						_this.render();
				})
				.fail(function(reason) {
					_this.top = reason;

					if (_this._isRendered)
						_this.render();
				});
		},

		serializeData: function() {
			var app = this.app;
			var dir = this.model;

			return _.defaults({
				top: this.top,
				hash: dir.id,
				app: app,
				route: app.getRoute(),
				Lang: Lang,
				progressBar: TemplateProgressBar,
				sortLink: TemplateSortLink,
				sortDropdown: TemplateSortDropdown
			}, Marionette.ItemView.prototype.serializeData.apply(this, arguments));
		}
	});
});