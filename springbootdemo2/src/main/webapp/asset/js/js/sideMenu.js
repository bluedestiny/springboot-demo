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

    //查看cookie留存的菜单状态
    /*if ($.cookie && $.cookie('sidebar_closed') === '1' && viewport.width >= 992) {
        $('body').addClass('page-sidebar-closed');
    }*/

    // 处理左侧菜单伸缩
    $('.side_nav_toggler').on('click', function (e) {
        var _body = $('body');
        var _sidebar = $('.main-side');

        if (_body.hasClass("side_nav_collapse")) {
            _body.removeClass("side_nav_collapse");
            _sub_nav_opened.removeClass("test").show();
            if ($.cookie) {
                $.cookie('sidebar_closed', '0');
            }
        } else {
            _body.addClass("side_nav_collapse");
            //$(".sub_nav_list").
            $(".nav_list > .nav > .sub_nav_list").addClass("test").css("display","");
            _sub_nav_opened = $(".nav_list > .nav.open > .sub_nav_list");
            console.log(_sub_nav_opened);
            //_sub_nav_opened.addClass("test").css("display","");


            //$(".sub-menu").removeAttr("style");
            if ($.cookie) {
                $.cookie('sidebar_closed', '1');
            }
        }
        //handleSidebarAndContentHeight(); //fix content & sidebar height
        //runResponsiveHandlers();
    });

}


var handleSideNavMenu = function () {
    $('.nav_list').on('click', 'li > a.nav_item', function (e) {
        var _this = $(this);
        if ($("body").hasClass("side_nav_collapse") && _this.parent().parent().hasClass("nav_list")) {
            return;
        }
        if (!_this.next().hasClass('sub_nav_list')) {
            return;
        }

        if (_this.next().hasClass('sub_nav_list always-open')) {
            return;
        }

        var _parent = _this.parent().parent();
        var _menu = $('.sub_nav_list');
        var _sub = _this.next();

        var slideSpeed = _menu.data("slide-speed") ? parseInt(_menu.data("slide-speed")) : 200;

        _parent.children('li.open').children('a').children('.arrow').removeClass('open');
        _parent.children('li.open').children('.sub_nav_list:not(.always-open)').slideUp(200);
        _parent.children('li.open').removeClass('open');

        var slideOffeset = -200;

        if (_sub.is(":visible")) {
            $('.arrow', _this).removeClass("open");
            _this.parent().removeClass("open");

            _sub.slideUp(slideSpeed, function () {
                //handleSidebarAndContentHeight();
            });

        } else {
            $('.arrow', _this).addClass("open");
            _this.parent().addClass("open");
            _sub.slideDown(slideSpeed, function () {
            //    handleSidebarAndContentHeight();
            });

        }

        e.preventDefault();
    });
}

handleSideNavToggler();
handleSideNavMenu();