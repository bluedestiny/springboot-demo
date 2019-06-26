/**
 * Created by liteng on 2015/12/9.
 */
(function($) {

    //构造函数
    var AccordionMenu = function(element, options) {
        console.log('AccordionMenu(element, options)');
        this.$element = $(element);
        this.options = $.extend({}, AccordionMenu.DEFAULTS, options);
        this.init();
    };

    //默认配置
    AccordionMenu.DEFAULTS = {
        toggle: true,
        mainSideMenuClass: 'main_side',
        collapseController: 'up_side_nav_toggler',
        sideCollapseClass: 'up_side_nav_collapse',
        menuItemWrap: 'up_nav',
        menuItem: 'up_nav_item',
        subMenu: 'up_sub_nav_list',
        expandedClass: 'expanded',
        hasExpandedClass: 'has-expanded',
        subMenuHidden: 'sub_nav_hidden',
        subMenuHiddenForSideCollapse: 'sub_nav_hidden_for_sc',
        activedClass: 'selected',
        hasActivedClass: 'has-selected',
        /*mainContentArea: 'main',*/
        /*sideMenuCollapsed: 'sideMenuCollapsed',*/
        sideMenuExpandHandler: function(){console.log("sideMenuExpandHandler:展开菜单");},
        sideMenuCollapseHandler: function(){console.log("sideMenuCollapseHandler:收起菜单");}
    };

    //初始化
    AccordionMenu.prototype.init = function() {
        console.log('AccordionMenu.init()');
        var _self = this;

        //侧向收起/展开菜单
        $('.' + this.options.collapseController).on('click', function(){
            _self.sideToggle();
        });

        //菜单项点击处理
        $('.' + this.options.menuItem).on('click', function(){
            console.log('li.up_nav-菜单项单击处理');
            var _menuItemWrap = $(this).parent();
            if(!_self.isSideCollapsed()) {
                console.log('菜单侧向展开状态');
                //菜单侧向展开时
                if (_self.hasSubmenu(_menuItemWrap)) {
                    console.log('含子菜单');
                    //含子菜单，控制子菜单收起/展开
                    _self.submenuToggle(_menuItemWrap);
                } else {
                    console.log('不含子菜单');
                    //不含子菜单，选中该菜单项
                    _self.selectItem(_menuItemWrap);
                }
            }else {
                console.log('菜单侧向收起状态');
                //菜单侧向收起时
                if (_self.hasSubmenu(_menuItemWrap)) {
                    console.log('含子菜单');
                    //含子菜单
                    //如果被点击项是一级菜单，则不产生任何动作
                    //如果非一级菜单，则控制子菜单收起/展开
                    if(_self.isRootLevel(_menuItemWrap)) {
                        rentrun;
                    }else {
                        _self.submenuToggle(_menuItemWrap);
                    }
                }else {
                    console.log('不含子菜单');
                    //不含子菜单，选中该菜单项
                    _self.selectItem(_menuItemWrap);
                }
            }
        });
    }

    //菜单侧向收起/展开切换
    AccordionMenu.prototype.sideToggle = function() {
        console.log('AccordionMenu.sideToggle()');
        if(this.isSideCollapsed()) {
            this.sideExpand();
        }else {
            this.sideCollapse();
        }
    }

    //菜单侧向收起
    AccordionMenu.prototype.sideCollapse = function() {
        console.log('AccordionMenu.sideCollapse()');
        $('.' + this.options.mainSideMenuClass).addClass(this.options.sideCollapseClass);
        /*$('.' + this.options.mainContentArea).addClass(this.options.sideMenuCollapsed);*/
        this.$element.children('.' + this.options.menuItemWrap).children('.' + this.options.subMenu + '.' + this.options.expandedClass).addClass(this.options.subMenuHiddenForSideCollapse);
        this.options.sideMenuCollapseHandler();
    }

    //菜单侧向展开
    AccordionMenu.prototype.sideExpand = function() {
        console.log('AccordionMenu.sideExpand()');
        $('.' + this.options.mainSideMenuClass).removeClass(this.options.sideCollapseClass);
        /*$('.' + this.options.mainContentArea).removeClass(this.options.sideMenuCollapsed);*/
        this.$element.children('.' + this.options.menuItemWrap).children('.' + this.options.subMenu + '.' + this.options.expandedClass).removeClass(this.options.subMenuHiddenForSideCollapse);
        this.options.sideMenuExpandHandler();
    }

    //菜单是否侧向收起
    AccordionMenu.prototype.isSideCollapsed = function() {
        console.log('AccordionMenu.isSideCollapsed()');
        return  $('.' + this.options.mainSideMenuClass).hasClass(this.options.sideCollapseClass);
    }

    //判断该菜单项是否是一级菜单项
    AccordionMenu.prototype.isRootLevel = function(el) {
        console.log('AccordionMenu.isRootLevel(el)');
        var _parents = $(el).parentsUntil(this.$element);
        return (_parents.length == 0);
    }

    //获取该菜单项的根级菜单项(jQuery对象)
    AccordionMenu.prototype.getRootMenuItemWrap = function(el) {
        console.log('AccordionMenu.getRootMenuItemWrap(el)');
        var _parents = $(el).parentsUntil(this.$element);
        if(_parents.length != 0) {
            return _parents.last();
        }else {
            if($(el).hasClass(this.options.menuItemWrap)) {
                return $(el);
            }else if($(el).hasClass(this.options.menuItem)) {
                return $(el).parent();
            }else {
                return false;
            }
        }
    }

    //子菜单收起/展开切换
    AccordionMenu.prototype.submenuToggle = function(el) {
        console.log('AccordionMenu.submenuToggle(el)');
        console.log('处理子菜单收放');
        if(this.isExpanded(el)) {
            console.log('子菜单展开状态');
            this.submenuCollapse(el);
        }else {
            console.log('子菜单收起状态');
            this.submenuExpand(el);
        }
    }

    //子菜单收起
    AccordionMenu.prototype.submenuCollapse = function(el) {
        console.log('AccordionMenu.submenuCollapse(el)');
        $(el).children('.' + this.options.subMenu).removeClass(this.options.expandedClass).addClass(this.options.subMenuHidden);
        $(el).removeClass(this.options.hasExpandedClass);
    }

    //子菜单展开
    AccordionMenu.prototype.submenuExpand = function(el) {
        console.log('AccordionMenu.submenuExpand(el)');
        if(this.options.toggle) {
            $(el).siblings('.' + this.options.menuItemWrap).children('.'+ this.options.subMenu).removeClass(this.options.expandedClass).addClass(this.options.subMenuHidden);
            $(el).siblings('.' + this.options.menuItemWrap).removeClass(this.options.hasExpandedClass);
        }
        $(el).children('.' + this.options.subMenu).addClass(this.options.expandedClass).removeClass(this.options.subMenuHidden);
        $(el).addClass(this.options.hasExpandedClass);
    }

    //菜单项选中
    AccordionMenu.prototype.selectItem = function(el) {
        console.log('AccordionMenu.selectItem(el)');
        this.$element.find('.' + this.options.activedClass).removeClass(this.options.activedClass);
        this.$element.find('.' + this.options.hasActivedClass).removeClass(this.options.hasActivedClass);

        /*if(this.options.toggle) {
            $(el).siblings('.' + this.options.menuItemWrap).children('.' + this.options.subMenu).removeClass(this.options.expandedClass).addClass(this.options.subMenuHidden);
            $(el).siblings('.' + this.options.menuItemWrap).removeClass(this.options.expandedClass);
        }*/

        /*$(el).children('.' + this.options.menuItem).addClass(this.options.activedClass);
        var _parents = $(el).parentsUntil(this.$element);
        if(_parents.length != 0) {
            _parents.last().addClass(this.options.hasActivedClass);
        }else {
            $(el).children('.' + this.options.menuItem).addClass(this.options.activedClass);
        }*/

        $(el).children('.' + this.options.menuItem).addClass(this.options.activedClass);
        $(el).parentsUntil(this.$element, '.' + this.options.menuItemWrap).addClass(this.options.hasActivedClass);
    }

    //菜单项(menuItemWrap)是否含有子菜单
    AccordionMenu.prototype.hasSubmenu = function(el) {
        console.log('AccordionMenu.hasSubmenu(el)');
        return ( $(el).children('.' + this.options.subMenu).length !== 0 );
    }

    //菜单项(menuItemWrap)的子菜单是否展开
    AccordionMenu.prototype.isExpanded = function(el) {
        console.log('AccordionMenu.isExpanded(el)');
        console.log('判断子菜单是否展开');
        return ( $(el).children('.' + this.options.subMenu).hasClass(this.options.expandedClass) );
    }

    AccordionMenu.prototype.isSelected = function(el) {
        console.log('AccordionMenu.isSelected(el)');
        return $(el).hasClass(activedClass);
    }

    AccordionMenu.prototype.hasSubmenuExpanded = function(el) {
        console.log('AccordionMenu.hasSubmenuExpanded(el)');
        return ( $(el).find(expandedClass).length > 0 );
    }

    AccordionMenu.prototype.hasSubmenuItemSelected = function(el) {
        console.log('AccordionMenu.hasSubmenuItemSelected(el)');
        return ( $(el).find(activedClass).length > 0 );
    }

    $.fn.accordionMenu = function(option) {
        if( this.length > 1 ){
            if(window.console) {
                console.log('只能存在一个\'AccordionMenu\'');
            }
            return false;
        }
        var _data = this.data('accordionMenu');
        var options = $.extend({}, AccordionMenu.DEFAULTS, typeof option === 'object' && option);

        if (!_data) {
            this.data('accordionMenu', new AccordionMenu(this, options));
        }

        return this;
    };

    $.fn.accordionMenu.Constructor = AccordionMenu;

})(jQuery);

