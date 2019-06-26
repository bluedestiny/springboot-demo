+function ($) {

    $('.checkbox-wrap').iCheck({
        checkboxClass: 'icheckbox_square-blue',
        radioClass: 'iradio_square-blue'
    }).on("ifChecked", function(event){
        $(this).parent().parent().parent().addClass("checked");
    }).on("ifUnchecked", function(event){
        $(this).parent().parent().parent().removeClass("checked");
    })

    $('input[name="viewType"]').niceCheck({
        render: function(ckbox) {
            var $ckbox = $(ckbox);
            $ckbox.wrap('<label class=\"asset-type-wrap pull-left ' + ( $ckbox.is(':checked') ? 'checked' : '' ) + '\" ></label>')
                .before('<img src=\"' + $ckbox.data('imgurl') + '\" width=\"24\" height=\"24\">')
                .before('<span class=\"asset-type-name\">' + $ckbox.data('text') + '</span>' )
        }
    });
}(jQuery);

