
//封装在jquery的解析函数
	$.fn.serializeObject = function()    
{    
   var o = {};    
   var a = this.serializeArray();    
   $.each(a, function() {    
       if (o.hasOwnProperty(this.name)) {    
           if (!o[this.name].push) {    
               o[this.name] = [o[this.name]];    
           }    
           o[this.name].push(this.value || '');    
       } else {    
           o[this.name] = this.value || '';    
       }    
   });    
   return o;    
};  

//清理String 
String.prototype.escapeSpecialChars = function() {
    return this.replace(/\\n/g, "\\n")
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
};


//替换 NaN or Finite

var FnReplaceNaN = function(arr){
    $.each(arr, function(key,value) { 
	 	if(isNaN(value) || (!isFinite(value))){
	 		arr[key] = 0.0;
	 	}
    });
}




//点击异步获取数据，并绘制饼状图   （添加一个参数做分支，此函数可以绘制多种图形，通过调用不同的绘制函数实现）  
//	 function onClick(fromid,url,container,name){  
//        var data = $("#"+fromid).serializeArray();  
//        var jsoninfo = $("#"+fromid).serializeObject();  
//        var dataJson = JSON.stringify(jsoninfo);
//        	$.ajax({
//        		type: "post",
//        		url: url,
//        		data:"jsonString=" + dataJson,
//        		success: function (data) {
//        			var json = eval("("+data+")");
//        			if(name=="pie"){
//        				chart.drawPie(container,json);
//        			}else if(name=="column"){
//        				chart.drawColumn(container,json);
//        			}else if(name=="line"){
//        				chart.drawLine(container,json);
//        			}
//        		}
//        	});
//        }
 

var chart = {};


chart.drawPercentCricle = function(div,json){
	 var dataCircle = {
		        chart: {
		            renderTo: null,    //图表容器-String: 'userSec_lit'
		            plotBackgroundColor: false,
		            plotBorderWidth: 0,
		            plotShadow: false,
		            backgroundColor: 'transparent',
		            height: 200,
		            width: 200,
		            margin: [0,0,0,0]
		        },
		        title:{
		            text: null, //分值-String: '80'
		                style: {
		                color: '#FFFFFF',
		                fontSize:'25px',
		                fontWeight: 'bold'
		            },
		            align: 'center',
		            verticalAlign: 'middle',
		            y: 7
		        },
		        subtitle: {
		            text: '',
		            style: {
		                color: '#333333',
		                fontSize: '25px',
		                fontWeight: 'bold'
		            },
		            align: 'center',
		            verticalAlign: 'middle',
		            y: -10
		        },
		        tooltip: {
		            enabled: false
		        },
		        exporting: {
		            enabled: false
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: false,
		                animation: false,
		                enableMouseTracking: false,
		                dataLabels: {
		                    enabled: false,
		                    distance: -50
		                },
		                borderWidth: 0,
		                startAngle: 0,
		                endAngle: 360,
		                center: ['50%', '50%']
		            }
		        },
		        series: [{
		            type: 'pie',
		            innerSize: '0%',
		            data: null  //环形(分值部分+置灰部分=100)-对象数据: [{name:'', color:'#0088cc', y:80}, {name:'', color:'#dddddd', y:20}]
		        }],
		        credits: {
		            enabled: false
		        }
		      
		    };
	 var dataObj = [{name:'', color:'#6495ED', y:100}, {name:'', color:'#F0F8FF', y:0}];
	 if(isNaN(json.data)){
		 dataCircle.title.text = "无数据";
	 }else{
		 dataCircle.title.text = json.data.toFixed(2) + "%";
		 dataObj[0].y = json.data;
		 dataObj[1].y = 100 - json.data;
	 }
	 dataCircle.series[0].data = dataObj;
	 div.highcharts(dataCircle);
}

chart.drawMix = function(div,json,QueryObj,statType){
	dataMixType = json.flag;
	var divHeight = div.height();
	var data = {
			legend: {
	                    align: 'center', //水平方向位置
	                    verticalAlign: 'bottom', //垂直方向位置
				itemMarginTop: 0 //距离x轴的距离
	            },
	        chart: {
	            height: divHeight,
	    		marginLeft: 45,
	    		marginRight:45
	        },
	        title: {
	        },
	        yAxis: {
	            min: 0,
	            title: {
	            }
	        },
	        credits: {
	            enabled: false
	        },
	        tooltip: {
	    	    pointFormat: '<b>{point.y:.1f} 个事件</b>'
	        },
	        exporting: {
	            buttons: {
	                contextButton: {
	                    menuItems: [{
	                        text: '保存',
	                        onclick: function () {
	                           	//saveView('','',QueryObj,statType,'');
	                           	saveQueryEventCount();
	                        }
	                    }]
	                }
	            }
	        },
	        plotOptions: {
	        	 series: {
	                 events: {
	                 }
	             }
	        },
	        xAxis: {  
	            labels: {
	           	 formatter: function() {
	           	 var str = this.value;	
	           	 if(str.indexOf("到") == -1){
	           		 return this.value;
	           	 }
	           	 if(parseInt(dataMixType) == 1){
	           		var str1 = str.substr(0, str.indexOf("到"));
	           		return str1.substr(0, 7);
	           	 }else if(parseInt(dataMixType) > 1 && parseInt(dataMixType) <= 4 ){
	           		 var str1 = str.substr(0, str.indexOf("到"));
	            		return str1.substr(0, str1.indexOf(" "));
	           	 }else if(parseInt(dataMixType) == 5 || parseInt(dataMixType) == 6 ){
	           		 var str1 = str.substr(0, str.indexOf("到"));
	             		return str1.substr(0, str1.indexOf(":"));
	            	 }else if(parseInt(dataMixType) == 7 || parseInt(dataMixType) == 8 ){
	           		 var str1 = str.substr(0, str.indexOf("到"));
	              		return str1.substr(0, str1.lastIndexOf(":"));
	             	 }else{
	             		 return str.substr(0, str.indexOf("到"));
	             	 }
	           	 }
	           	 }
	       }
	    }
	if(QueryObj){
	   data.legend.labelFormatter = function() {
         var e = this.name;
         return e += ' <span style="color:#aaa;font-size:14px;">×</span>'
	   }
	   data.plotOptions.series.events.legendItemClick = function(event) {
               var name = this.name;
               var chart = div.highcharts();
               $.each(chart.series, function(key,value) {    
              	 	if(value.name == name){
              	 		chart.series[key].remove();
              	 		$.each(eventCounterArr, function(key,value) {
              	 			if(value.fieldMapping == name){
              	 				eventCounterArr.splice(key,1)
              	 				return false;
              	 			}
              	 		});
              	 		return false;
              	 	}
               });
           }
		   
	   }
	data.xAxis.labels.step =  Math.floor(json.categories.length / 5)+1;
	data.xAxis.categories = json.categories;
	data.series = json.series;
	data.title.text = json.title || '';
	data.yAxis.title.text = json.ytext || '';
	if(typeof(statType) == "undefined"){
		 data.exporting = {
		            enabled: false
		 	};
	}
	div.highcharts(data);
}

chart.drawMixFieldCount = function(div,json,QueryObj,statType){
	var divHeight = div.attr("height");
	dataMixType = json.flag;
	var data = {
			legend: {
			        enabled: true
			    },
	        chart: {
	            height: divHeight,
	    		marginLeft: 45,
	    		marginRight:45
	        },
	        title: {
	        },
	        exporting: {
		        buttons: {
		            contextButton: {
		                menuItems: [{
		                    text: '保存',
		                    onclick: function () {
		                       	saveView('','',QueryObj,statType,'');
		                    }
		                }]
		            }
		        }
		    },
	        yAxis: {
	            min: 0,
	            title: {
	            }
	        },
	        credits: {
	            enabled: false
	        },
	        tooltip: {
	   // 	    pointFormat: '<b>{point.y:.1f} 个事件</b>'
	        },
	        plotOptions: {
	        },
	        xAxis: {  
	        	title: {
	            },
	            labels: {
		           	 formatter: function() {
		           	 var str = this.value;	
		           	 if(str.indexOf("到") == -1){
		           		 return this.value;
		           	 }
		           	 if(parseInt(dataMixType) == 1){
		           		var str1 = str.substr(0, str.indexOf("到"));
		           		return str1.substr(0, 7);
		           	 }else if(parseInt(dataMixType) > 1 && parseInt(dataMixType) <= 4 ){
		           		 var str1 = str.substr(0, str.indexOf("到"));
		            		return str1.substr(0, str1.indexOf(" "));
		           	 }else if(parseInt(dataMixType) == 5 || parseInt(dataMixType) == 6 ){
		           		 var str1 = str.substr(0, str.indexOf("到"));
		             		return str1.substr(0, str1.indexOf(":"));
		            	 }else if(parseInt(dataMixType) == 7 || parseInt(dataMixType) == 8 ){
		           		 var str1 = str.substr(0, str.indexOf("到"));
		              		return str1.substr(0, str1.lastIndexOf(":"));
		             	 }else{
		             		 return str.substr(0, str.indexOf("到"));
		             	 }
		           	 }
		           	 }
	       }
	    }
	data.xAxis.labels.step =  Math.floor(json.categories.length / 10)+1;
	data.xAxis.categories = json.categories;
	data.series = json.series;
	data.xAxis.title.text = json.xtext || '';
	data.title.text = json.title || '';
	data.yAxis.title.text = json.ytext || '';
	if(typeof(statType) == "undefined"){
		 data.exporting = {
		            enabled: false
		 	};
	}
	console.log(JSON.stringify(data));
	div.highcharts(data);
}

chart.drawPie = function(div,json,QueryObj,statType){
	var divHeight = div.attr("height");
	var data = {
        chart: {
        	height: divHeight,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        credits: {
            enabled: false
        },
        tooltip: {
    	    pointFormat: '<b>{point.percentage:.1f}%  数量:{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        }
    }
	//alert(json.series[0].data.length);
	if(json.series[0].data.length == 0){
		json.title.text = '无匹配条件数据'
	}
	data.title = json.title;
	data.series = json.series;
	if(typeof(statType) == "undefined"){
		 data.exporting = {
		            enabled: false
		 	};
	}
	div.highcharts(data);
}

var dataColType = "";//全局


//column
chart.drawColumn = function(div,json,fun,QueryObj,statType){
	var saveBtnMark=true;
	var divHeight = div.height();
	if(JSON.stringify(div).indexOf('event_log_trend')>0){
		saveBtnMark=false;
	}
	var angle=0;
	if(fun=='empty'){
		angle=90;
		dataColType=json.flag;
	}
	var dataColumn = {
	chart: {
		type: 'column',
		backgroundColor: 'transparent',
		height: divHeight,
		marginLeft: 55,
		marginRight:45
		},
	colors: ['#52C278'],
	plotOptions: {  
		series: {  
			 cursor: 'pointer',  
			 events: {  
			            }
			        }  
			    },  		
    title: {
    },
	credits: {
        enabled: false
    },
    exporting: {
    	enabled: saveBtnMark,
        buttons: {
            contextButton: {
                menuItems: [{
                    text: '保存',
                    onclick: function () {
                       saveView('','',QueryObj,statType,'');
                    }
                }]
            }
        }
    },
    xAxis: {  
    	 title: {
         },
         labels: {
         	 rotation:angle,         
        	 formatter: function() {
        	 var str = this.value;	
        	 if(str.indexOf("到") == -1){
        		 return this.value;
        	 }
        	 if(parseInt(dataColType) == 1){
        		var str1 = str.substr(0, str.indexOf("到"));
        		return str1.substr(0, 7);
        	 }else if(parseInt(dataColType) > 1 && parseInt(dataColType) <= 4 ){
        		 var str1 = str.substr(0, str.indexOf("到"));
         		return str1.substr(0, str1.indexOf(" "));
        	 }else if(parseInt(dataColType) == 5 || parseInt(dataColType) == 6 ){
        		 var str1 = str.substr(0, str.indexOf("到"));
          		return str1.substr(0, str1.indexOf(":"));
         	 }else if(parseInt(dataColType) == 7 || parseInt(dataColType) == 8 ){
        		 var str1 = str.substr(0, str.indexOf("到"));
           		return str1.substr(0, str1.lastIndexOf(":"));
          	 }else{
          		 return str.substr(0, str.indexOf("到"));
          	 }
        	 }
        	 }
    },
    yAxis: {
        min: 0,
        title: {
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: '<b>{point.y:,.0f}条</b>'
    }
}
	//&&typeof(dtable) == "undefined"
	if(fun!=null){
		dataColumn.plotOptions.series.events.click=fun;
		dataColType = json.flag;
	}
	//alert(Math.floor(json.categories.length / 10));

dataColumn.xAxis.labels.step =  Math.floor(json.categories.length / 10)+1;
//var ss = Math.floor(json.categories.length / 10)+1
//alert("step" + ss);
dataColumn.xAxis.title.text = json.xtext;
dataColumn.xAxis.categories = json.categories;
dataColumn.title.text = json.title;
dataColumn.yAxis.title.text = json.ytext;
dataColumn.series = json.series;
//alert(JSON.stringify(dataColumn));
div.highcharts(dataColumn);
}

//column
chart.drawColumnCount = function(div,json,chartOb){
	debugger;
	var divHeight = div.attr("height");
	var dataColumnCount = {
	chart: {
		type: 'column',
		backgroundColor: chartOb.chartsColor,
		height: divHeight,
		marginLeft: 45,
		marginRight:45
		},
	colors: ['#52C278'],
	plotOptions: {  
		series: {  
			 cursor: 'pointer',  
			 events: {  
			            }  
			        }  
			    },  		
    title: {
    	text: chartOb.title
    },
	credits: {
        enabled: false
    },
     /*exporting: {
        buttons: {
            contextButton: {
                menuItems: [{
                    text: '保存',
                    onclick: function () {
                       	saveView('','',QueryObj,statType,'');
                    }
                }]
            }
        }
    },*/
    xAxis: {  
    	 title: {
         },
         labels: {
        	 }
    },
    yAxis: {
        min: 0,
        title: {
        }
    },
    legend: {
        enabled: chartOb.legend
    },
    tooltip: {
        pointFormat: '<b>{point.y:.1f} </b>'
    }
}

dataColumnCount.xAxis.labels.step =  Math.floor(json.categories.length / 10)+1;
dataColumnCount.xAxis.categories = json.categories;
dataColumnCount.series = json.series;
console.log(JSON.stringify(dataColumnCount));
div.highcharts(dataColumnCount);
}




//Line
chart.drawLine = function(div,json,mark,QueryObj,statType){
	dataMixType = json.flag;
	var divHeight = div.attr("height");
	var angle=0;
	if(mark=='empty'){
		angle=90;
	}
	var dataLine = {
			chart: {
				height: divHeight,
				marginLeft: 45,
				marginRight:45
				},
		    title: {
		        x: -20 //center
		    },
		    credits: {                                                         
            enabled: false                                                 
        	},
		    subtitle: {
		        x: -20
		    },
		    exporting: {
		        buttons: {
		            contextButton: {
		                menuItems: [{
		                    text: '保存',
		                    onclick: function () {
		                       	saveView('','',QueryObj,statType,'');
		                    }
		                }]
		            }
		        }
		    },
		    xAxis: {
		    	 title: {
		         },
		         labels: {
         	 		rotation:angle,
		           	 formatter: function() {
		           	 var str = this.value;	
		           	 if(str.indexOf("到") == -1){
		           		 return this.value;
		           	 }
		           	 if(parseInt(dataMixType) == 1){
		           		var str1 = str.substr(0, str.indexOf("到"));
		           		return str1.substr(0, 7);
		           	 }else if(parseInt(dataMixType) > 1 && parseInt(dataMixType) <= 4 ){
		           		 var str1 = str.substr(0, str.indexOf("到"));
		            		return str1.substr(0, str1.indexOf(" "));
		           	 }else if(parseInt(dataMixType) == 5 || parseInt(dataMixType) == 6 ){
	           		 var str1 = str.substr(0, str.indexOf("到"));
	             		return str1.substr(0, str1.indexOf(":"));
	            	 }else if(parseInt(dataMixType) == 7 || parseInt(dataMixType) == 8 ){
	           		 var str1 = str.substr(0, str.indexOf("到"));
	              		return str1.substr(0, str1.lastIndexOf(":"));
	             	 }else{
	             		 return str.substr(0, str.indexOf("到"));
	             	 }
         	 	 }
         	 	 }
		    },
		    yAxis: {
		        title: {
		        },
		        plotLines: [{
		            value: 0,
		            width: 1,
		            color: '#808080'
		        }]
		    }
		//    tooltip: {
		//        valueSuffix: '°C'
		//    }
//		    legend: {
//		        layout: 'vertical',
//		        align: 'right',
//		        verticalAlign: 'middle',
//		        borderWidth: 0
//		    },
		   
		}
dataLine.xAxis.title.text = json.xtext;
dataLine.xAxis.categories = json.categories;
dataLine.title.text = json.title;
dataLine.yAxis.title.text = json.ytext;
dataLine.series = json.series;
if(typeof(statType) == "undefined"){
	dataLine.exporting =  {
            enabled: false
 	};
}
div.highcharts(dataLine);
}

chart.drawBar = function(div,json,chartOb){
	debugger;
	var divHeight = div.attr("height");
	var dataBar = {
		chart: {                                                           
            type: 'bar',
			backgroundColor: chartOb.chartsColor,
            height: divHeight,
			marginLeft: 45,
			marginRight: 45
        },
        title: {
			text: chartOb.title
        },                                                                                                                                  
        xAxis: {                                                           
            title: {                                                       
                text: null                                                 
            },
			labels: {}
        },
        /*exporting: {
	        buttons: {
	            contextButton: {
	                menuItems: [{
	                    text: '保存',
	                    onclick: function () {
	                       	saveView('','',QueryObj,statType,'');
	                    }
	                }]
	            }
	        }
	    },*/
        yAxis: {                                                           
            min: 0,                                                        
            title: {                                                       
                text: 'Population (millions)',                        
                align: 'high'                                              
            },                                                             
            labels: {                                                      
                overflow: 'justify',
				labels: {
					formatter: function() {
						if (this.value > 10000) {
							return this.value / 10000 + '万';
						}
						else {
							return this.value;
						}
					}
				}
            }                                                              
        },                                                                                                                                
        plotOptions: {                                                     
            bar: {                                                         
                dataLabels: {                                              
                    enabled: true                                          
                }                                                          
            }                                                              
        },                                                                 
        legend: {
			enabled:chartOb.legend
            //layout: 'vertical',
            //align: 'right',
            ////verticalAlign: 'top',
            //x: -40,
            //y: 100,
            //floating: true,
            //borderWidth: 1,
            //backgroundColor: '#FFFFFF',
            //shadow: true
        },                                                                 
        credits: {                                                         
            enabled: false
		}
	}
dataBar.xAxis.labels.step =  Math.floor(json.categories.length/10)+1;
dataBar.xAxis.title.text = json.xtext;
dataBar.xAxis.categories = json.categories;
dataBar.title.text = json.title;
dataBar.yAxis.title.text = json.ytext;
dataBar.series = json.series;
div.highcharts(dataBar);
}

chart.percentPie = function(div,json,chartOb){
	var browsers = [];
	//alert(json.series[0].data.length);
	if(json.series.length == 0){
		json.title.text = '无匹配条件数据'
	}
	for(var i=0;i<json.categories.length;i++){
		for(var j=0;j<json.series.length;j++){
			browsers.push([json.categories[i]+":"+json.series[j].name,json.series[j].data[i]]);
		}
	}
	var divHeight = div.attr("height");
	div.highcharts({
        chart: {
        	height: divHeight,
			backgroundColor: chartOb.chartsColor,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
			marginLeft: 45,
			marginRight: 45
        },
		title: {
			text: chartOb.title
		},
		credits: {
            enabled: false
        },
        /*exporting: {
	        buttons: {
	            contextButton: {
	                menuItems: [{
	                    text: '保存',
	                    onclick: function () {
	                       	saveView('','',QueryObj,statType,'');
	                    }
	                }]
	            }
	        }
	    },*/
        tooltip: {
    	    pointFormat: '<b>数量:{point.y}</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    color: '#000000',
                    connectorColor: '#000000',
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
				showInLegend: chartOb.legend
            }
        },
		legend: {//控制图例显示位置
			layout: 'vertical',
			align: 'left',
			verticalAlign: 'top',
			borderWidth: 0
		},
        series: [{
            type: 'pie',
            data: browsers
        }]
    });
   
}

chart.percentLine = function(div,json,chartOb){
	var divHeight = div.attr("height");
	var percentLine = {
			chart: {
				backgroundColor : chartOb.chartsColor,
				height: divHeight,
				marginLeft: 45,
				marginRight:45
			},
		    title: {
		        x: -20, //center
				text: chartOb.title
		    },
		    credits: {                                                         
		    	enabled: false                                                 
        	},
		    subtitle: {
		        x: -20
		    },
		    xAxis: {
		    	 title: {
		         },
				 labels: {}
		    },
		    /*exporting: {
		        buttons: {
		            contextButton: {
		                menuItems: [{
		                    text: '保存',
		                    onclick: function () {
		                       	saveView('','',QueryObj,statType,'');
		                    }
		                }]
		            }
		        }
		    },*/
		    yAxis: {
		        title: {
		        },
		        plotLines: [{
		            value: 0,
		            width: 1,
		            color: '#808080'
		        }],
		        labels: {
		           	 formatter: function() {
						 if (this.value > 10000) {
							 return this.value / 10000 + '万';
						 }
						 else {
							 return this.value;
						 }
		           	 }
         	 	 }
		    },
		tooltip: {
		    	headerFormat: '<b>{series.name}:{point.y}</b>',
		    	pointFormat:''
	    },
	    legend: {                                                          
           enabled:chartOb.legend
        }            
	}
	percentLine.xAxis.labels.step =  Math.floor(json.categories.length/10)+1;
	percentLine.xAxis.title.text = json.xtext;
	percentLine.xAxis.categories = json.categories;
	percentLine.title.text = json.title;
	percentLine.yAxis.title.text = json.ytext;
	percentLine.series = json.series;
	div.highcharts(percentLine);
}


chart.percentArea = function(div,json,chartOb){
	var divHeight = div.attr("height");
	var percentArea = {
			chart: {
				type: 'area',
				backgroundColor: chartOb.chartsColor,
				height: divHeight,
				marginLeft: 45,
				marginRight:45
				},
		    title: {
		        x: -20,//center
				text: chartOb.title
		    },
		    credits: {                                                         
		    	enabled: false                                                 
        	},
		    subtitle: {
		        x: -20
		    },
		    xAxis: {
		    	allowDecimals: false,
	            labels: {
	                formatter: function () {
	                    return this.value; // clean, unformatted number for year
	                }
	            }
		    },
		    /*exporting: {
		        buttons: {
		            contextButton: {
		                menuItems: [{
		                    text: '保存',
		                    onclick: function () {
		                       	saveView('','',QueryObj,statType,'');
		                    }
		                }]
		            }
		        }
		    },*/
		    yAxis: {
		    	title: {
		        },
		        labels: {
		           	 formatter: function() {
						 if (this.value > 10000) {
							 return this.value / 10000 + '万';
						 }
						 else {
						 	 return this.value;
					 	}
		           	 }
        	 	 }
	        },
			tooltip: {
				headerFormat: '{series.name}:<b>{point.y:,.0f}</b>',
		    	pointFormat:''
		    },
		    legend: {
				enabled:chartOb.legend
	        }
		}
	percentArea.xAxis.labels.step =  Math.floor(json.categories.length/10)+1;
	percentArea.xAxis.categories = json.categories;
	percentArea.title.text = json.title;
	percentArea.yAxis.title.text = json.ytext;
	percentArea.series = json.series;
	div.highcharts(percentArea);
}

function saveView(viewName,viewId,content,viewtype,timeRange){
	fancyboxCreateProxy({
		url: "/esearch/analysis/goViewNamePage.action?viewType=" + viewtype + "&viewContent=" + content + "&viewId=" + viewId + "&viewName=" + viewName + "&timeRange=" + timeRange,
		title: "添加趋势图",
		width: '40%',
		height: '30%'
	});
}

function savePage(viewName,viewId,content,viewtype,timeRange){
	fancyboxCreateProxy({
		url: "/esearch/analysis/savePageView.action?viewType=" + viewtype + "&viewContent=" + content + "&viewId=" + viewId + "&viewName=" + viewName + "&timeRange=" + timeRange,
		title: "搜索保存",
		width: '40%',
		height: '30%'
	});
}

function saveFieldPage(viewName,viewId,content){
	fancyboxCreateProxy({
		url: "/esearch/analysis/saveFieldPage.action?viewContent=" + content + "&viewId=" + viewId + "&viewName=" + viewName ,
		title: "搜索字段保存",
		width: '40%',
		height: '30%'
	});
}

function saveBoard(viewName,viewId,serialize,background){
	// var url = "/esearch/analysis/saveDashBoardPage.action?viewContent="+content+"&viewId="+viewId+"&viewName="+viewName;
	// if(null!=background && background !=''){
	// 	url=url+"&background="+background;
	// }
    $.ajax({
        type: "post",
        url: "../dashboard/addDashboard",
        data : {
            id : viewId,
            name : viewName,
            serialize : serialize
            // dashboardChartRelationList:[{chartId:""},{},{}],
            // dashboardChartRelationList:relList
        },
        success: function (data) {
            console.log(data);
            if (data == "1"){
                layer.msg('保存成功', {time: 1000,icon: 1});
                loadDiv('pageRedirect?path=dashboard/boardList',this);// 跳转列表页面
            } else {
                layer.msg('保存失败', {time: 1000,icon: 2});
            }
        }
    });
    // fancyboxCreateProxy({
		// url: url,
		// title: "保存仪表盘",
		// width: '40%',
		// height: '30%'
    // });
}



function fancyboxCreateProxy(params){
	//展开弹窗前，先确认登录是否超时。响应时间4ms左右。
	// $.ajax({
	// 	url: "/esearch/checkSessionTimeOut.action"
	// });
	$.fancybox.open({
      href: params.url,
      type: "iframe",
      titleShow: 'true',
      titlePosition: 'inside',
      title: params.title,
      helpers:  {
        title : {
          type : 'over'
        }
      },
      closebtn:false,
      autoScale:false,
      autoHeight:false,
      autoSize:false,
      fitToView:true,
      scrolling:'no',
      padding: 5,
      width: params.width,
      height: params.height
    });

  }
function fancyboxCloseProxy(){
    $.fancybox.close();
  }

//比较数组是否相同
function compArray(array1,array2)
  {
   if((array1&&typeof array1 ==="object"&&array1.constructor===Array)&&(array2&&typeof array2 ==="object"&&array2.constructor===Array))
   {
      if(array1.length==array2.length)
      {
       for(var i=0;i<array1.length;i++)
       {
        var ggg=compObj(array1[i],array2[i]);
        if(!ggg)
        {
         return false;
        }
       
       }
      
      }
      else
      {
       return false;
      }
   }
   else
   {
    throw new Error("argunment is  error ;");
   }
    return true;
  };
  
function propertyLength(obj)//获得对象上的属性个数，不包含对象原形上的属性
   {  
    var count=0;
    if(obj&&typeof obj==="object") {
     for(var ooo in obj) {
       if(obj.hasOwnProperty(ooo)) {
         count++;
       }
     }
     return count;
    }else {
     throw new Error("argunment can not be null;");
    }
   };
   
 function compObj(obj1,obj2)//比较两个对象是否相等，不包含原形上的属性计较
   {
    if((obj1&&typeof obj1==="object")&&((obj2&&typeof obj2==="object")))
    {   
      var count1=propertyLength(obj1);
      var count2=propertyLength(obj2);
      if(count1==count2)
      { 
       for(var ob in obj1)
       {
        if(obj1.hasOwnProperty(ob)&&obj2.hasOwnProperty(ob))
        {     
        
         if(obj1[ob].constructor==Array&&obj2[ob].constructor==Array)//如果属性是数组
         { 
          if(!compArray(obj1[ob],obj2[ob]))
          {
           return false;
          };
         }                  
         else if(typeof obj1[ob]==="string"&&typeof obj2[ob]==="string")//纯属性
         {  
         if(obj1[ob]!==obj2[ob])
        {
           return false;
        }
         }
         else if(typeof obj1[ob]==="object"&&typeof obj2[ob]==="object")//属性是对象
         {  
          if(!compObj(obj1[ob],obj2[ob]))
        {  
         return false;
        };
         }
         else
         {
        return false;
         }
        } 
        else
        {
         return false;
        }
       }
      }
      else
      {
       return false;
      } 
    }
    return true;
   };




$(document).ready(function (){

    //点击左侧菜单栏设置cookie
	$("#div_up_side_id").click(function(){
		var menuStatus=$('#div_up_side_id_div').attr('class');
		//获取当前时间
		var date=new Date();
		var expiresDays=1;
		//将date设置为1天以后的时间
		date.setTime(date.getTime()+expiresDays*24*3600*1000);
		//将menuStatus的cookie设置为1天后过期
		document.cookie="menuStatus="+menuStatus+"; path=/; expires="+date.toGMTString();
	});
//	
//	var strCookie=document.cookie;
//	var arrCookie=$.trim(strCookie).split(";");
//	for(var i=0;i<arrCookie.length;i++){
//	var arr=arrCookie[i].split("=");
//	if($.trim(arr[0])=='menuStatus' && $.trim(arr[1])=='main_side fixed up_side_nav_collapse'){	//获取名称为menuStatus的cookie;
//			accordionMenuObj.sideToggle();
//		}
//	}
});












