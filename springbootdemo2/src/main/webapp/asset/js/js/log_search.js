	//页面保存管理函数
	function PageSaveList(){
		$.ajax({
			type : "post",
			url : "pageViewList.action",
			data : {},
			dataType : "json",
			success : function(json) {
				var content = '';
				$.each(json.data, function(key,value) {    
					content += "<li><a id ='" +value.VIEW_ID + "'><span class='menu-content m_title_text' title=\""+  value.VIEW_NAME + "\">" + value.VIEW_NAME +"</span></a></li>";
				});
			$("#showItemList").append(content);	
			}
		});	
	}
	 
	$(document).off('click',"#showItemList a").on("click","#showItemList a",function(){

		recoverFieldPage($(this).attr("id"),eval($(this).attr("content")));
		$("#savePagebu").trigger("click");
	});
	
	
	function checkTime(i)
	{
	if (i<10) 
	  {i="0" + i}
	  return i
	}


    String.prototype.startsWith=function(s){
        if(s==null||s==""||this.length==0||s.length>this.length)
            return false;
        if(this.substr(0,s.length)==s)
            return true;
        else
            return false;
        return true;
    }
	
	//时间的近期与实际的处理
	function dealTimeFormat(start,end,isChart){
		var date = new Date();
		if(!start.startsWith("-") && end == "now"){
			var str = date.toISOString().substring(0, date.toISOString().indexOf('T')) + " " + checkTime(date.getHours()) + ":" + checkTime(date.getMinutes()) + ":" + checkTime(date.getSeconds());
			if(!isChart){
				$("#top_search_date_end").val(str); //设置时间
			}
			end = str;
		}else if (start.startsWith("-") && end != "now"){
			 var num = start.substring(1,start.length-1);
			 var str = '';
			 if(start.endsWith("d")){
					date.setDate(date.getDate() - num);
				 str = date.toISOString().substring(0, date.toISOString().indexOf('T')) + " " + checkTime(date.getHours()) + ":" + checkTime(date.getMinutes()) + ":" + checkTime(date.getSeconds());
			 }else if(start.endsWith("m")){
				 	date.setMinutes(date.getMinutes() - num);
				 str = date.toISOString().substring(0, date.toISOString().indexOf('T')) + " " + checkTime(date.getHours()) + ":" + checkTime(date.getMinutes()) + ":" + checkTime(date.getSeconds());
			 }else if(start.endsWith("h")){
				    date.setMinutes(date.getMinutes() - num);
				 str = date.toISOString().substring(0, date.toISOString().indexOf('T')) + " " + checkTime(date.getHours()) + ":" + checkTime(date.getMinutes()) + ":" + checkTime(date.getSeconds());
			 }
			 if(!isChart){
				 $("#top_search_date_start").val(str);
			 }
			 start = str;
		}
		return [start,end];
	}
	
	
	
	
	
	
	//时间格式的匹配检查
	
	function checkTimeFormat(start,end){
		var result = false;
		var reg = /^-[0-9]*[dhm]$/; //开始时间的正则匹配规则
        var patt1=/^[0-9]{4}-(([0][1-9])|([1][0-2]))-(([0][1-9])|([1-2][0-9])|([3][0-1]))\s{1}(([0-1][0-9])|([2][0-3])):[0-5][0-9]:[0-5][0-9]$/;
		if(!reg.test(start)&&!patt1.test(start)){
			result = true;
		}else if(end !='now'&& !patt1.test(end)){
			result = true;
		} 
		return result;
	}
	
	
	
	
	
	
	function splitTime(startTime,endTime){
		$("#top_search_date_start").val(startTime); //设置年月日
		$("#top_search_date_end").val(endTime); //设置年月日
	}
	
	
//	 /* 初始化日历 */
//	 $(document).ready( function () {     
//	   
//	    
//	    $("#start_hour_box").find("a").click(function(){
//	    	var str = $(this).text();
//	    	str = str.substr(0,2);
//	    	$("#top_search_time_start_hh").val(str);
//	    
//	    });
//	    
//	     $("#start_minute_box").find("a").click(function(){
//	    	var str = $(this).text();
//	    	str = str.substr(0,2);
//	    	$("#top_search_time_start_mm").val(str);
//	    
//	    });
//	    
//	      $("#start_second_box").find("a").click(function(){
//	    	var str = $(this).text();
//	    	str = str.substr(0,2);
//	    	$("#top_search_time_start_ss").val(str);
//	    
//	    });
//	    
//	    $("#end_hour_box").find("a").click(function(){
//	    	var str = $(this).text();
//	    	str = str.substr(0,2);
//	    	$("#top_search_time_end_hh").val(str);
//	    
//	    });
//	    
//	    $("#end_minute_box").find("a").click(function(){
//	    	var str = $(this).text();
//	    	str = str.substr(0,2);
//	    	$("#top_search_time_end_mm").val(str);
//	    
//	    });
//	    
//	    $("#end_second_box").find("a").click(function(){
//	    	var str = $(this).text();
//	    	str = str.substr(0,2);
//	    	$("#top_search_time_end_ss").val(str);
//	    
//	    });
//	})
	
	
	
	


$(document).ready( function () {
	

	/* 日志字段 */
	$(document).off('click',".field-node").on("click",".field-node",function(e){
	  if($(this).hasClass("has-sub")) {
	    var $sub_field_tree = $(this).next("ul.sub-field-tree");
	    if( $sub_field_tree.hasClass("collapsed") ) {
	      $sub_field_tree.removeClass("collapsed")
	    }else {
	      $sub_field_tree.addClass("collapsed")
	    }
	  }else {
		  if(highbutton == 0&&!$(this).hasClass("is-leafss")){
			  $("#field_value_content").show();
		  }
	  }
	})
	
	
	//主页面保存过滤
	$(".event-value-savename").keyup(function(){
		var str = $(this).val();
		var aList = $("#showItemList").find("li");
		$.each(aList, function(key,value) { 
			var txt = $(value).children().text();
			var patt1 = new RegExp(".*"+str+".*");
	        if ( patt1.test(txt) )
	        {
	            $(value).show();
	        }else{
	        	$(value).hide();
	        }
		});
	});
	
	
	
	
	
	//最近十分钟按钮
	
	
	//最近7天
	$("#nearSevenDays").click(function(){
		$("#top_search_date_end").val("now"); //设置年月日
		$("#top_search_date_start").val('-7d'); //设置年月日
		fieldValue = fieldValue.split(" ")[0] + " 00:00:00" ;
    	fieldEndValue = fieldEndValue.split(" ")[0] + " 00:00:00" ;
		query();
	});
	
	
	
	/* 初始化侧栏导航 */
	$('.up_nav_list').accordionMenu({
		sideMenuExpandHandler: function(){
				$('.main').removeClass('sideMenuCollapsed');
				$('#event_log_trend').highcharts().reflow();
			},
        sideMenuCollapseHandler: function(){
				$('.main').addClass('sideMenuCollapsed');
				$('#event_log_trend').highcharts().reflow();
        	}
	});

    /* 初始化“搜索类型”下拉菜单 */
    $('.select').niceSelect();


    /* 展开/收起 日志趋势图 */
    $("#chart_toggle_action").on("click", function(e){
      if( $(this).hasClass("collapse") ) {
        $(this).removeClass("collapse").addClass("expand");
        $("#event_log_trend").hide();
      }else {
        $(this).removeClass("expand").addClass("collapse");
        $("#event_log_trend").show();
      }
    })

    /* 初始化tab */
    $("ul.event_tabs").tabs("#event_tab_pane > div"); //, {initialIndex: 1}

    /* 初始化子tab */
    $("ul.stats_tabs").tabs("#stats_tab_pan > div");



    $("#field_value_content_close").on("click", function(e) {
      $("#field_value_content").hide();
    })

    $("#field_value_select_action").on("click", function(e) {
      if ($(".multi-select", this).is(":visible")) {
        $(".multi-select", this).hide();
        $(".submit-selected", this).show();
        $("#field_value_list").find(".field-value-mark").hide();
        $("#field_value_list").find(".field-value-check").show();
      }else if($(".submit-selected", this).is(":visible")) {
        $(".multi-select", this).show();
        $(".submit-selected", this).hide();
        //$("#field_value_list").find(".field-value-mark").show();
        $("#field_value_list").find(".field-value-check").hide();
      }
    })

    $("#close_log_field").on("click", function(e) {
      $(".log-field-wrap").hide();
      $("#field_value_content").hide();
      $("#log_field_active").show();
      $(".log-list-wrap").addClass("full-row");
      // $("#show_log_field").show();
    })

    $("#log_field_active").on("click", function() {
      $(".log-field-wrap").show();
      $(this).hide();
      $(".log-list-wrap").removeClass("full-row");
    })

    /* 日志列表-行展开/收缩 */
    $(document).off('click',".row-toggle").on("click",".row-toggle",function(){
      var $currentrow = $(this).parents("tr");
      if($(this).hasClass("expand")) {
        $(this).removeClass("expand").addClass("collapse");
        $(".event-summary", $currentrow).show();
        $(".event-detail", $currentrow).hide();
        $currentrow.removeClass("active-row");
      }else {
        $(this).removeClass("collapse").addClass("expand");
        $(".event-summary", $currentrow).hide();
        $(".event-detail", $currentrow).show();
        $currentrow.addClass("active-row");
      }
    })
            
    /* 初始化日志趋势图 */
//    $('#event_log_trend').highcharts({
//      chart: {
//        type: 'column',
//        backgroundColor: 'transparent',
//        height: 130,
//        marginBottom: 25,
//        marginLeft: 45
//      },
//      colors: ['#52C278'],
//      title: {
//        text: ''
//      },
//      xAxis: {
//        type: 'datetime',
//        labels: {
//          // align: 'left',
//          // step: 4,
//          style: {
//            color: '#888',
//            fontSize: '12px',
//            fontFamily: 'Verdana, sans-serif'
//          },
//          tickmarkPlacement: 'on'
//        },
//        tickLength: 4,
//        crosshair: false
//      },
//      yAxis: {
//        min: 0,
//        gridLineColor: '#ddd',
//        title: {
//          text: ''
//        },
//        labels: {
//          style: {
//            color: '#888',
//            fontSize: '12px',
//            fontFamily: 'Verdana, sans-serif'
//          }
//        }
//      },
//      legend: {
//        enabled: false
//      },
//      tooltip: {
//        pointFormat: '<b>{point.y:.1f}</b>'
//      },
//      plotOptions: {
//        series: {
//            pointPadding: 0.05,
//            groupPadding: 0,
//            borderWidth: 0,
//            shadow: false,
//            pointStart: Date.UTC(2010, 0, 1),
//            pointInterval: 3 * 3600 * 1000 // 3小时
//        }
//      },
//      series: [{
//        name: 'event log',
//        data: [1692,1080,2081,2548,1453,145,2693,2986,2371,666,1333,2492,2151,1764,2908,663,2265,2710,2823,119,2578,736,1117,353,1121,1692,1080,2081,2548,1453,145,2693,2986,2371,666,1333,2492,2151,1764,2908,663,2265,2710,2823,119,2578,736,1117,353,1121]
//      }],
//      exporting: {
//        enabled: false
//      },
//      credits: {
//        enabled: false
//      }
//    });


    /* 统计视图 */
    //$(".dropdown-menu > li").on("click", function(){
    $(document).off('click','.dropdown-menu > li').on("click", ".dropdown-menu > li",function(){
        var _select_item_text = $("a",this).attr("name");//html();
        var _select_item_html = $("a",this).html();

     //   console.log(_select_item_text);
        $(this).parent().prev().find(".curr-type").html(_select_item_html);
        $(this).parent().prev().find(".curr-type").attr("name",_select_item_text);
        if(_select_item_text=="pie" || _select_item_text=="bar"){
        	
        	$("#labeltimeinterval_Id").css("display","none");
        	$("#multiLeveltimeInterval_Id").css("display","none");
        	$("#timeintervaldiv_Id").css("display","none");
        	
        	$("#stepTwoLabeltimeinterval_Id").css("display","none");
        	$("#stepTwoTimeInterval_Id").css("display","none");
        	$("#stepTwoTimeintervaldiv_Id").css("display","none");
        	
        	$("#thirdStepLabeltimeinterval_Id").css("display","none");
        	$("#thirdStepTimeInterval_Id").css("display","none");
        	$("#thirdStepTimeintervaldiv_Id").css("display","none");
        	
        }else if(_select_item_text=="line" ||_select_item_text=="area" ||_select_item_text=="scatter" ||_select_item_text=="column"){
        
        	$("#labeltimeinterval_Id").css("display","");
        	$("#multiLeveltimeInterval_Id").css("display","");
        	$("#timeintervaldiv_Id").css("display","");
        	
        	$("#stepTwoLabeltimeinterval_Id").css("display","");
        	$("#stepTwoTimeInterval_Id").css("display","");
        	$("#stepTwoTimeintervaldiv_Id").css("display","");
        	
        	$("#thirdStepLabeltimeinterval_Id").css("display","");
        	$("#thirdStepTimeInterval_Id").css("display","");
        	$("#thirdStepTimeintervaldiv_Id").css("display","");
        }
        
         if(typeof($("a",this).attr("myAttr"))!="undefined"){ //多级统计step2根据选择的字段类型对统计方式进行初始化
        	if($("a",this).attr("myAttr")=="int"){
        		$("#stepTwoUL_Id").find("li").remove();
	        	$("#stepTwoUL_Id").append("<li><a name='Count' href='javascript:void(0)'>计数</a></li>"
									     +"<li><a name='Sum' href='javascript:void(0)'>求和</a></li>"
									     +"<li><a name='Avg' href='javascript:void(0)'>平均值</a></li>"
									     +"<li><a name='Max' href='javascript:void(0)'>最大值</a></li>"
									     +"<li><a name='Min' href='javascript:void(0)'>最小值</a></li>"
									     +"<li><a name='Unique' href='javascript:void(0)'>独立数</a></li>");
        	}else if($("a",this).attr("myAttr")=="Str"){
        		$("#stepTwoUL_Id").find("li").remove();
        		$("#stepTwoUL_Id").append("<li><a name='Count' href='javascript:void(0)'>计数</a></li>"
				   						 +"<li><a name='Unique' href='javascript:void(0)'>独立数</a></li>");
        	}else if($("a",this).attr("myAttr")=="thirdInt"){
        		$("#thirdStepTwoUL_Id").find("li").remove();
	        	$("#thirdStepTwoUL_Id").append("<li><a name='Count' href='javascript:void(0)'>计数</a></li>"
									     +"<li><a name='Sum' href='javascript:void(0)'>求和</a></li>"
									     +"<li><a name='Avg' href='javascript:void(0)'>平均值</a></li>"
									     +"<li><a name='Max' href='javascript:void(0)'>最大值</a></li>"
									     +"<li><a name='Min' href='javascript:void(0)'>最小值</a></li>"
									     +"<li><a name='Unique' href='javascript:void(0)'>独立数</a></li>");
        	}else if($("a",this).attr("myAttr")=="thirdStr"){
        		$("#thirdStepTwoUL_Id").find("li").remove();
        		$("#thirdStepTwoUL_Id").append("<li><a name='Count' href='javascript:void(0)'>计数</a></li>"
				   						 +"<li><a name='Unique' href='javascript:void(0)'>独立数</a></li>");
        	}
        }
    })

//    $("#event_counter_action").on("click", function(){
//        createChart("event_counter_chart");
//    })
/*
    function createChart(id){
        $('#' + id).highcharts({
            chart: {
                type: 'column',
                backgroundColor: 'transparent',
                height: 200,
                marginBottom: 25,
                marginLeft: 45
            },
            colors: ['#4691E8'],
            title: {
                text: ''
            },
            xAxis: {
                type: 'datetime',
                labels: {
                    // align: 'left',
                    // step: 4,
                    style: {
                        color: '#888',
                        fontSize: '12px',
                        fontFamily: 'Verdana, sans-serif'
                    },
                    tickmarkPlacement: 'on'
                },
                tickLength: 4,
                crosshair: false
            },
            yAxis: {
                min: 0,
                gridLineColor: '#ddd',
                title: {
                    text: ''
                },
                labels: {
                    style: {
                        color: '#888',
                        fontSize: '12px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                pointFormat: '<b>{point.y:.1f}</b>'
            },
            plotOptions: {
                series: {
                    pointPadding: 0.05,
                    groupPadding: 0,
                    borderWidth: 0,
                    shadow: false,
                    pointStart: Date.UTC(2010, 0, 1),
                    pointInterval: 3 * 3600 * 1000 // 3小时
                }
            },
            series: [{
                name: 'event log',
                data: [1692,1080,2081,2548,1453,145,2693,2986,2371,666,1333,2492,2151,1764,2908,663,2265,2710,2823,119,2578,736,1117,353,1121,1692,1080,2081,2548,1453,145,2693,2986,2371,666,1333,2492,2151,1764,2908,663,2265,2710,2823,119,2578,736,1117,353,1121]
            }],
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            }
        });
    }

   */
//    $("#time_slice_action").on("click", function(){
//        createChart("time_slice_chart");
//    })

    function makeid()
    {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }

    $("#datetime_form_wrap").off('click','.remove_datetime_field').on("click", ".remove_datetime_field", function(){
        $(this).parent().parent().remove();
    })
    
    /*$("#range_form_wrap").off('click','.remove_range_field').on("click", ".remove_range_field", function(){
        $(this).parent().parent().remove();
    })*/
    
	/*$("#add_filters").off('click','.remove_range_filter').on("click", ".remove_range_filter", function(){
    	$(this).parent().parent().remove();
    })*/

    /*$("#y_axis_container").off('click','.remove_range_Metrics').on("click", ".remove_range_Metrics", function(){
    	$(this).parent().parent().remove();
    })*/

 	/*$("#x_axis_container").off('click','.remove_range_Buckets').on("click", ".remove_range_Buckets", function(){
		$(this).parent().parent().remove();
		bucketsNumber = bucketsNumber - 1;
		if(bucketsNumber<2){
			$("#bucketsAdd").show();
		}
    })*/

    $("#add_datetime_field").on("click", function(){
        var _startdateId = makeid();
        var _enddateId = makeid();
        var _html = '<div class=\"form-group\" style=\"margin-top: 10px;display:block\"><div><input type=\"text\" name=\"range_from\" class=\"form-control input-sm\" id=\"' + _startdateId + '\" ><span> ~ </span><input type=\"text\" name=\"range_to\" class=\"form-control input-sm\" id=\"' + _enddateId + '\" > <a class=\"remove_datetime_field\"><i class=\"fa fa-times\"></i></a></div></div>';
		$("#datetime_form_wrap").append(_html);
        $("#" + _startdateId).AnyTime_noPicker().AnyTime_picker(timeOption);
        $("#" + _enddateId).AnyTime_noPicker().AnyTime_picker(timeOption);
    })
    
     $("#add_range_field").on("click", function(){
        var _startdateId = makeid();
        var _enddateId = makeid();
        var _html = '<div class=\"form-group\" style=\"margin-top: 10px;display:block\"><div><input type=\"text\" name=\"range_from\" class=\"form-control input-sm\" id=\"' + _startdateId + '\" ><span> ~ </span><input type=\"text\" name=\"range_to\" class=\"form-control input-sm\" id=\"' + _enddateId + '\" > <a class=\"remove_range_field\"><i class=\"fa fa-times\"></i></a></div></div>';
        $("#range_form_wrap").append(_html);
    })
    

    $("#add_percent").on("click", function(){
        $("#new_percent").show();
        $("#new_percent .percent-value-input").focus();
        //$(".percent-list")
    })
    $("#new_percent .percent-submit").on("click", function(){
		var value = $(this).parent().find("input").val();
		if(value < 0 || value == null || value == ""){
			$.messager.alert("操作提示", "百分比只能为正数数字！", "error");
			return;
		}
        var _html = '<li class=\"percent-item\"><span class=\"percent-value\">' + $("#new_percent .percent-value-input").val() + '%</span> <a class=\"percent-close\"><i class=\"fa fa-times\"></i></a></li>';
        $("#new_percent .percent-value-input").val("");
        $("#new_percent").hide();
        $("#new_percent").before(_html);

    })
    $("#percent_list_wrap").off('click','.percent-close').on("click", ".percent-close", function(){
        if($(this).parent().attr("id") == "new_percent") {
            $("#new_percent .percent-value-input").val("");
            $(this).parent().hide();
        }else{
            $(this).parent().remove();
        }

    })

})