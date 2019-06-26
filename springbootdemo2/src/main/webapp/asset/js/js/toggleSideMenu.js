/**
 * Created by liteng on 15/6/15.
 */

var getViewPort = function () {
    var e = window, a = 'inner';
    if (!('innerWidth' in window)) {
        a = 'client';
        e = document.documentElement || document.body;
    }
    return {
        width: e[a + 'Width'],
        height: e[a + 'Height']
    }
}

var _sub_nav_opened;

var handleSideNavToggler = function () {
    var viewport = getViewPort();

    // 处理左侧菜单伸缩
    $('.side_nav_toggler').on('click', function (e) {
        var _body = $('body');
        var _sideWidgets = $(".side_widgets");

        if (_body.hasClass("side_nav_collapse")) {
            _body.removeClass("side_nav_collapse");
            _sideWidgets.show();
        } else {
            _body.addClass("side_nav_collapse");

            $(".nav_list > .nav > .sub_nav_list").css("display","");
            _sideWidgets.hide();
        }
    });

}

handleSideNavToggler();