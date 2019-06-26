/**
 * Created by liteng on 2018/8/10.
 */
function Bsmodal(id, target, title, url, isStatic, sizeClassName, beginAction, beginData, endAction) {

    var _self = this;
    var _modal_size = '';

    if(id && typeof(id) == 'string' && id != '') {
        _self.id = id;
    } else {
        console.error('error: modal id is not specified!');
        return false;
    }


    if(sizeClassName && typeof(sizeClassName) == 'string' && sizeClassName != '') {
        console.log(sizeClassName);
        _modal_size = sizeClassName;
    }


    // bootstrap modal模板
    // ==================

    var modalTemplate =
        '<div id="' + id + '" data-custom="" class="modal fade bs-example-modal-lg normal-modal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">' +
            '<div class="modal-dialog ' + _modal_size + '" role="document">' +
                '<div class="modal-content">' +
                    '<div class="modal-header">' +
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                        '<h4 class="modal-title" id="gridSystemModalLabel">' + title + '</h4>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>';


    // 指定modal模板插入html的位置
    // ========================

    if(target && typeof(target) == 'string' && target != '') {
        $(target).append(modalTemplate);
    } else {
        $('body').append(modalTemplate);
    }


    // 保留"bootstrap modal"实例,外部内容容器的引用
    // ================================================

    var _backdrop = true;
    if(isStatic == false || isStatic == 'static') {
        _backdrop = 'static';
    }
    _self.modal = $('#' + id).modal({
        'backdrop': _backdrop
    });
    _self.container = $('.modal-body', _self.modal);

    if(url && typeof(url) == 'string' && url != ''){
        _self.load(url, function(){
            if(beginAction && typeof(beginAction) == 'function') {
                beginAction(beginData);
            }
        });
    }


    // modal关闭后执行用户传入的回调,并销毁modal
    // =====================================

    this.modal.on('hidden.bs.modal', function(e) {
        if(endAction && typeof(endAction) == 'function') {
            endAction(_self.getData());
        }
        console.log($(this));
        console.log(_self);
        $(this).remove();
        delete _self;
        console.log($(this));
        console.log(_self);
    })

}


// 加载外部页面
// ==========

Bsmodal.prototype.load = function(url, callback, callbackData) {
    this.container.load(url, function(){
        if(callback){
            callback(callbackData);
        }
    });
}


// 关闭窗口
// =======

Bsmodal.prototype.close = function() {
    this.modal.modal('hide');
}


// 获取bootstrap modal实例(即: jQuery对象)
// =====================================

Bsmodal.prototype.getModal = function() {
    return this.modal;
}


// 获取附加至modal上的用户数据
// ========================

Bsmodal.prototype.getData = function() {
    return this.modal.data('custom');
}


// 重置附加至modal上的用户数据
// ========================

Bsmodal.prototype.setData = function(data) {
    this.modal.data('custom', data);
}
