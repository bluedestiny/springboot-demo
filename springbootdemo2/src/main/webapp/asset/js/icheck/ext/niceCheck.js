/**
 * Created by liteng on 2016/4/7.
 *
 * depend:
 *      jQuery 1.11+
 *      iCheck v1.0.2, http://git.io/arlzeA
 *
 * Callbacks:
 *      onClick, onChange, onCheck, onUncheck, onToggle, onDisable, onEnable, onIndeterminate, onDeterminate, onCreate, onDestroy
 *
 * Methods:
 *      check, uncheck, toggle, disable, enable, indeterminate, determinate, update, destroy
 */

(function($) {

    var _niceCheck = 'niceCheck';

    $.fn[_niceCheck] = function(options, fire) {

        var _defaults = {
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            render: function(ckbox) {
                var $ckbox = $(ckbox);
                $ckbox.wrap('<label class=\"niced-check ' + ( $ckbox.is(':checked') ? 'checked' : '' ) + '\"></label>')
                    .before('<span class=\"label-name\">' + $ckbox.data('text') + '</span>');
            }
        };

        if (/^(check|uncheck|toggle|indeterminate|determinate|disable|enable|update|destroy)$/i.test(options)) {    //options参数代表的是一个操作
            $(this).iCheck(options, fire);
        } else if (typeof options == 'object' || !options) {    //options参数代表的是一个自定义配置，即：初始化过程

            var _options = _defaults;
            if (options) {
                _options = $.extend(_options, options);
            }

            $(this).each(function () {
                if($(this).next('ins').length == 0) {
                    _options.render(this);
                }
            });

            $(this).iCheck({
                checkboxClass: _options.checkboxClass,
                radioClass: _options.radioClass
            }).on("ifClicked", function (event) {
                if (_options.onClick && $.type(_options.onClick) == 'function') {
                    _options.onClick(event);
                }
            }).on("ifChanged", function (event) {
                if (_options.onChange && $.type(_options.onChange) == 'function') {
                    _options.onChange(event);
                }
            }).on("ifChecked", function (event) {
                $(this).parent().parent().addClass("checked");
                if (_options.onCheck && $.type(_options.onCheck) == 'function') {
                    _options.onCheck(event);
                }
            }).on("ifUnchecked", function (event) {
                $(this).parent().parent().removeClass("checked");
                if (_options.onUncheck && $.type(_options.onUncheck) == 'function') {
                    _options.onUncheck(event);
                }
            }).on("ifToggled", function (event) {
                if (_options.onToggle && $.type(_options.onToggle) == 'function') {
                    _options.onToggle(event);
                }
            }).on("ifDisabled", function (event) {
                if (_options.onDisable && $.type(_options.onDisable) == 'function') {
                    _options.onDisable(event);
                }
            }).on("ifEnabled", function (event) {
                if (_options.onEnable && $.type(_options.onEnable) == 'function') {
                    _options.onEnable(event);
                }
            }).on("ifIndeterminate", function (event) {
                if (_options.onIndeterminate && $.type(_options.onIndeterminate) == 'function') {
                    _options.onIndeterminate(event);
                }
            }).on("ifDeterminate", function (event) {
                if (_options.onDeterminate && $.type(_options.onDeterminate) == 'function') {
                    _options.onDeterminate(event);
                }
            }).on("ifCreated", function (event) {
                if (_options.onCreate && $.type(_options.onCreate) == 'function') {
                    _options.onCreate(event);
                }
            }).on("ifDestroyed", function (event) {
                if (_options.onDestroy && $.type(_options.onDestroy) == 'function') {
                    _options.onDestroy(event);
                }
            });
        }
    }

})(window.jQuery);