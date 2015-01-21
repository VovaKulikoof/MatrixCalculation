$(document).ready(function(){
			var BegHeightMenu;
				$('.sid').on('click',function(event){
					event.stopPropagation();
					if ($(this).width() < 220){
						$(this).attr('id','widSid').css({
							'box-shadow' : '2px 0px 25px 6px rgba(0, 0, 0, 0.45)'
						}).removeClass('sidNoActive').parent().css({
							'width'  : '1100px',
							'background' :'rgba(162,162,162,.35)'
						});
						$(".SideBarIcon").css({
							'opacity': '0'
						});
						setTimeout(function () {
								$('#SideBarName,.Ulmenu li').css({
									'display':'block'
								})
						}, 350);
					}
				});
			$('.WrappLeftSideBar').on('click',function(event){
				event.stopPropagation();
				if ($('.sid').attr('id') == 'widSid')
						$('.sid').attr('id','').css({
							'box-shadow' : 'none'
						}).addClass('sidNoActive').parent().css({
							'width'  : '60px',
							'background' :'rgba(162,162,162,.0)'
						}).find('#SideBarName,.Ulmenu li').css({
							'display':'none'
						});
						$(".SideBarIcon").css({
							'opacity': '1'
						});
			})
			$('#Operatli').on('click',function(event){
				$('.Ulmenu li').removeClass('HovLi');
				$(this).addClass('HovLi');
				$('.menu2').css({
					'display':'none'
				}).next().css({
					'display':'block'
				});
			})
			$('#SLEli').on('click',function(event){
				$('.Ulmenu li').removeClass('HovLi');
				$(this).addClass('HovLi');
				$('.menu').css({
					'display':'none'
				}).prev().css({
					'display':'block'
				});
			});
			$('.scroll-wrapper').children().css({
					'opacity' : 0
				})
			$('#MainBut').on('click',function(){
				
				$('.scroll-wrapper').animate({
					'height':'650px'
				},500);
			setTimeout(function () {
					$('.scroll-wrapper').children().animate({
					'opacity' : 1
				},300)
					var bars = '.jspHorizontalBar, .jspVerticalBar';
					$('.scroll-wrapper').jScrollPane(
			      	{
			      		autoReinitialise: true,
			      		hideFocus: true,
			      		showArrows : false
			        }).hover(
						function () {
							$(this).find(bars).stop().fadeTo('fast', 0.9);
						},
						function () {
							$(this).find(bars).stop().fadeTo('fast', 0);
						}

					);			

			},500)
			});
			$('#closeBut').on('click',function(){
				
						$('.sid').attr('id','').css({
							'box-shadow' : 'none'
						}).addClass('sidNoActive').parent().css({
							'width'  : '60px',
							'background' :'rgba(162,162,162,.0)'
						}).find('#SideBarName,.Ulmenu li').css({
							'display':'none'
						});
						$(".SideBarIcon").css({
							'opacity': '1'
						});
				var element = $('.scroll-wrapper')
				var api = element.data('jsp');
				api.destroy();
				$('.scroll-wrapper').css({
					'height':'0px'
				}).children().css({
					'opacity' : '0'
				});
			})
		});