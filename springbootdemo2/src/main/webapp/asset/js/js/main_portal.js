
$(document).ready( function () {

    /* 初始化侧栏导航 */
    /*$('.up_nav_list').accordionMenu({
        sideMenuExpandHandler: function(){
            $('.main').removeClass('sideMenuCollapsed');
            gridster.resize_widget_dimensions({widget_base_dimensions: [$('.gridster').width()  * .5 - 10*2, 380]});
        },
        sideMenuCollapseHandler: function(){
            $('.main').addClass('sideMenuCollapsed');
            gridster.resize_widget_dimensions({widget_base_dimensions: [$('.gridster').width()  * .5 - 10*2, 380]});
        }
    });*/


    /* 初始化portal */

    function getLeftWidget(w) {
        for (var i = 0; i < gridster.$widgets.length; i++) {
            if (parseInt($(gridster.$widgets[i]).attr("data-row")) == w.row && 1 == parseInt($(gridster.$widgets[i]).attr("data-col")))
                return gridster.$widgets[i];
        }
        return null
    }

    gridster.$el.off('click','>li .ctrl-expand').on("click", ">li .ctrl-expand", function(e){
        var _widget = $(this).parents(".widget-container > li");
        _widget.row = parseInt(_widget.attr("data-row"));
        _widget.col = parseInt(_widget.attr("data-col"));
        _widget.sizex = parseInt(_widget.attr("data-sizex"));
        _widget.sizey = parseInt(_widget.attr("data-sizey"));
        var chart =  $(this).parents("div").next(".widget-content-wrap").highcharts();
        var height = chart.renderTo.clientHeight; 
    	var width = chart.renderTo.clientWidth;
        if(1 == _widget.sizex) {
            if(2 == _widget.col) {
               var _leftWidget = getLeftWidget(_widget);
                _leftWidget && gridster.move_widget_down($(_leftWidget), 1),
                    gridster.move_widget_to(_widget, _widget.row, 1);
            }
            gridster.resize_widget(_widget, 2, 1);
            console.log(width);
            chart.setSize($('.gridster').width()- 10, height);
        } else {
            gridster.resize_widget(_widget, 1, 1);
            console.log(width);
            chart.setSize($('.gridster').width()  * .5 - 10, height);
        }
    });	

    $(window).resize(function(e) {
        gridster.resize_widget_dimensions({widget_base_dimensions: [$('.gridster').width() * .125 - 4, 95]});
    });

  
})
    /* 
    $.extend( $.fn.dataTable.defaults, {
        searching: false
    });

    var dtable =  $('#example').DataTable({
        "lengthChange": false,
        "columnDefs": [{
            "searchable": false,
            "orderable": false,
            "targets": 1
        },{
            "searchable": false,
            "orderable": false,
            "targets": 2
        }],
        "language": {
            "lengthMenu": "每页显示 _MENU_ 项探针",
            "zeroRecords": "没有找到探针",
            "info": "第 _START_ 到 _END_ 项探针 (共 _TOTAL_ 项探针)",
            "infoEmpty": "没有探针",
            "paginate": {
                "first":      "第一页",
                "last":       "最末页",
                "next":       "下一页",
                "previous":   "上一页"
            }
        }
//      ordering:  false
    });

    dtable.page.len(10).draw();


    //初始化echarts
    require.config({
        paths: {
            echarts: '../resources/js/echarts'
        }
    });

    require(
        [
            'echarts',
            'echarts/chart/radar',
            'echarts/chart/bar',
            'echarts/chart/pie'
        ],
        function (ec) {
            var radarChart = ec.init(document.getElementById('content_random1'));
            var roseChart = ec.init(document.getElementById('content_random3'));
            var ringChart = ec.init(document.getElementById('content_random4'));
            var barChart = ec.init(document.getElementById('content_random5'));
            var doubleringChart = ec.init(document.getElementById('content_random6'));

            var radarOption =  {
                title : {
                    text: ''
                },
                tooltip : {
                    show: true
                },
                toolbox: {
                    show : false
                },
                color: ['#0064CD'],
                polar : [
                    {
                        name: {
                            textStyle: {
                                color:'#666'
                            }
                        },
                        indicator : [
                            {text : '登录行为', max  : 100},
                            {text : '管理员行为', max  : 100},
                            {text : '安全', max  : 100},
                            {text : '工作饱和度', max  : 100},
                            {text : '操作行为', max  : 100},
                            {text : '认证', max  : 100}
                        ],
                        radius : 70
                    }
                ],
                series : [
                    {
                        name: '人物特点',
                        type: 'radar',
                        itemStyle: {
                            normal: {
                                areaStyle: {
                                    type: 'default'
                                }
                            }
                        },
                        data : [
                            {
                                value : [97, 42, 88, 94, 90, 86],
                                name : '安全'
                            }
                        ]
                    }
                ]
            }
            radarChart.setOption(radarOption);

            var roseOption = {
                title : {
                    text: ''
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                toolbox: {
                    show : false
                },
                color: ['#DF4A78','#BF3944','#DF423F','#FF9D22','#FFC500','#D4E14F','#5073BF','#5491F6'],
                series : [
                    {
                        name:'半径模式',
                        type:'pie',
                        radius : ['20%', '70%'],
                        roseType : 'radius',
                        width: '100%',
                        max: 40,
                        itemStyle : {
                            normal : {
                                label : {
                                    show : true
                                },
                                labelLine : {
                                    show : true
                                }
                            },
                            emphasis : {
                                label : {
                                    show : true
                                },
                                labelLine : {
                                    show : true
                                }
                            }
                        },
                        data:[
                            {value:10, name:'资源1'},
                            {value:5, name:'资源2'},
                            {value:15, name:'资源3'},
                            {value:25, name:'资源4'},
                            {value:20, name:'资源5'},
                            {value:35, name:'资源6'},
                            {value:30, name:'资源7'},
                            {value:40, name:'资源8'}
                        ]
                    }
                ]
            };
            roseChart.setOption(roseOption);

            var ringOption = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                toolbox: {
                    show : false
                },
                color: ['#DF4A78','#BF3944','#DF423F','#FF9D22','#FFC500','#D4E14F','#5073BF','#5491F6'],
                series : [
                    {
                        name:'业务系统',
                        type:'pie',
                        radius : ['50%', '70%'],
                        itemStyle : {
                            normal : {
                                label : {
                                    show : true
                                },
                                labelLine : {
                                    show : true
                                }
                            }
                        },
                        data:[
                            {value:335, name:'WAP'},
                            {value:310, name:'BOSS'},
                            {value:234, name:'CRM'},
                            {value:135, name:'等等'},
                            {value:1548, name:'等等等等'}
                        ]
                    }
                ]
            };
            ringChart.setOption(ringOption);

            var barOption =  {
                title : {
                    text: ''
                },
                tooltip : {
                    trigger: 'axis'
                },
                toolbox: {
                    show : false
                },
                grid: {
                    x: 30,
                    x2: 20,
                    y: 20,
                    y2: 30
                },
                color: ['#4DCD00'],
                xAxis : [
                    {
                        type : 'category',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#666'
                            }
                        },
                        axisTick: {
                            length: 3,
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        data : ['全部','近一年','近一月','近一周','当天']
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        splitLine: {
                            lineStyle: {
                                color: '#ccc'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#666'
                            }
                        },
                        axisLine: {
                            show: false
                        }
                    }
                ],
                series : [
                    {
                        name:'平均操作次数',
                        type:'bar',
                        data:[78, 98, 67, 34, 234]
                    }
                ]
            };
            barChart.setOption(barOption);

            var doubleringOption = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                color: ['#DF4A78','#BF3944','#DF423F','#FF9D22','#FFC500','#D4E14F','#5073BF','#5491F6'],
                series : [
                    {
                        name:'操作合规性',
                        type:'pie',
                        selectedMode: 'single',
                        radius : [0, '50%'],

                        itemStyle : {
                            normal : {
                                label : {
                                    position : 'inner'
                                },
                                labelLine : {
                                    show : false
                                }
                            }
                        },
                        data:[
                            {value:645, name:'高危操作'},
                            {value:1917, name:'合规操作'}
                        ]
                    },
                    {
                        name:'操作类型',
                        type:'pie',
                        radius : ['60%', '80%'],
                        data:[
                            {value:335, name:'操作1'},
                            {value:310, name:'操作2'},
                            {value:234, name:'操作3'},
                            {value:135, name:'操作4'},
                            {value:1048, name:'操作5'},
                            {value:251, name:'操作6'},
                            {value:147, name:'操作7'},
                            {value:102, name:'操作8'}
                        ]
                    }
                ]
            };
            doubleringChart.setOption(doubleringOption);

        }
    );

})
*/