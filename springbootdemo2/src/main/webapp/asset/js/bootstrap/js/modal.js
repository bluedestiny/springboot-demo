+function ($) {

	/* 模态窗口 */
	var Modal = function(options) {
		this.init(options);
	}

	Modal.prototype = {
		dialog: null,
		init: function(options) {
			var self = this;
			var dialog;
			var btnTpl = '';
			if(options.buttons && options.buttons.length > 0) {
				btnTpl += '<div class="modal-footer">';
				for(var i=0; i<options.buttons.length; i++){
					btnTpl += '<button id="' +  options.buttons[i]["id"] + '" type="button" class="btn btn-' + options.buttons[i]["type"] + '">' +  options.buttons[i]["text"] + '</button>';
				}
				btnTpl += '</div>';
				console.log(btnTpl);
			}
			var modalTpl =
				'<div class="modal fade" id="' + options.id + '" tabindex="-1" role="dialog">' +
					'<div class="modal-dialog ' + options.sizeClass + '" role="document">' +
						'<div class="modal-content" data-response data-submit>' +
							'<div class="modal-header">' +
								'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
								'<h4 class="modal-title">' + (options.title || '') + '</h4>' +
							'</div>' +
							'<div class="modal-body"></div>' +
							btnTpl +
						'</div>' +
					'</div>' +
				'</div>';
			if(options.url) {
				$("body").append(modalTpl);
				dialog = $("#" + options.id);
				if(options.buttons) {
					for (var i = 0; i < options.buttons.length; i++) {
						var btnaction = options.buttons[i]["action"];
						$("#" + options.buttons[i]["id"]).on("click", {index: i}, eventHandler);
					}
				}
				function eventHandler(event) {
					var index = event.data.index;
					options.buttons[index]["action"]($(this));
				}
				$(".modal-body", dialog).load(options.url, function() {
					dialog.modal();
					self.dialog = dialog;
					console.log(dialog);
					dialog.on("hidden.bs.modal", function(){
						dialog.remove();
					});
				});
			}
		},
		destroy: function() {
			this.dialog.remove();
		},
		close: function(fn) {
			console.log(this.dialog);
			this.dialog.modal("hide");
			fn();
			//console.log(fn);
		}
	}

	$.extend({
		bsmodal: function (options) {
			return new Modal(options);
		}
	});

}(jQuery);