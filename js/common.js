$(function (){
	// 首页
	var h=$(window).height();
	var w=$(window).width();
	$('.searchpop,.searchbox,.confirm,.main,.personalpop').css({'height':h+'px'});
	var pagemove = true; 
	var now=0;
	var aTabLi=$('.banner ul li');
	aTabLi.width(w);
	$('.banner ul').width(w*aTabLi.length);
   	aTabLi.css('left',w);
	aTabLi.eq(0).css('left','0px');
	aTabLi.eq(0).css('display','block');
	//轮播图自动播放
	clearInterval(timer);
	var timer=setInterval(function (){
		if(pagemove == true){
			now++;
			pagemove = false;
			fnPrev(now);
		};
	},2000);
	aTabLi.on('touchstart',function (){
		clearInterval(timer);
	})
	aTabLi.on('touchend',function (){
		clearInterval(timer);
		timer=setInterval(function (){
			if(pagemove == true){
				now++;
				pagemove = false;
				fnPrev(now);
			};
		},2000);
	})
	/*向左滑动*/
	aTabLi.on('swipeleft', function(){	
		if(pagemove == true){
			now++;
			pagemove = false;
			fnPrev(now);
			
		};
	});
	/*向右滑动*/
	aTabLi.on('swiperight', function(){
		if(pagemove == true){
			now--;
			pagemove = false;
			fnNext(now);
		};
	});
	function fnPrev(now){
		if($('.banner').length>0){
			$('.banner ol li').removeClass('active');
			aTabLi.eq(now%aTabLi.length).css('left',w+'px');
			aTabLi.eq(now%aTabLi.length).show();
			aTabLi.eq(now%aTabLi.length).stop().transition({left:"0%"},300,'ease-out',function(){});
			$('.banner ol li').eq(now%aTabLi.length).addClass('active');
			if(now%aTabLi.length==0){
				aTabLi.eq(aTabLi.length - 1).stop().transition({left:-w+'px'},300,'ease-out',function(){
					aTabLi.eq(aTabLi.length - 1).hide();
					pagemove = true;
				});	
			}else{
				aTabLi.eq(now%aTabLi.length - 1).stop().transition({left:-w+'px'},300,'ease-out',function(){
					aTabLi.eq(now - 1).hide();
					pagemove = true;
				});	
			}
		}
	}
	function  fnNext(now){
		if($('.banner').length>0){
			$('.banner ol li').removeClass('active');
			aTabLi.eq(now%aTabLi.length).css('left',-w+'px');
			aTabLi.eq(now%aTabLi.length).show();
			aTabLi.eq(now%aTabLi.length).stop().transition({left:"0%"},300,'ease-out',function(){});
			$('.banner ol li').eq(now%aTabLi.length).addClass('active');
			if(now%aTabLi.length==aTabLi.length-1){
				aTabLi.eq(0).stop().transition({left:w+'px'},300,'ease-out',function(){
					aTabLi.eq(0).hide();
					pagemove = true;
				});
			}else{
				aTabLi.eq(now%aTabLi.length+1).stop().transition({left:w+'px'},300,'ease-out',function(){
					aTabLi.eq(now%aTabLi.length+1).hide();
					pagemove = true;
				});
			}
		}
	}

	// 测试
	var data=[{url:'javascript:;',bigImgSrc:'images/i_pic1.jpg',smallImgSrc:'images/i_bg1.jpg','title':'七零五零七零五零','nickname':'柒零五零原创手工工作室'},{url:'javascript:;',bigImgSrc:'images/i_pic2.jpg',smallImgSrc:'images/i_bg2.jpg','title':'我爱摄影我爱摄影我爱摄影我爱摄我爱摄影我爱摄我爱摄影我爱摄',nickname:'自然摄影工作室'},{url:'javascript:;',bigImgSrc:'images/i_pic3.jpg',smallImgSrc:'images/i_bg3.jpg','title':'七零五零七零五零','nickname':'柒零五零原创手工工作室'},{url:'javascript:;',bigImgSrc:'images/i_pic4.jpg',smallImgSrc:'images/i_bg4.jpg','title':'我爱摄影',nickname:'自然摄影工作室'}];
	for(var i=0;i<data.length;i++){
		var oLi=document.createElement('li');
		oLi.innerHTML='<a class="site_item" href="'+data[i].url+'">\
							<img src="'+data[i].bigImgSrc+'" class="bg_logo">\
							<div class="sitename">\
								<h3>'+data[i].title+'</h3>\
								<div class="nickname">\
									<p>'+data[i].nickname+'</p>\
									<span><img src="'+data[i].smallImgSrc+'"></span>\
								</div>\
							</div>\
						</a>';
		var arr=[];
		var oBox=document.getElementById('perfectSite');
		// if(oBox){
			var aUl=oBox.getElementsByTagName('ul');
			for(var j=0;j<aUl.length;j++){
				arr[j]=aUl[j];
			}
			arr.sort(function (oUl1,oUl2){
				return oUl1.offsetHeight-oUl2.offsetHeight;
			});
			arr[0].appendChild(oLi);
		// }
	}
	// 滚动页面加载小站
	var scrollBox=document.querySelector('.main');
	scrollBox.onscroll=window.onresize=function (){
		var scrollTop=scrollBox.scrollTop;
		if($('.banner').length>0){
			var headerH=$('.header').outerHeight();
			var bannerH=$('.banner').height();
			if(scrollTop>headerH+bannerH){
				clearInterval(timer);
			}else{
				clearInterval(timer);
				timer=setInterval(function (){
					if(pagemove == true){
						now++;
						pagemove = false;
						fnPrev(now);
					};
				},2000);
			}
		}
		var clientHeight=document.documentElement.clientHeight;
		var scrollHeight=scrollBox.scrollHeight;
		if(scrollHeight<scrollTop+clientHeight+100){
			for(var i=0;i<data.length;i++){
				var oLi=document.createElement('li');
				oLi.innerHTML='<a class="site_item" href="'+data[i].url+'">\
									<img src="'+data[i].bigImgSrc+'" class="bg_logo">\
									<div class="sitename">\
										<h3>'+data[i].title+'</h3>\
										<div class="nickname">\
											<p>'+data[i].nickname+'</p>\
											<span><img src="'+data[i].smallImgSrc+'"></span>\
										</div>\
									</div>\
								</a>';
				var arr=[];
				var oBox=document.getElementById('perfectSite');
				var aUl=oBox.getElementsByTagName('ul');
				for(var j=0;j<aUl.length;j++){
					arr[j]=aUl[j];
				}
				arr.sort(function (oUl1,oUl2){
					return oUl1.offsetHeight-oUl2.offsetHeight;
				});
				arr[0].appendChild(oLi);
			}
		}
	};

	// 正常做法
	// var nowPage=1;
	// function getData(url){
	// 	$.ajax({
	// 		url:'',
	// 		type:'post',
	// 		data:nowPage,
	// 		dataType:'json',
	// 		success:function(data){
	// 			//data=[{url:"javascript:;",bigImgSrc:'1.jpg',smallImgSrc:'s_1.jpg','title':'sfsdf',description:'sdfsdfsdjfsdfsdfsdfsdf'},{url:"javascript:;",bigImgSrc:'1.jpg',smallImgSrc:'s_1.jpg','title':'sfsdf',description:'sdfsdfsdjfsdfsdfsdfsdf'},{url:"javascript:;",bigImgSrc:'1.jpg',smallImgSrc:'s_1.jpg','title':'sfsdf',description:'sdfsdfsdjfsdfsdfsdfsdf'}]
	// 			for(var i=0;i<data.length;i++){
	// 				var oLi=document.createElement('li');
	// 				oLi.innerHTML='<a class="site_item" href="'+data[i].url+'">\
	// 					<img src="'+data[i].bigImgSrc+'" class="bg_logo">\
	// 					<div class="sitename">\
	// 						<h3>'+data[i].title+'</h3>\
	// 						<p>'+data[i].description+'</p>\
	// 						<span><img src="'+data[i].smallImgSrc+'"></span>\
	// 					</div>\
	// 				</a>';
	// 				var arr=[];
	// 				var oBox=document.getElementById('perfectSite');
	//				var aUl=oBox.getElementsByTagName('ul');
	// 				for(var j=0;j<aUl.length;j++){
	// 					arr[j]=aUl[j];
	// 				}
	// 				arr.sort(function (oUl1,oUl2){
	// 					return oUl1.offsetHeight-oUl2.offsetHeight;
	// 				});
	// 				arr[0].appendChild(oLi);
	// 			}
	// 		}
	// 	});
	// }
	// getData();
	// var scrollBox=document.querySelector('.main');
	// scrollBox.onscroll=window.onresize=function (){
		// var scrollTop=scrollBox.scrollTop;
		// if($('.banner').length>0){
		// 	var headerH=$('.header').outerHeight();
		// 	var bannerH=$('.banner').height();
		// 	if(scrollTop>headerH+bannerH){
		// 		clearInterval(timer);
		// 	}else{
		// 		clearInterval(timer);
		// 		timer=setInterval(function (){
		// 			if(pagemove == true){
		// 				now++;
		// 				pagemove = false;
		// 				fnPrev(now);
		// 			};
		// 		},2000);
		// 	}
		// }
	// 	var clientHeight=document.documentElement.clientHeight;
	// 	var scrollHeight=this.scrollHeight;
	// 	if(scrollHeight<scrollTop+clientHeight+100){
	// 		nowPage++;
	// 		getData(url);
	// 	}
	// };
	// 点击搜索按钮弹出搜索弹出层
	$('.header .searchbtn').off('click').on('click',function (){
		$('.searchpop').show();
		if($('.personalpop').css('display')=='block'){
			$('.personalpop').hide();
		}
		clearInterval(timer);
	});
	// 点击叉号关闭搜索弹出层
	$('.searchpop .head i').off('click').on('click',function (){
		$('.searchpop').hide();
		clearInterval(timer);
		timer=setInterval(function (){
			if(pagemove == true){
				now++;
				pagemove = false;
				fnPrev(now);
			};
		},2000);
	})
	//搜索弹出层选项卡
	$('.searchcont .menu p').off('click').on('click',function (){
		$('.searchcont .menu p').removeClass('active');
		$(this).addClass('active');
		$('.searchResult .item').hide();
		$('.searchResult .item').eq($(this).index()).show();
	});
	//最近搜索记录如果无：
		//$('.history').hide();
		//$('.nearest p.empty').show();
		//$('.nearest p.empty').html('暂无历史记录，赶快去寻找你喜欢的小站吧');
	// 清除最近搜索记录
	$('.nearest p.clearrecored').on('click',function (){
		$('.confirm').show();
		$('.confirmbtn .cancel').off('click').on('click',function (){
			$('.confirm').hide();
		});
		$('.confirmbtn .true').on('click',function (){
			$('.nearest .history').hide();
			$('.confirm').hide();
			$('.nearest p.empty').html('暂无历史记录，赶快去寻找你喜欢的小站吧');
			$('.nearest p.empty').show();
		});
	});

	// 点击菜单弹出登录页面
	$('.header i').off('click').on('click',function (){
		if($('.personalpop').css('display')=='none'){
			// 如果未登录
			$('.personalpop').show();
			$('.detail li a').off('click').on('click',function (){
				return false;
			});
			// 如果已登录
			// $('.personalpop').addClass('active');
			// $('.personalpop').show();
			clearInterval(timer);
		}else{
			$('.personalpop').hide();
			clearInterval(timer);
			timer=setInterval(function (){
				if(pagemove == true){
					now++;
					pagemove = false;
					fnPrev(now);
				};
			},2000);
		}
	});
	// $('.exitbtn a').on('touchstart',function (){
	// 	$('.exitbtn a').addClass('active');
	// })
	// $('.exitbtn a').on('touchend',function (){
	// 	$('.exitbtn a').removeClass('active');
	// })
	// 用户头像尺寸控制
	controlSize($('.logined .biglogo img'),w,120);
	// 页面图片控制尺寸
	function controlSize(obj,parentW,parentH){
		var oldImgW;
		var oldImgH;
		obj.each(function (){
			var _this=$(this);
			var tmpImg=new Image();
			tmpImg.src=_this.attr('src');
			tmpImg.onload=function(){
				oldImgW=this.width;
				oldImgH=this.height;
				var ratio=oldImgW/oldImgH;
				if(parentW/parentH>oldImgW/oldImgH){
					_this.width(parentW);
					var newImgH=_this.width()/ratio;
					_this.height(newImgH);
					_this.css({'marginTop':-(newImgH-parentH)/2+'px'});
				}else{
					_this.height(parentH);
					var newImgW=_this.height()*ratio;
					_this.width(newImgW);  
					_this.css({'marginLeft':-(newImgW-parentW)/2+'px'});
				}
			};
		});
	}
	// 搜索单品页面如无：
	//$('.s_cont').addClass('active');
});
