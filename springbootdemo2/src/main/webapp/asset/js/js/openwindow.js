// 弹出窗口方法
function openWin(width,height,title,url,scrolling,funName){
	 $.fancybox.open({
	      href: url,
	      type: "iframe",
	      titleShow: 'true',
	      titlePosition: 'inside',
	      title: title,
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
	      scrolling:scrolling,
	      padding: 5,
	      width: width,
	      height:height,
	      beforeClose:function(){
	    	  if(funName){
       		      funName();
       	   	  }
	      }
	    });
}

function fancyboxClose(){
    $.fancybox.close();
  }