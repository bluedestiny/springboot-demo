/*relation：运算关系
    * logic：逻辑关系
    * attribute:属性
    * expression  表达式
    * */
var commonRoot = [
    {
        "id": "OR1",
        "pid": "0",
        "relationLeaf": "OR",
        "name": "名称1",
        "field": "字段1",
        "value": "1",
        "logic": "="

    },
    {
        "id": "OR2",
        "pid": "0",
        "relationLeaf": "OR",
        "name": "名称2",
        "field": "字段2",
        "value": "1",
        "logic": "="
    },
    {
        "id": "AND1-1",
        "pid": "OR2",
        "relationLeaf": "AND",
        "name": "名称2-1",
        "field": "字段2-1",
        "value": "1",
        "logic": "="
    },
    {
        "id": "AND1-2",
        "pid": "OR2",
        "relationLeaf": "AND",
        "name": "名称2-1",
        "field": "字段2-1",
        "value": "1",
        "logic": "="
    },
    {
        "id": "OR2-1",
        "pid": "0",
        "relationLeaf": "NOT",
        "name": "名称1-1",
        "field": "字段1-1",
        "value": "1",
        "logic": "="
    },
    {
        "id": "NOTOR1-1",
        "pid": "OR1",
        "relationLeaf": "NOT",
        "name": "名称1",
        "field": "字段1",
        "value": "1",
        "logic": "="
    },
    {
        "id": "NOTOR2-1",
        "pid": "OR1",
        "relationLeaf": "NOT",
        "name": "名称1",
        "field": "字段1",
        "value": "1",
        "logic": "="
    },
    {
        "id": "and21-1",
        "pid": "0",
        "relationLeaf": "AND",
        "name": "名称laST",
        "field": "字段1",
        "value": "1",
        "logic": "="
    }
];
/*
$(document).on("click", ".h_title_btn", function () {
    var h_BtnVal = $(this).val();
    var h_BtnLen = $('.h_remove_del').length;
    var h_TrLen = $('.h_last_tr').parent().nextAll().length;
    var h_BtnId = $(this).attr('id');

 /!*   console.log(commonRoot);*!/


   /!* if (h_BtnLen < 1) {
       /!* $(this).parent().siblings().empty().append(getName(h_BtnVal));*!/
        $(this).parent().siblings().remove();
        $(this).parent().parent().append(getName(h_BtnVal, h_BtnId))
    } else if (h_BtnLen >= 1 || h_TrLen == 1) {
        $('.h_last_tr').parent().next().remove();
        $('.h_last_tr').removeClass('h_last_tr');
      /!*  $('.h_last_tr').parent().after(addTable(h_BtnVal))*!/
        $('#h-standart-div>div').children('.h_table_content').children('tbody').append(addTable(h_BtnVal))
    }*!/

    if (h_BtnLen <= 1) {

        var parentDiv = $(this).parent().siblings().attr('id');

        console.log(parentDiv);
        if (parentDiv == 'h-standart-div') {
            $(this).parent().siblings().children().remove();
            $(this).parent().siblings().append(getName(h_BtnVal));
        }
    }
    else  if (h_BtnLen >1 || h_TrLen == 1) {
        $('.h_last_tr').parent().next().remove();
        $('.h_last_tr').removeClass('h_last_tr');
        $('#h-standart-div>div').children('.h_table_content').children('tbody').append(addTable(h_BtnVal))

    }




});*/
$(document).on("click", ".h_title_btn", function () {

        var h_BtnVal = $(this).val();
        var h_BtnLen = $('.h_remove_del').length;
        var h_TrLen = $('.h_last_tr').parent().nextAll().length;
        console.log(h_BtnVal);
        console.log(h_BtnLen);
        console.log(h_TrLen);
        if (h_BtnLen <= 1) {

            var parentDiv = $(this).parent().siblings('div').attr('id');

            console.log($(this).parent().siblings());
            console.log(parentDiv);
            if (parentDiv == 'h-standart-div') {
                $(this).parent().siblings().children().remove();
                $(this).parent().siblings().append(getName(h_BtnVal));
            }
        }
        else  if (h_BtnLen >1 || h_TrLen == 1) {
            $('.h_last_tr').parent().next().remove();
            $('.h_last_tr').removeClass('h_last_tr');
            $('#h-standart-div>div').children('.h_table_content').children('tbody').append(addTable(h_BtnVal))

        }

    }
);

$(document).on("click", ".h_cond_btn", function () {
    var h_CondBtnVal = $(this).val();
    var h_BtnId = $(this).attr('id');
  /*  console.log(h_BtnId);*/
    var len = $(this).parents(".h_table_content").length;
    if (len > 4) {
        alert("无法在此处添加运算符，过滤器最大深度为5；说明：运算符可以位于的最大深度级别为4");
        return;
    }
    if (h_CondBtnVal == "条件") {
        $(this).parent().empty().append(
            "<input class=\"m_add_input h_select\" value=\"数据名称\" type=\"text\"><input class=\"m_add_input h_select\" value=\"数据字段\" type=\"text\"><select class=\"m_add_input h_select\"><option> ＞</option>\ " +
            " <option> = </option><option>＜ </option><option> 大于 </option></select><input class=\"m_add_input h_select\" type=\"text\">"
        );
    } else /*if (h_CondBtnVal == "AND")*/ {
        $(this).parent().empty().append(getName(h_CondBtnVal, h_BtnId));

    }

});

$(document).on("click", ".h_remove_del", function () {
    $(this).parent().empty().append(
        "<input class=\"m_add_input h_select\" value=\"数据名称\" type=\"text\"><input class=\"m_add_input h_select\" value=\"数据字段\" type=\"text\"><select class=\"m_add_input h_select\"><option> ＞</option>\ " +
        " <option> = </option><option>＜ </option><option> 大于 </option></select><input class=\"m_add_input h_select\" type=\"text\">" +
        "<em class=\"h_em_tj\"></em>" +
        "<input class=\"btn h_cond_btn h_btn_and\" style=\"\" type=\"button\" value=\"AND\">" +
        "<input class=\"btn h_cond_btn h_btn_or\" style=\"\" type=\"button\" value=\"OR\">" +
        "<input class=\"btn h_cond_btn h_btn_not\" style=\"\" type=\"button\" value=\"NOT\">"
    );


});

function addTable(nameVal) {
    var className = nameVal.toLocaleLowerCase();
    return "<tr><td>&nbsp;</td><td class=\"h_leftTop_border\">&nbsp;</td></tr>" +
        "<tr><td COLSPAN=\"2\" class=\"h_table_text\">" + nameVal + "</td></tr>" +
        "<tr><td>&nbsp;</td><td class=\"h_leftBot_border\">&nbsp;</td>" +
        "<td ROWSPAN=\"2\" colspan=\"2\" class=\"h_Content_border h_last_tr\">" +
        "<div class=\"h_div_border\" > <input class=\"m_add_input h_select\" value=\"数据名称\" type=\"text\"><input class=\"m_add_input h_select\" value=\"数据字段\" type=\"text\"><select class=\"m_add_input h_select\"><option> ＞</option>\ " +
        " <option> = </option><option>＜ </option><option> 大于 </option></select><input class=\"m_add_input h_select\" type=\"text\">" +
        "<em class=\"h_em_tj\"></em>" +
        "<input class=\"btn h_cond_btn h_btn_and\"  type=\"button\" value=\"AND\">" +
        "<input class=\"btn h_cond_btn h_btn_or\"  type=\"button\" value=\"OR\">" +
        "<input class=\"btn h_cond_btn h_btn_not\" type=\"button\" value=\"NOT\"></div>" +
        "</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr>"
}


function getName(nameVal, id) {


    var className = nameVal.toLocaleLowerCase();
    var id1 = "1";
    var id2 = "2";
    if (id) {
        id1 = id + "-1";
        id2 = id + "-2";
    }
    return "<div class=\"h_" + className + "_div\"> " +
        "<table class=\"h_table_content\" cellspacing=\"0\" cellpadding=\"0\">" + "<tr><td>&nbsp;</td>" +
        "<td class=\"h_bottom_border\">&nbsp;</td><td ROWSPAN=\"2\" class=\"h_Content_border\">" +
        "<div class=\"h_div_border\" ><input class=\"m_add_input h_select\" value=''  type=\"text\"><input class=\"m_add_input h_select\" type=\"text\"><select class=\"m_add_input h_select\"><option> ＞</option>\ " +
        " <option> = </option><option>＜ </option><option> 大于 </option></select><input class=\"m_add_input h_select\" type=\"text\">" +
        "<em class=\"h_em_tj\"></em>" +
        "<input class=\"btn h_cond_btn h_btn_and\"  type=\"button\" id=\"And" + id1 + "\" value=\"AND\">" +
        "<input class=\"btn h_cond_btn h_btn_or\"  type=\"button\" id=\"OR" + id1 + "\" value=\"OR\">" +
        "<input class=\"btn h_cond_btn h_btn_not\" type=\"button\" id=\"NOT" + id1 + "\" value=\"NOT\">" +
        "</div></td></tr><tr><td>&nbsp;</td>" +
        "<td class=\"h_leftTop_border\">&nbsp;</td></tr>" +
        "<tr><td COLSPAN=\"2\" class=\"h_table_text\">" + nameVal + "</td></tr>" + "<tr><td>&nbsp;</td>" +
        "<td class=\"h_leftBot_border\">&nbsp;</td><td ROWSPAN=\"2\" colspan=\"2\" class=\"h_Content_border h_last_tr\">" +
        "<div class=\"h_div_border\" ><input class=\"m_add_input h_select\"  type=\"text\"><input class=\"m_add_input h_select\"  type=\"text\"><select class=\"m_add_input h_select\"><option> ＞</option>\ " +
        " <option> = </option><option>＜ </option><option> 大于 </option></select><input class=\"m_add_input h_select\" type=\"text\">" +
        "<em class=\"h_em_tj\"></em>" +
        "<input class=\"btn h_cond_btn h_btn_and\"  type=\"button\" id=\"And" + id2 + "\" value=\"AND\">" +
        "<input class=\"btn h_cond_btn h_btn_or\"  type=\"button\" id=\"OR" + id2 + "\" value=\"OR\">" +
        "<input class=\"btn h_cond_btn h_btn_not\"  type=\"button\" id=\"NOT" + id2 + "\" value=\"NOT\">" +
        "</div></td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table>" + "<a class=\"h_remove_del h_position_a\"><i class=\"fa fa-times\"></i></a>" + "</div>"
}


function optionFn(logic) {
    var last = '';
    if (logic == '=') {
        last += '<option selected>=</option>';

    } else {
        last += '<option>=</option>';
    }

    if (logic == '!=') {
        last += '<option selected>!=</option>';
    } else {
        last += '<option >!=</option>';
    }

    if (logic == '>') {
        last += '<option selected>></option>';
    } else {
        last += '<option >></option>';
    }

    if (logic == '>=') {
        last += '<option selected>=</option>';
    } else {
        last += '<option >=</option>';
    }

    if (logic == '<') {
        last += '<option selected><</option>';
    } else {
        last += '<option ><</option>';
    }

    if (logic == '<=') {
        last += '<option selected><=</option>';
    } else {
        last += '<option ><=</option>';
    }

    if (logic == 'In') {
        last += '<option selected>In</option>';
    } else {
        last += '<option >In</option>';
    }


    if (logic == 'Contains') {
        last == '<option selected>Contains</option>';
    } else {
        last == '<option >Contains</option>';
    }

    return last


}
function getChildren(pid) {
    var arrayChild = new Array();
    for (var i = 0; i < commonRoot.length; i++) {
        if (commonRoot[i].pid == pid) {
            arrayChild.push(commonRoot[i]);
        }
    }
    return arrayChild;
}

function draw(cur, curpid) {
    var last = '';
    var children = getChildren(curpid);

    console.log(children.length);
    if (children.length == 0) {
        console.log("is a leaf");
        last += drawItem(cur);


    } else {
        for (var i = 0; i < children.length; i++) {
            if (i == 0) {

                last += "<div class=\"h_"+children[i].relationLeaf+"_div\"> " +
                    "<table class=\"h_table_content\" cellspacing=\"0\" cellpadding=\"0\">" +
                    "<tr><td>&nbsp;</td><td class=\"h_bottom_border\">&nbsp;</td>" +
                    "<td ROWSPAN=\"2\" class=\"h_Content_border\">";
                var childrenNew = draw(children[i], children[i].id);
                last += childrenNew;
                last += "</td></tr>" +
                    "<tr><td>&nbsp;</td><td class=\"h_leftTop_border\">&nbsp;</td></tr>";
                last += "<tr><td COLSPAN=\"2\" class=\"h_table_text\">"+children[i].relationLeaf+"</td></tr>";


                continue;
            }

            if (i != children.length - 1) {


                last += "<tr><td>&nbsp;</td>" +
                    "<td class=\"h_leftBot_border\">&nbsp;</td>" +
                    "<td ROWSPAN=\"2\" colspan=\"2\" class=\"h_Content_border\">";
                childrenNew = draw(children[i], children[i].id);
                last += childrenNew;
                last += "</td></tr><tr><td>&nbsp;</td>" +
                    "<td class=\"h_leftTop_border\">&nbsp;</td>";

                last += "</td></tr>";
                last += "</tr>" +
                    "<tr><td COLSPAN=\"2\" class=\"h_table_text\">"+children[i].relationLeaf+"</td></tr>" + "<tr><td style='border-right: 1px solid #ccc'>&nbsp;</td>"



                continue;


            }
            if (i == children.length - 1) {
                last += "<tr><td >&nbsp;</td>" +
                    "<td class=\"h_leftBot_border\">&nbsp;</td>" +
                    "<td ROWSPAN=\"2\" colspan=\"2\" class=\"h_Content_border h_last_tr\">";

                childrenNew = draw(children[i], children[i].id);
                last += childrenNew;
                last += "</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr>" + "</table>" +
                    "<a class=\"h_remove_del h_position_a\"><i class=\"fa fa-times\"></i></a>" + "</div>"
            }


        }

    }


    // console.log(last);
    return last;
}

function drawItem(cur) {
    var info = '';


    info += "<div class=\"h_div_border\" ><input class=\"m_add_input h_select\" value=\'" + cur.name + "\'  type=\"text\"><input class=\"m_add_input h_select\" value=\'" + cur.field + "\' type=\"text\"><select class=\"m_add_input h_select\">" + optionFn(cur.logic) + "" +
        "</select><input class=\"m_add_input h_select\" value=\'" + cur.value + "\' type=\"text\">" +
        "<em class=\"h_em_tj\"></em>" +
        "<input class=\"btn h_cond_btn h_btn_and\"  type=\"button\" id=\"AND" + cur.id + " \" value=\"AND\">" +
        "<input class=\"btn h_cond_btn h_btn_or\"  type=\"button\" id=\"OR" + cur.id + "\" value=\"OR\">" +
        "<input class=\"btn h_cond_btn h_btn_not\" type=\"button\" id=\"NOT" + cur.id + "\" value=\"NOT\">" +
        "</div>";

    return info;
}
$(document).ready(function() {
    $('#h-standart-div').append(draw(null, '0', 0));
})
/*
$(window).load(function() {
    alert("hello");
});

window.onload = function () {
    $('body').append(draw(null, '0', 0));
};*/
