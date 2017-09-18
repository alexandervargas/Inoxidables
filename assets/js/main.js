(function ($) {
 "use strict";
/*--------------------------
	preloader
---------------------------- */	
	$(window).on('load',function(){
		var pre_loader = $('#preloader')
	pre_loader.fadeOut('slow',function(){$(this).remove();});
	});	
/*----------------------------
	navbar-collapse
------------------------------ */
	$(document).on('click', '.navbar-collapse.in', function (e) {
		if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
			$(this).collapse('hide');
		}
	});
	$('body').scrollspy({
		target: '.navbar-collapse',
		offset: 195
	});	
 
/*----------------------------
	Parallax
------------------------------ */
  var well_lax = $('.parallax-area');
     well_lax.parallax("50%", 0.4);
  var well_text = $('.parallax-text');
     well_text.parallax("50%", 0.6);
 

/*----------------------------
	testimonial-carousel
------------------------------ */  
  $(".testimonial-carousel").owlCarousel({
      autoPlay: false, 
	  slideSpeed:2000,
	  pagination:true,
	  navigation:false,	  
      items : 2,
	  navigationText:["<i class='icofont icofont-long-arrow-left'></i>","<i class='icofont icofont-long-arrow-right'></i>"],
      itemsDesktop : [1199,2],
	  itemsDesktopSmall : [980,2],
	  itemsTablet: [768,1],
	  itemsMobile : [479,1]
  });
/*----------------------------
	team carousel
------------------------------ */  
  $(".team-carousel").owlCarousel({
      autoPlay: false, 
	  slideSpeed:2000,
	  pagination:true,
	  navigation:false,	  
      items : 3,
	  navigationText:["<i class='icofont icofont-swoosh-left'></i>","<i class='icofont icofont-swoosh-right'></i>"],
      itemsDesktop : [1199,3],
	  itemsDesktopSmall : [980,3],
	  itemsTablet: [768,2],
	  itemsMobile : [479,1]
  });
/*----------------------------
	team carousel
------------------------------ */  
  $(".brand-carousel").owlCarousel({
      autoPlay: true, 
	  slideSpeed:2000,
	  pagination:false,
	  navigation:false,	  
      items : 6,
	  navigationText:["<i class='icofont icofont-swoosh-left'></i>","<i class='icofont icofont-swoosh-right'></i>"],
      itemsDesktop : [1199,6],
	  itemsDesktopSmall : [980,4],
	  itemsTablet: [768,4],
	  itemsMobile : [479,3]
  });


/*--------------------------
	isotop
---------------------------- */
	$(window).on('load',function() {
		$('.portfolio-items').isotope({
		});
	});
	$(window).on('load',function() {
		$('.portfolio-mesonry').isotope({
		  itemSelector: '.portfolio-single',
		  layoutMode: 'masonry',
		  resizesContainer: false
		});
	});
	$(window).on('load',function() {
		$('.portfolio-nav li').on('click', function(){ 
			
		  $(".portfolio-nav li").removeClass("active");
		  $(this).addClass("active");        

			var selector = $(this).attr('data-filter'); 
			$(".portfolio-items").isotope({ 
				filter: selector, 
				animationOptions: { 
					duration: 750, 
					easing: 'linear', 
					queue: false 
				} 
			}); 
		  return false; 
		}); 
	});
/*---------------------
	TOP Menu Stick
--------------------- */
	var s = $("#sticker");
	var pos = s.position();					   
	$(window).on('scroll',function() {
		var windowpos = $(window).scrollTop();
		if (windowpos > pos.top) {
		s.addClass("stick");
		} else {
			s.removeClass("stick");	
		}
	});
/*---------------------
	page scrolling
--------------------- */
	$(function() {
		$('a.page-scroll').bind('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		});
	});

/*--------------------------
	venobox
---------------------------- */	
   $('.venobox').venobox(); 	
 
/*--------------------------
	scrollUp
---------------------------- */	
	$.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    }); 
/*----------------------------
    Contact form
------------------------------ */
	$("#contactForm").on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			formError();
			submitMSG(false, "Did you fill in the form properly?");
		} else {
			event.preventDefault();
			submitForm();
		}
	});
	function submitForm(){
		var name = $("#name").val();
		var email = $("#email").val();
		var msg_subject = $("#msg_subject").val();
		var message = $("#message").val();


		$.ajax({
			type: "POST",
			url: "assets/contact.php",
			data: "name=" + name + "&email=" + email + "&msg_subject=" + msg_subject + "&message=" + message,
			success : function(text){
				if (text === "success"){
					formSuccess();
				} else {
					formError();
					submitMSG(false,text);
				}
			}
		});
	}

	function formSuccess(){
		$("#contactForm")[0].reset();
		submitMSG(true, "Message Submitted!")
	}

	function formError(){
		$("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass();
		});
	}

	function submitMSG(valid, msg){
		if(valid){
			var msgClasses = "h3 text-center tada animated text-success";
		} else {
			var msgClasses = "h3 text-center text-danger";
		}
		$("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
	}

	
 
})(jQuery); 