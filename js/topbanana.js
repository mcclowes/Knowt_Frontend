// ------------------------------------------------------------------------------ //
// © TrevsLads MMXV --------------------------------------------------------------- //
// ------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------ //

var homepage = new RegExp("\/index\.html");
var documentPage = new RegExp("\/new\_document\.html");

//Home
if (homepage.test(window.location.pathname)) {
	(function(){
		var container = $('.column:first');
		container.css("opacity", 0);
		$(container).animate({opacity:1}, 2000);
	})();

	//Randomise background colour
	(function(){
		function changeBackground() {

			var bgColorArray = ['#0b1b2d','#0d2e11','#b31217', 'gray'];
			var color = bgColorArray[Math.floor((Math.random() * bgColorArray.length))];
			$(document.body).animate({backgroundColor: color}, 2500);
			$('.plus-ver:first').animate({backgroundColor: color}, 2500);
			$('.plus-hor:first').animate({backgroundColor: color}, 2500);
		}

		$(document).ready(changeBackground());
	})();

	//Animate squares
	(function(){
		function createSquare() {
			var container = $('.container:first');
			var plusBox = $('.plus-box:first');
			var plusBoxes = $('.plus-box');
			var newBox = $('<div class="plus-box">');

			var spawnSquareIndex = Math.floor(Math.random() * $('.plus-box', container[0]).length);
			var spawnSquare = $('.plus-box', container[0])[spawnSquareIndex];

			var directionVal = Math.random();
			$(newBox).css({top: $(spawnSquare).offset().top, left: $(spawnSquare).offset().left, opacity: 1, position: 'absolute'});
			/*if(directionVal < 0.25 && !(document.elementFromPoint($(spawnSquare).offset().top, $(spawnSquare).offset().left))){
				$(newBox).animate({top: "+=00", left: "+=100", opacity: 0.5 }, 500, function(){});
			} */
			console.log('Top: ' + plusBox.offset().top + ', Left: '+ plusBox.offset().left);

			if((directionVal < 0.34) && ((plusBox.offset().top != $(newBox).offset().top + 100) && (plusBox.offset().left != $(newBox).offset().left))){ //Up
				console.log('Did: Top: ' + (plusBox.offset().top+100) + ', Left: '+ plusBox.offset().left);
				$(newBox).animate({top: "+=100", left: "+=00", opacity: 0.5 }, 500, function(){});
			} else if((directionVal < 0.66) && ((plusBox.offset().top != $(newBox).offset().top) && (plusBox.offset().left != $(newBox).offset().left - 100))){ //Left
				console.log('Did: Top: ' + plusBox.offset().top + ', Left: '+ (plusBox.offset().left-100));
				$(newBox).animate({top: "+=00", left: "-=100", opacity: 0.5 }, 500, function(){});
			} else if((plusBox.offset().top != $(newBox).offset().top - 100) && (plusBox.offset().left != $(newBox).offset().left)){ //Down
				console.log('Did: Top: ' + (plusBox.offset().top-100) + ', Left: '+ plusBox.offset().left);
				$(newBox).animate({top: "-=100", left: "+=00", opacity: 0.5 }, 500, function(){});
			} else { //No free square
				console.log('Else')
				createSquare();
			}
			container.append(newBox);
		}

		setInterval( createSquare , 3000);
	})();
}

if (documentPage.test(window.location.pathname)) {
	(function(){
		//Make modules sortable
		function makeSortable() {
			var modules = $('ul');
			console.log(modules);
			for (var i = 0; i < modules.length; i++) {
				console.log($(modules[i]));
				$(modules[i]).sortable();
				//$(modules[i]).draggable();
			}
		};

		makeSortable();


		//Add text editing functionality
		function enableTextBoxes(){
			var textBoxes = $('.testbox');

			for (var i = 0; i < textBoxes.length; i++) {

				var observe;

				if (window.attachEvent) {
				    observe = function (element, event, handler) {
				        element.attachEvent('on'+event, handler);
				    };
				} else {
				    observe = function (element, event, handler) {
				        element.addEventListener(event, handler, false);
				    };
				}

			    var text = textBoxes[i];

			    function resize () {
			        text.style.height = 'auto';
			        text.style.height = text.scrollHeight+'px';
			    }
			    /* 0-timeout to get the already changed text */
			    function delayedResize () {
			        window.setTimeout(resize, 0);
			    }
			    observe(text, 'change', resize);
			    observe(text, 'cut', delayedResize);
			    observe(text, 'paste', delayedResize);
			    observe(text, 'drop', delayedResize);
			    observe(text, 'keydown', delayedResize);

			    text.focus();
			    text.select();
			    resize();
			}
		};

		enableTextBoxes();

		//Creating new modules
		(function enableAddModule(){
			var addModuleButton = $('.add-module');
			addModuleButton.click(function(){
				$(this).replaceWith('<div class="module-grid"><div class="col-xs-2 module-button text-module">Text</div><div class="col-xs-2 module-button image-module">Image</div></div>' );

				//Text module
				var textModuleButtons = $('.module-button.text-module');
				textModuleButtons.click(function(){
					console.log('Made text ' + this);
					$(this).parent().replaceWith('<li class="row module add-module"><img src="./img/plus-icon.png"></li><li class="row module"><form role="form"><textarea class="testbox" placeholder="Start typing..."></textarea></form></div><li class="row module add-module"><img src="./img/plus-icon.png"></li>' );
					makeSortable();
					enableAddModule();
				});

				//Image
				var imageModuleButtons = $('.module-button.image-module');
				imageModuleButtons.click(function(){
					$(this).parent().replaceWith('<li class="row module add-module"><img src="./img/plus-icon.png"></li><li class="row module"><div class="module image empty">+ Drag an image to upload</div><li class="row module add-module"><img src="./img/plus-icon.png"></li>' );
					console.log('Made image ' + this);

					var dropImages = $('.module.image.empty');
					console.log(dropImages);
					for (var i = 0; i < dropImages.length; i++) {
						console.log(dropImages[i]);
						dropImages[i].addEventListener("dragover", function(e){e.preventDefault();}, true);
						dropImages[i].addEventListener("drop", function(e){
							e.preventDefault();
							if (e.dataTransfer.files && e.dataTransfer.files[0]) {
								console.log('got here');
					            var imageReader = new FileReader();
					            imageReader.onload = function(){
						            imageReader.readAsDataURL(e.dataTransfer.files[0]);
						            console.log(reader);
						            console.log(reader.result);
						            $(this).append('<img src="' + reader.result + '">');
						            $(this).removeClass('empty');
						        }
					        }
						}, true);
					}
					makeSortable();
					enableAddModule();
				});
				//Table

			});
		})();
	})();
}

/*
	// --- Some Specific Page Tracking --- //
	// Note: Some async tracking requests can't be handled here, so they are inline below...

	if ($('html.section-friends').length === 1) {
		$.trackPageView('Friends Page Viewed');
	} else if ($('html.section-pay').length === 1 && $('html.section-pay.page-pack').length === 0) {
		$.trackPageView('Payment Page Viewed');
	} else if ($('html.section-l').length === 1) { // Landing pages
		$.trackPageView('PPC landing page viewed');
	}


	// === Live Chat === //

	// Show Live Chat on Pages, with exclusions
	if (
		$('html.section-terms').length !== 1 &&
		$('html.section-privacy').length !== 1 &&
		$('html.section-contact').length !== 1 &&
		$('html.section-signup').length !== 1 &&
		$('html.section-m').length !== 1 && // Mobile - it works, but gets in the way
		isMobile === false
	) {
		$zopim(function() {
			$zopim.livechat.button.show();
		});
	} else {
		$zopim(function() {
			$zopim.livechat.hideAll();
		});
	}

	// --- Utilities --- //

	// ---  Animation Factories --- //

	// Create Bar Charts
	window.barGraphFactory = function(options) {

		var defaults = {
			label : 'Event',
			firstValueColor : '#005470',
			firstValue : 100,
			secondValueColor : '#008ac8',
			secondValue : 50,
			xPos : '0px',
			verticalAlign: 'bottom',
			maxHeight: 400,
			labelHeight: 30,
			labelTopPadding: 15,
			speed: .75
		}

		var options = options || {},
			opts = $.extend({}, defaults, options),
			o = {};

		var bar = $('<div />'),
			firstBar = bar.clone().css({bottom:opts.labelHeight, backgroundColor: opts.firstValueColor, height: opts.firstValue+'px'}).addClass('first-value');
			secondBar = bar.clone().css({bottom:opts.labelHeight, backgroundColor: opts.secondValueColor, height: (opts.secondValue+opts.firstValue)+'px',bottom:opts.labelHeight}).addClass('second-value'),
			label = $('<div />', {html: opts.label, 'class':'label-bar', css: {top: (opts.maxHeight-opts.labelHeight+opts.labelTopPadding)+'px'}});

		// Align to top or bottom of canvas
		if (opts.verticalAlign === 'top') {
			bar.css({top: opts.yPos});
		} else {
			bar.css({bottom: opts.yPos});
		}

		bar.addClass('chart-bar').css({height: opts.maxHeight+'px',  left: opts.xPos+'px'}).append(label).append(firstBar).append(secondBar);

		var tl = new TimelineLite();

		tl.from(secondBar, opts.speed, {height: 0, ease: Sine.easeInOut});
		tl.from(firstBar, opts.speed, {height: 0, ease: Sine.easeInOut});

		o.tl = tl;
		o.bar = bar;

		return o;
	}


	// Create Flags
	window.flagFactory = function(options) {

		var defaults = {
			label : 'Event',
			poleColor : '#e6dd77',
			flagColor : '#008ac8',
			textColor : '#2a2a33',
			xPos : '0px',
			yPos : '0px'
		}

		var options = options || {},
			opts = $.extend({}, defaults, options),
			o = {};

		var flag = $('<div />',{css:{top: opts.yPos, left: opts.xPos}, 'class': 'flag'}),
			flagBase = $('<div />',{css:{backgroundColor: opts.flagColor}, 'class': 'flag-base'}),
			flagPole = $('<div />',{css:{backgroundColor: opts.poleColor}, 'class': 'flag-pole'}),
			flagSquare = $('<div />',{css:{backgroundColor: opts.flagColor}, 'class': 'flag-square'}),
			flagNote = $('<div />',{css:{color: opts.textColor}, 'class':'flag-note'});

		var tl = new TimelineLite();

		tl.from(flagBase, .25, {width: 0, height: 0, left:88, bottom:45, ease: Power4.easeIn});
		tl.from(flagNote, .25, {height: 0, ease: Power2.easeInOut});
		tl.from(flagPole, .5, {height: 0, ease: Power3.easeInOut});
		tl.from(flagSquare, .25, {width: 0, ease: Power2.easeInOut});

		flagPole.append(flagSquare);
		flagBase.append(flagPole);
		flag.append(flagNote.html(opts.label));
		flag.append(flagBase);

		o.timeline = tl;
		o.flag = flag;

		return o;
	}

	// Create dotted paths
	window.dottedPathFactory = function (options) {

		var defaults = {
			quantity : 30, // No. of dots
			duration : 3, // Seconds
			path : [{x:0, y:0}, {x: 0, y:200}],
			color: 'red',
			dotClass: 'dot',
			weight: 8,
			pulse: false,
			appendTo: null,
			initiallyPaused: false
	    }

		var options = options || {},
			opts = $.extend({}, defaults, options);

		if (opts.appendTo === null) {
			window.console && console.warn('dottedPathFactory .appendTo setting is required');
			return false;
		}

		var quantity = opts.quantity, // number of dots
			duration = opts.duration,  // duration (in seconds)
			path = opts.path, //points on the path
			position = {x:path[0].x, y:path[0].y},
			tween = TweenMax.to(position, quantity, {bezier:path, ease:Linear.easeNone}),
			dottedPathTimeline = new TimelineLite(),
			i,
			dot;

		path.shift();

		for (i = 0; i < quantity; i++) {
		  tween.time(i);
		  dot = $("<div />", {id:"dot"+i, css: {background: opts.color, height:opts.weight, width:opts.weight, left:position.x+"px", top:position.y+"px"}, 'class': opts.dotClass}).appendTo(opts.appendTo);
		  dottedPathTimeline.set(dot, {visibility:"visible"}, (i+.001) * (duration / quantity));

		  if (opts.pulse == true) {
		  	dottedPathTimeline.insert(TweenLite.to(dot, 0.2, {opacity:0}), (i+.001) * (duration / quantity) + 0.4);
		  }
		}

		if (opts.initiallyPaused) {
			dottedPathTimeline.pause();
		}

		return dottedPathTimeline;

	}


	// Create Tablets
	window.tabletFactory = function(options) {

		var defaults = {
			label : 'Event',
			xPos : '0px',
			yPos : '0px'
		}

		var options = options || {},
			opts = $.extend({}, defaults, options),
			o = {};

		var tablet = $('<div />',{css:{top: opts.yPos, left: opts.xPos}, 'class': 'tablet'}),
			tabletBody = $('<div />',{'class': 'tablet-body'}),
			tabletScreen = $('<div />',{'class': 'tablet-screen'}),
			tabletButton = $('<div />',{'class': 'tablet-button'}),
			tabletTick = $('<img />',{'class': 'tablet-tick', src: window.assetsURL+'/marketing/img/icons/white-tick.svg'}),
			tabletNote = $('<div />',{'class':'tablet-note'});

		// Animation
		var tl = new TimelineLite();
		tl.add(TweenLite.from(tablet, .3, {autoAlpha:0, ease: Power4.easeIn}));
		tl.add(TweenLite.from(tabletTick, .3, {top: '+=100', ease: Elastic.easeInOut}));
		tl.add(TweenLite.to(tabletScreen, .15, {backgroundColor:'#92e856', ease: Power4.easeIn}));
		tl.add(TweenLite.from(tabletNote, .15, {height: 0, ease: Power2.easeInOut},.5));

		// Construct elements
		tabletScreen.append(tabletTick);

		tablet
		.append(tabletNote.html(opts.label))
		.append(tabletBody)
		.append(tabletScreen)
		.append(tabletButton);

		o.timeline = tl;
		o.tablet = tablet;

		return o;
	}


	// Envelope Factory
	window.envelopeFactory = function(options){

		var defaults = {
			label : 'Event',
			xPos : '0px',
			yPos : '0px'
		}

		var options = options || {},
			opts = $.extend({}, defaults, options),
			o = {};

		var envelopeWrap = $('<div />', {'class': 'envelope-wrap', css: {top: opts.yPos, left: opts.xPos}}),
			envelope = $('<div />', {'class': 'envelope'}),
			tab = $('<div />',{'class':'envelope-tab'}),
			note = $('<div />',{'class':'envelope-note','html':opts.label}),
			tl = new TimelineLite();

		// Construct timeline
		tl.append(TweenLite.from(envelopeWrap,1,{autoAlpha:0, top:'-=30', ease: Elastic.easeOut}),.25);
		tl.append(TweenLite.from(note,.4,{height:'0', ease: Expo.easeIn}),-1);

		// Construct envelope elements
		envelope.append(tab);
		envelopeWrap.append(envelope).append(note);

		o.timeline = tl;
		o.envelope = envelopeWrap

		return o;
	}

	// Card Scanner Factory
	window.cardScannerFactory = function(options){

		var defaults = {
			xPos : '0px',
			yPos : '0px',
			scanWidth: '100px',
			scanHeight: '60px'
		}

		var options = options || {},
			opts = $.extend({}, defaults, options),
			o = {};

		var cardScannerWrap = $('<div />', {'class': 'card-scanner-wrap', css: {top: opts.yPos, left: opts.xPos, height: opts.scanHeight, width: opts.scanWidth}}),
			cardScannerLeftTop1 = $('<div />', {'class': 'card-scanner-big', css: {top: 0, left: 0}}),
			cardScannerLeftTop2 = $('<div />', {'class': 'card-scanner-small', css: {top: 0, left: '6px'}}),
			cardScannerLeftBottom1 = $('<div />', {'class': 'card-scanner-big', css: {bottom: 0, left: 0}}),
			cardScannerLeftBottom2 = $('<div />', {'class': 'card-scanner-small', css: {bottom: 0, left: '6px'}}),
			cardScannerRightTop1 = $('<div />', {'class': 'card-scanner-big', css: {top: 0, right: 0}}),
			cardScannerRightTop2 = $('<div />', {'class': 'card-scanner-small', css: {top: 0, right: '6px'}}),
			cardScannerRightBottom1 = $('<div />', {'class': 'card-scanner-big', css: {bottom: 0, right: 0}}),
			cardScannerRightBottom2 = $('<div />', {'class': 'card-scanner-small', css: {bottom: 0, right: '6px'}}),
			tl = new TimelineLite();

		// Construct timeline
		tl.append(TweenLite.from(cardScannerWrap, 0.4, {autoAlpha:0, top:'-=30%', ease: Back.easeOut}),.5);

		// Construct card scanner elements
		cardScannerWrap.append(cardScannerLeftTop1);
		cardScannerWrap.append(cardScannerLeftTop2);
		cardScannerWrap.append(cardScannerLeftBottom1);
		cardScannerWrap.append(cardScannerLeftBottom2);
		cardScannerWrap.append(cardScannerRightTop1);
		cardScannerWrap.append(cardScannerRightTop2);
		cardScannerWrap.append(cardScannerRightBottom1);
		cardScannerWrap.append(cardScannerRightBottom2);

		o.timeline = tl;
		o.cardScanner = cardScannerWrap;

		return o;
	}

	// Sticky Header (disabled on some pages e.g. home, signup, contact, errors)
	$('header.fixedsticky').fixedsticky();

	// Enable focuspoint effects
	$('.focuspoint').focuspoint();

	// Scroll to top links
	$('a[href="#akkroo-com"]').akkrooSmoothScroll();

	// Open link in a new window
	$('a.new-window').attr('target','_blank');

	// Terms of Use links
	$('a[data-action="load-terms"]').on('click.load-terms',function(e){
		e.preventDefault();
		var elem = $(this),
			terms_box = $('<div />',{'class':'terms-box'}),
			loading_msg = $('<i />',{html: ' &hellip; loading, please wait.'});
		elem.after(loading_msg);
		terms_box.load('/terms #terms',function(response,status){
			if (status == 'error') {
				window.location.href = elem.attr('href');
			} else {
				terms_box.children('.content').removeClass('content');
				elem.closest('p').after(terms_box);
				TweenLite.to(loading_msg,.5,{autoAlpha:0});
				TweenLite.from(terms_box,1,{height:0, ease: Sine.easeInOut});
				elem.unbind('click.load-terms');
			}
		})
	});

	// Footer data count
	$.post(
		'/ajax/keen/data-count',
		{action:'get-count'},
		function(data){
			if (data && data.result) {
				var val = data.result.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
				$('.data-count','footer').html(val);
			}
		},
		'json'
	);

	// Newsletter signup mechanics (.cm-form)
	$('.cm-form').submit(function (e) {
		var f = $(this);
		e.preventDefault();
		$.getJSON(
			this.action + "?callback=?",
			$(this).serialize(),
			function (data) {
				if (data.Status === 400) {
					alert("Error: " + data.Message);
				} else { // 200
					f.addClass('success').html("<p>Thanks for signing up!</p>");
				}
			}
		);
	});


	// --- Callback Form Modal --- //

	var callback_form_overlay = $('#callback-form').addClass('modal'),
		callback_form = $('form',callback_form_overlay),
		callback_form_links = $('a[href="#callback-form"]'),
		callback_form_first_title = $('h3:first',callback_form),
		callback_form_first_input = $('input:first',callback_form),
		callback_form_message_textarea = $('textarea:first',callback_form),
		callback_form_notes_input = $('#callback_notes',callback_form),
		callback_form_submit_button = $('button[type="submit"]',callback_form),
		callback_form_quit_button = $('a.cancel',callback_form),
		callbackFormTl = new TimelineLite({
			paused:true,
			onComplete: function(){
				callback_form_first_input.trigger('focus.autofocus');
			},
			onReverseComplete: function() {
				// Unbind all handlers & revert to original state
				callback_form_overlay.hide();
				$(document).unbind('.modal-close');
			}
		});

	var sent_callback_wrap = $('<div />'),
		sent_callback_note = $('<p />',{html:'Thanks for your message, we will be in touch soon.'}),
		sent_callback_exit_button_wrap = $('<div />',{'class':'buttons'}),
		sent_callback_exit_button = $('<button />',{html: 'Close', 'class': 'button small diminutive', click: function(){ closeCallback(); }});

	var sent_callback_message = sent_callback_wrap.append(sent_callback_note).append(sent_callback_exit_button_wrap.append(sent_callback_exit_button));

	// Define callback form animation
	callbackFormTl.to(callback_form_overlay, .25, {backgroundColor: 'rgba(255,255,255,.8)', ease: Sine.easeOut},.5),
	callbackFormTl.from(callback_form, .5, {top:'-=100%', ease: Sine.easeInOut},0);

	var closeCallback = function() {
		callbackFormTl.reverse();
	}

	var openCallback = function(e){

		// Track
		$.trackButtonClick('Opened Message Popup Form');

		// Show the callback form
		e.preventDefault();

		// Set the value of the notes field with the data attribute (if present)
		callback_form_notes_input.val($(this).attr('data-modal-notes') || "");

		// Set the value of the message if the data attribute is present
		if ( $(this).attr('data-modal-prefill-message') ) {
			callback_form_message_textarea.val($(this).attr('data-modal-prefill-message'));
		}

		// Set the title of the modal if the data attribute is present
		if ( $(this).attr('data-modal-title') ) {
			callback_form_first_title.html($(this).attr('data-modal-title'));
		}

		callback_form_overlay.show();
		callbackFormTl.play();
		// Set closing handlers
		$(document).on('keyup.modal-close',function(e){
			if (e.keyCode == 27) {
				closeCallback();
			}
		});
		callback_form_overlay.add(callback_form_quit_button).add(sent_callback_exit_button).on('click.modal-close',function(e){
			e.preventDefault();
			closeCallback();
		});
		// Prevent clicks on the form triggering a close
		callback_form.on('click.modal-close',function(e){
			e.stopPropagation();
		});

	};

	callback_form_links.on('click.callback-form',openCallback);

	callback_form.on('submit.callback-form-ajax',function(e){

		e.preventDefault();

		callback_form.blast();

		var callback_form_fieldset = $('fieldset',callback_form);

		TweenLite.to(callback_form_fieldset, .25, {opacity:.0, ease: Sine.easeIn});

		$('button',callback_form).prop('disabled',true).addClass('disabled');

		var formSerialized = callback_form.serializeObject();

		// Add errors to log
		$.ajax({
			type: "POST",
			url: "//" + window.location.hostname + "/ajax/callback-form",
			data: { "form" : formSerialized },
			async: false,
			crossDomain: true,
			error: function(xhr, textStatus, errorThrown) {
				window.console && console.warn(xhr, textStatus, errorThrown);
				form.unbind('submit.callback-form-ajax');
				form.submit(); // Manual override
			},
			success: function(data) {

				$('.error',callback_form).remove();

				window.console && console.log('Sending AJAX signup to callback form worked',data);

				if (data && data.errors && data.errors.length > 0) { // Errors

					for(var i=0; i < data.errors.length; i++) {

						$('#'+data.errors[i].id).closest('.field').append($('<div />',{'class':'error', html: data.errors[i].message }));

					}

				} else { // Success

					callback_form_fieldset.replaceWith(sent_callback_message);
					$.trackContactFormSubmission('Contact Form Overlay Submitted');

				}

				// Re-enable controls
				TweenLite.to(callback_form_fieldset, .25, {opacity:1, ease: Sine.easeIn});
				$(':input',callback_form).reverse().trigger('focus');
				$('button',callback_form).prop('disabled',false).removeClass('disabled');

			}

		});

	});




	// --- Login Form Modal --- //

	var login_form_overlay = $('#login-form').addClass('modal'),
		login_form = $('form',login_form),
		login_form_links = $('a','.login'),
		login_form_first_input = $('input:first',login_form),
		login_form_quit_button = $('a.cancel',login_form),
		loginFormTl = new TimelineLite({
			paused:true,
			onComplete: function(){
				login_form_first_input.trigger('focus.autofocus');
			},
			onReverseComplete: function() {
				// Unbind all handlers & revert to original state
				login_form_overlay.hide();
				$(document).unbind('.modal-close');
			}
		});

	// Define login form animation
	loginFormTl.to(login_form_overlay, .25, {backgroundColor: 'rgba(255,255,255,.8)', ease: Sine.easeOut},.5),
	loginFormTl.from(login_form, .5, {top:'-=100%', ease: Sine.easeInOut},0);

	login_form_links.on('click.login-form',function(e){
		// Show the login form
		e.preventDefault();

		login_form_overlay.show();
		loginFormTl.play();
		// Set closing handlers
		$(document).on('keyup.modal-close',function(e){
			if (e.keyCode == 27) {
				loginFormTl.reverse();
			}
		});
		login_form_overlay.add(login_form_quit_button).on('click.modal-close',function(e){
			e.preventDefault();
			loginFormTl.reverse();
		});
		// Prevent clicks on the form triggering a close
		login_form.on('click.modal-close',function(e){
			e.stopPropagation();
		});
	});


	////////// SPECIFIC PAGES //////////


	// --- Home Page --- //

	if ($('html.section-home.page-index').length === 1) {

			(function(){

			if ( $('#homepage-variant-001').length !== 1 ) return;

			var combinedList = [
					{audience: 'leads at your trade shows', action: 'send that data straight to your CRM'}, // First one is ignored, but required
					{audience: 'leads at your trade shows', action: 'send that data straight to your CRM'},
					{audience: 'data from your customers', action: 'use that data to grow your brand'},
					{audience: 'data from your attendees', action: 'use that to measure exhibition ROI'},
					{audience: 'data from your clients', action: 'use that to monitor feedback'},
					{audience: 'data from your prospects', action: 'use that to keep your leads warm'},
					{audience: 'data from your delegates', action: 'use that to track event attendance'},
					{audience: 'data from your contacts', action: 'use that to create an event guest list'},
					{audience: 'data from your candidates', action: 'use that to populate your ATS'}
				],
				combinedListLength = combinedList.length,
				titleIndex = 0,
				h1 = $('h1').css({opacity:0}),
				audienceB = $('.audience',h1),
				actionB = $('.action',h1),
				audienceSpan = $('span',audienceB),
				actionSpan = $('span',actionB),
				changeTitleInterval;

			var setTitleWidths = setInterval(function(){
				audienceSpan.html(combinedList[titleIndex].audience);
				actionSpan.html(combinedList[titleIndex].action);
				combinedList[titleIndex].audienceWidth = audienceB.width();
				combinedList[titleIndex].actionWidth = actionB.width();
				if (titleIndex < combinedListLength - 1) {
					titleIndex++;
				} else {

					// Widths all set
					clearInterval(setTitleWidths);
					titleIndex = 1;

					actionSpan.add(audienceSpan).css({width:'1000px'});

					// Do first one
					changeTitle();

					// Start animation
					changeTitleInterval = setInterval(function(){
						changeTitle();
					},5500);
				}
			},20);


			var changeTitle = function() {

				audienceB.delay(200).animate({width:0},200);
				actionB.animate({width:0},200,function(){

					audienceSpan.html(combinedList[titleIndex].audience);
					actionSpan.html(combinedList[titleIndex].action);

					audienceB.animate({width:combinedList[titleIndex].audienceWidth+'px'},200);
					actionB.delay(300).animate({width:combinedList[titleIndex].actionWidth+'px'},200);

					if (titleIndex < combinedListLength - 1) {
						titleIndex++;
					} else {
						titleIndex = 1;
					}

					h1.css({opacity:1});

				});
			}

		}());

	}


	// --- Contact Page --- //

	if ($('html.section-contact.page-index').length === 1) {

		(function(){

			if ( $('#contact-form-submitted').length !== 1 ) {
				$.trackPageView('Contact Page Form Viewed');
			}

			// This generates a invisible, clickable cover to stop issues with slippy maps in mobiles
			$('.map').prepend($('<div />',{'class':'overlay',click: function() { $(this).css('pointer-events','none') } }));

			var contactPageForm = $('#contact-page-form'),
				contactPageFormButtons = $('button',contactPageForm);

			contactPageForm.on('submit.contact-form',function(e){

				e.preventDefault();

				// Animate and disable buttons
				contactPageForm.parent().blast();
				contactPageFormButtons.prop('disabled',true).addClass('disabled');

				$.trackContactFormSubmission('Contact Us Page Form Submitted', {
													'Form Name': $('#name').val(),
													'Form Email': $('#email').val(),
													'Form Phone': $('#phone').val(),
													'Form Company': $('#company').val(),
													'Form Message': $('#message').val()
													});

				// Delay to enabled async tracking requests to succeed...
				$.delayAction(function(){
					contactPageForm.unbind('submit.contact-form');
					contactPageForm.submit();
				},300);

			});

		})();

	}


	// --- Jobs / Careers --- //

	if ($('html.section-jobs').length === 1) {

		(function(){

			$('a[href^="#"]','main').akkrooSmoothScroll();

		})();

	}


	// --- Payment Pages --- //

	if ( $('html.section-pay').length === 1 ) {

		(function(){

			// Payment with Stripe

			Stripe.setPublishableKey(window.stripePublicKey);

			var $form = $('#checkout-form:first');

			var stripeResponseHandler = function(status, response) {

				var $payment_error_marker = $('table:first',$form);

				if (response.error) {
					// Show the errors on the form
					if ($payment_error_marker.next('ul.errors').length > 0) {
						$payment_error_marker.next('ul.errors').html('<li>'+response.error.message+'</li>');
					} else {
						$payment_error_marker.after($('<ul />',{'class':'errors',html:'<li>'+response.error.message+'</li>'}));
					}
					$form.find('button').removeClass('disabled');//.removeProp('disabled')
				} else {
					// token contains id, last4, and card type
					var token = response.id;
					// Insert the token into the form so it gets submitted to the server
					$form.append($('<input />',{name:'stripeToken',type:'hidden', value: token}));
					// and re-submit
					$form.unbind('submit.checkout');
					$form.attr('action', $form.attr('data-action')); // Done to stop people with JS turned off from submitting the form
					$form.submit();
				}
			};

			$form.on('submit.checkout',function(e) {
				if ($form.find('button').hasClass('disabled')) {
		            alert('You must agree to the Akkroo terms of sale');
		           	e.preventDefault();
		        } else {
					// Disable the submit button to prevent repeated clicks
					$form.find('button').addClass('disabled');//.prop('disabled', true);
					$('ul.errors',$form).remove();

					Stripe.createToken($form, stripeResponseHandler);

					// Prevent the form from submitting with the default action
					e.preventDefault();
				}
			});

			// Calculate the VAT amount automatically
			$('#amount, #vat').on('change keyup blur',function(){
				var amount_ex = $('#amount_ex').val().trim() ? parseFloat($('#amount_ex').val()) : 0;
				var vat = $('#vat').val().trim() ? parseFloat($('#vat').val()) : 0;
				var amount = $('#amount');
				var total = parseFloat(amount_ex * (1 + (vat/100))).toFixed(2);
				amount.val(total);
			}).trigger('keyup');


			// Credit Card Images
			var select_card = function(card) {

				var we_accept = $('img','.we-accept-cards');

				if (card == 'maestro') we_accept.filter('[alt="Maestro"]').css({opacity:1}).siblings('img').css({opacity:0.1});
				else if (card == 'mastercard') we_accept.filter('[alt="MasterCard"]').css({opacity:1}).siblings('img').css({opacity:0.1});
				else if (card == 'visa') we_accept.filter('[alt="Visa"]').css({opacity:1}).siblings('img').css({opacity:0.1});
				else if (card == 'visa-electron') we_accept.filter('[alt="Visa Electron"]').css({opacity:1}).siblings('img').css({opacity:0.1});
				else if (card == 'amex') we_accept.filter('[alt="American Express"]').css({opacity:1}).siblings('img').css({opacity:0.1});
				else we_accept.css({opacity:1});

			}

			$('.card-number').bind('keyup change',function(){

				var val = $(this).val();
				var val1 = val.substr(0,1);
				var val2 = val.substr(0,2);

				if (val.length > 1) {
					if (val2 == '56') select_card('maestro');
					else if (val2 == '34' || val2 == '37') select_card('amex');
					else if (val1 == '5') select_card('mastercard');
					else if (val2 == '42' || val2 == '45' || val2 == '48' || val2 == '49') select_card('visa-electron');
					else if (val1 == '4') select_card('visa');
					else select_card('all');
				} else select_card('all');

			});

		}());

	}

	if ( $('html.section-pay.page-card').length === 1 ) {
		(function(){
			var $form = $('#checkout-form:first');

			$form.find('#termsCheckbox').on('change', function() {
				if (!$form.find('#termsCheckbox').is(':checked')) {
		 			$form.find('button').addClass('disabled');
		 		} else {
		 			$form.find('button').removeClass('disabled');
		 		}
			});
		})();
	}

	// --- Signup --- //

	if ($('html.section-signup.page-index').length === 1)  {

		(function(){

			var signupForm = $('#signup-form'),
				signupAside = $('aside','.signup-form'),
				signupFieldsets = $('fieldset',signupForm),
				signupFieldsetStage0 = signupFieldsets.filter('.stage-0'),
				signupFieldsetStage0Fields = signupFieldsetStage0.find('.field'),
				signupFieldsetStage0Children = signupFieldsetStage0.children(),
				signupFieldsetStage1 = signupFieldsets.filter('.stage-1'),
				signupFieldsetStage1Fields = signupFieldsetStage1.find('.field'),
				signupFieldsetStage1Children = signupFieldsetStage1.children(),
				signupFieldsetStage2 = signupFieldsets.filter('.stage-2'),
				signupFieldsetStage2Fields = signupFieldsetStage2.find('.field'),
				signupFieldsetStage2Children = signupFieldsetStage2.children(),
				signupFields = $('.field',signupForm),
				errorMessages = $('li','ul.errors'),
				errorsVisible = errorMessages.length > 0 ? true : false,
				companyNameField = $('#company'),
				usernameField = $('#username'),
				reasonOtherCheckbox = $('#reason_other_checkbox'),
				reasonOtherFieldWrap = $('.get-reason-other').first().hide(),
				reasonOtherField = $('#reason_other');

			var successMark = $('<img />',{'class':'success-mark',src:window.assetsURL+'marketing/img/icons/white-tick.svg'}),
				errorMark = $('<img />',{'class':'error-mark',src:window.assetsURL+'marketing/img/icons/white-cross.svg'}),
				advanceSignupButtonContent = $('<button />',{ 'class':'button cta', type:'submit', 'html':'Create account' }),
				advanceSignupButton = $('<div />',{ 'class':'buttons' }).append(advanceSignupButtonContent),
				advanceNextSignupButtonContent = $('<button />',{ 'class':'button cta', type:'submit', 'html':'Next&hellip;' }),
				advanceNextSignupButton = $('<div />',{ 'class':'buttons' }).append(advanceNextSignupButtonContent);

			var toggleFieldVisibility = function(field,force){
				if ( field.is(':hidden') || force === true ) { field.show(); }
				else { field.hide(); }
			};


			// Auto-complete company username field
			companyNameField.on('keyup blur',function(){
				var str = companyNameField.val().replace(/\W/g,'').toLowerCase();
				usernameField.val( str );
			});

			var logSignup = function(current_stage){
        if (current_stage === 1) {
          $.post(
            '/ajax/signup-attempt',
            {
              data: signupForm.serializeObject(['password'])
            },
            function(data) {
              window.console && console.log('Sending AJAX signup attempt worked');
            },
            'json'
          ).fail(function(data) {
            window.console && console.log('Sending AJAX signup attempt failed');
          });
        }

				// Track
				$.trackFormSubmission('Sign Up Form page submitted [Stage '+current_stage+']',{'Submitted on stage': current_stage});

				// Add to log
				$.post('/ajax/visitor-log',
							{
								message: 'New Signup Attempt [Stage '+current_stage+']',
								data: signupForm.serializeObject(['password']), // Exclude password
								level: 'notice'
							},
							function(data) {
								window.console && console.log('Sending AJAX signup to log worked');
							},
							'json')
						.fail(function(data){
							window.console && console.warn('Sending AJAX signup to log failed');
            });
      };

			function setSignupStage(stage) {

				var signupFormTl = new TimelineMax();
				var signupFieldsetStage0Height = signupFieldsetStage0.height(); // Store this up front
				var signupFieldsetStage1Height = signupFieldsetStage1.height(); // Store this up front
				var signupFieldsetStage2Height = signupFieldsetStage2.height(); // Store this up front
				var buttons =  $('button',signupForm);

				// Enable toggling of 'other' field
				reasonOtherCheckbox.on('change',function(){
					toggleFieldVisibility(reasonOtherFieldWrap);
				});

				if (stage === 0) { // Show the first fieldset

					// Tracking
					$.trackPageView('Sign Up Form page viewed [Stage 0]',{'Stage': '0'});

					// Setup the form, hide fieldset 1 + 2 by default
					signupFormTl.to(signupFieldsetStage1, 0, {display: 'none'});
					signupFormTl.to(signupFieldsetStage2, 0, {display: 'none'});

					// Turn off form submission, make it advance to stage 1...
					signupForm.on('submit.sign-up-0',function(e){

						e.preventDefault();

						buttons.prop('disabled',true);

						// Log new signups
						logSignup(0);

						setSignupStage(1);
					});

					// Add the button
					signupFieldsetStage0.append(advanceNextSignupButton);

					signupFieldsetStage0Children = signupFieldsetStage0.children(); // Refresh array of children to include button

					signupFormTl
					.set(signupFieldsetStage0, {display:'block'})
					.staggerFrom(signupFieldsetStage0Children, .5, {autoAlpha:0, left:'+=40', ease: Power1.easeIn}, .15, '+=.25');


				} else if (stage === 1) { // Show the email/pass fieldset

					// Tracking
					$.trackPageView('Sign Up Form page viewed [Stage 1]',{'Stage': '1'});

					// Setup the form, hide fieldset 2 by default
					signupFormTl.to(signupFieldsetStage2, 0, {display: 'none'});

					// Turn off form submission, make it advance to stage 2...
					signupForm.unbind('submit.sign-up-0');
					signupForm.on('submit.sign-up-1',function(e){

						e.preventDefault();

						buttons.prop('disabled',true);

						// Log new signups
						logSignup(1);

						setSignupStage(2);
					});

					// Add the button
					signupFieldsetStage1.append(advanceSignupButton);

					signupFieldsetStage1Children = signupFieldsetStage1.children(); // Refresh array of children to include button
					signupFieldsetStage1Height = signupFieldsetStage1.height(); // Refresh height to include button

					// Hide old fields
					signupFormTl.staggerTo(signupFieldsetStage0Children, .31, { left:'-=40', autoAlpha:0, ease: Power1.easeIn }, .15, 0, function(){

						// Now introduce the new fields
						signupFormTl
						.to(signupFieldsetStage0,.25,{display:'none', height: signupFieldsetStage1Height}) // Match the heights of the stages, hide the first fieldset
						.set(signupFieldsetStage1,{display:'block', height: signupFieldsetStage1Height}) // Instantly reveal the second
						.staggerFrom(signupFieldsetStage1Children, .5, {autoAlpha:0, left:'+=40', ease: Power1.easeIn}, .15, '+=.25', function(){
							$('input:first',signupFieldsetStage1Fields).first().trigger('focus.autofocus');
						});

					});



				} else if (stage === 2) { // Hide the email/pass fieldset, show the final fieldset

					$.trackPageView('Sign Up Form page viewed [Stage 2]',{'Stage': '2'});

					signupForm.unbind('submit.sign-up-1'); // Allow the form to be submitted...
					signupForm.on('submit.sign-up-2',function(e){

						buttons.prop('disabled',true);

						var form = this;
						e.preventDefault();

						// Log new signups
						logSignup(2);

						// Delay to allow log to complete
					    setTimeout( function () {
					        form.submit();
					    }, 300);

					});

					// Hide old fields
					signupFormTl.staggerTo(signupFieldsetStage1Children, .5, { left:'-=40', autoAlpha:0, ease: Power1.easeIn }, .15, 0, function(){

						// Now introduce the new fields
						signupFormTl
						.to(signupFieldsetStage1,.25,{display:'none', height: signupFieldsetStage2Height}) // Match the heights of the stages, hide the first fieldset
						.set(signupFieldsetStage2,{display:'block', height: signupFieldsetStage2Height}) // Instantly reveal the second
						.staggerFrom(signupFieldsetStage2Children, .5, {autoAlpha:0, left:'+=40', ease: Power1.easeIn}, .15, '+=.25', function(){
							$('input:first',signupFieldsetStage2Fields).first().trigger('focus.autofocus');
						});

					});


				} else if (stage === 3) { // Errors returned, show everything, remove titles


					// Hide some elements
					signupFieldsets.find('h1, h4').add(signupAside).hide();

					// Add appropriate titles
					signupForm.prepend($('<h4 />',{html: 'Please complete these details&hellip;'}));
					signupForm.prepend($('<h1 />',{html: 'Nearly done'}));

					// Reveal the other field if populated
					if ( reasonOtherField.val() !== "" ) {
						toggleFieldVisibility(reasonOtherFieldWrap,true);
					}

					// Apply errors directly to the page
					var errorString = '';
					errorMessages.each(function(){
						var error = $('<div />',{'class':'error', html: $(this).html() });
						errorString += ', '+$(this).html();
						$(this).remove();
						$($(this).attr('data-id')).after(error);
					});

					// Check again for any remaining errors in the DOM
					if ( $('li','ul.errors').length === 0 ) $('.errors').remove();

					signupFieldsets.show();

					// Track
					$.trackPageView('Sign Up Form page viewed but with errors',{'Stage': '3','Errors Shown': errorString});

					// Add errors to log
					$.post('/ajax/visitor-log',
								{
									message: 'Sign Up Form Submission returned errors [Stage 3]',
									data: [errorString, signupForm.serializeObject(['password'])],
									level: 'warning'
								},
								function(data) {
									window.console && console.log('Sending AJAX signup to log worked');
								})
							.fail(function(data){
								window.console && console.warn('Sending AJAX signup to log failed');
							});

					// Log Submissions
					signupForm.unbind('submit.sign-up-2');
					signupForm.on('submit.sign-up-3',function(e){

						buttons.prop('disabled',true);

						var form = this;
						e.preventDefault();

						// Log new signups
						logSignup(3);

						// Delay to allow log to complete
					    setTimeout( function () {
					        form.submit();
					    }, 300);

					});

				}

				// Enable all disabled buttons
				$('button',signupForm).prop('disabled',false);

				signupFormTl.play();

			}

			// Kick off the page ... check for errors and show accordingly
			if ( errorsVisible ) setSignupStage(3);
			else setSignupStage(0);


			// == Validation == //
			// The principle here is we warn, but don't prevent navigation using JS
			// The only thing preventing someone from continuing to the next stage
			// is if they don't pass the server side validation

			var countRegexp = function(val, rex) {
				var match = val.match(rex);
				return match ? match.length : 0;
			};


			var countNums = /\d/g,
				countLowers = /[a-z]/g,
				countUppers = /[A-Z]/g;

			// Prepare...
			signupFields.append(successMark).append(errorMark);

			// Validation Rules
			// TODO - back button?

			// Email
			$('#email',signupFields).on('keyup blur',function(e){
				if ($(this).val().trim() !== '' && $(this).val().indexOf('@') > -1 && $(this).val().indexOf('.') > -1 ) {
					successMark(this,'show',e.type); // No @ or .? Error!
				} else {
					successMark(this,'error',e.type);
				}
			});

			// Password
			$('#password',signupFields).on('keyup blur',function(e){
				if ($(this).val().trim().length >= 8 && countRegexp($(this).val(), countNums) > 0 && countRegexp($(this).val(), countLowers) + countRegexp($(this).val(), countUppers) > 0) {
					successMark(this,'show',e.type);
				} else {
					successMark(this,'error',e.type);
				}
			});

			// Full name (must contain space)
			$('#name',signupFields).on('keyup blur',function(e){
				if ($(this).val().trim() !== '' && $(this).val().indexOf(' ') > -1) {
					successMark(this,'show',e.type); // No ' '? Error!
				} else {
					successMark(this,'error',e.type);
				}
			});

			// Company
			$('#company',signupFields).on('keyup blur',function(e){
				if ($(this).val().trim() !== '') {
					successMark(this,'show',e.type); // No ' '? Error!
				} else {
					successMark(this,'error',e.type);
				}
			});

			// Username
			$('#username',signupFields).on('keyup blur',function(e){

				if ($(this).val().trim() !== '' && $(this).val().indexOf(' ') === -1) {
					successMark(this,'show',e.type); // Includes spaces? Error!
				} else {
					successMark(this,'error',e.type);
				}
			});

			// Show hide the validation marks
			var successMark = function(elem,show,eventType) {

				var time;

				// Keyup delay, blur no delay
				if (eventType == 'blur') time = 0;
				else time = 500;

				var elem = $(elem),
					elemSuccessMark = elem.siblings('img.success-mark'),
					elemErrorMark = elem.siblings('img.error-mark'),
					xPosVisible = 12,
					xPosHidden = -40;

				// Throttle changes
				$.delayAction(function(){

					if (show == 'show') {
						TweenLite.to(elemSuccessMark,1,{right: xPosVisible, ease: Elastic.easeInOut});
						TweenLite.to(elemErrorMark,.5,{right: xPosHidden, ease: Expo.easeOut});
					} else if (show == 'hide') {
						TweenLite.to(elemSuccessMark,.5,{right: xPosHidden, ease: Expo.easeOut});
						TweenLite.to(elemErrorMark,.5,{right: xPosHidden, ease: Expo.easeOut});
					} else if (show == 'error') {
						TweenLite.to(elemSuccessMark,.5,{right: xPosHidden, ease: Expo.easeOut});
						TweenLite.to(elemErrorMark,1,{right: xPosVisible, ease: Elastic.easeInOut});
					}

			    }, time );
			}

		})();

	}


	// --- Signup Go --- //

	if ($('html.section-signup.page-go').length === 1)  {

		(function(){

			// Start tracking in CRM
			$.post('/ajax/crm',window.crm_data,
				function(data) {
					window.console && console.log('Sending to AJAX CRM registration worked');
				})
			.fail(function(data){
				window.console && console.warn('Sending to AJAX CRM registration failed');
			},'json');

			// Other tracking
			$.trackPageView('Account Provisioning Page Viewed');

			if ( window.crm_data && window.crm_data.user && window.crm_data.user.id ) { // Only run once, when data exists

				// Announce the account was created
				$.trackAccountAction('Created An Account',{'User ID' : window.crm_data.user.id});

			}

			// Now, do the animation
			var provisioning_account_messages = $('#provisioning-account-messages');

			if (provisioning_account_messages.length) {

				$('li',provisioning_account_messages).css({opacity:0.2}).first().animate({opacity:1},500,function(){
					$(this).next('li').delay(300).animate({opacity:1},500,function(){
						$(this).next('li').delay(300).animate({opacity:1},500,function(){

							// Go!
							window.location.href = $('a:first',provisioning_account_messages).attr('href');

						});
					});
				});

			}

		}());

	}


	// --- Use Cases: Enterprise --- //

	if ($('html.section-l').length === 1) { // Previously... html.section-use-cases.page-enterprise also

		(function(){

			$('.copy > img','.solution-enterprise-intro').akkrooSmoothScroll({scrollToElementId:'#logos'});

			// ROI Animation

			var roiFigure = $('.figure','.solution-enterprise-roi:first').css('position','relative');

			if ( roiFigure.length > 0 ) {

				var roiFigureChart = $('<div />',{'class':'animated-chart'});

				var glasgowBar = barGraphFactory({label: 'Glasgow <span>2<sup>nd</sup> Jan</span>', firstValue: 90, secondValue: 60, xPos: 10});
				var seoulBar = barGraphFactory({label: 'Seoul <span>23<sup>rd</sup> Apr</span>', firstValue: 120, secondValue: 80, xPos: 120});
				var houstonBar = barGraphFactory({label: 'Houston <span>31<sup>st</sup> May</span>', firstValue: 180, secondValue: 90, xPos: 230});
				var berlinBar = barGraphFactory({label: 'Berlin <span>10<sup>th</sup> Jun</span>', firstValue: 110, secondValue: 160, xPos: 340});
				var leonBar = barGraphFactory({label: 'Leon <span>31<sup>st</sup> Jul</span>', firstValue: 100, secondValue: 200, xPos: 450});
				var corkBar = barGraphFactory({label: 'Cork <span>7<sup>th</sup> Dec</span>', firstValue: 30, secondValue: 290, xPos: 560});

				var xAxis = $('<div />',{'class':'x-axis'}),
					xGridLine1 = xAxis.clone().css({top:'60px'}),
					xGridLine2 = xAxis.clone().css({top:'140px'}),
					xGridLine3 = xAxis.clone().css({top:'220px'}),
					xGridLine4 = xAxis.clone().css({top:'300px'});


				var qualifiedLeadsKey = $("<div />",{html: '<span></span> Qualified Leads','class':'qualified-leads-key'});
				var salesKey = $("<div />",{html: '<span></span> Completed Sales','class':'sales-key'});

				// Add to DOM
				roiFigureChart
				.append(glasgowBar.bar)
				.append(seoulBar.bar)
				.append(houstonBar.bar)
				.append(berlinBar.bar)
				.append(leonBar.bar)
				.append(corkBar.bar)
				.append(xAxis)
				.append(xGridLine1)
				.append(xGridLine2)
				.append(xGridLine3)
				.append(xGridLine4)
				.append(qualifiedLeadsKey)
				.append(salesKey);

				roiFigure.append(roiFigureChart);

				var roiFigureAnimation = new TimelineLite({paused:true});

				roiFigureAnimation
				.insert(TweenLite.from(xGridLine1, .75, {top:"370px", ease: Expo.easeOut}),0)
				.insert(TweenLite.from(xGridLine2, .75, {top:"370px", ease: Expo.easeOut}),.15)
				.insert(TweenLite.from(xGridLine3, .75, {top:"370px", ease: Expo.easeOut}),.30)
				.insert(TweenLite.from(xGridLine4, .75, {top:"370px", ease: Expo.easeOut}),.45)
				.insert(glasgowBar.tl,.75)
				.insert(seoulBar.tl,1)
				.insert(houstonBar.tl,1.25)
				.insert(berlinBar.tl,1.5)
				.insert(leonBar.tl,1.75)
				.insert(corkBar.tl,2);

				roiFigureAnimation.pause();

				// Play animations in view
				$(window).on('scroll.roiFigureAnimation',function(){
					if ( roiFigureChart.isOnScreen(0.1, 0.1) ) {
						roiFigureAnimation.play();
						//$(window).unbind('scroll.roiFigureAnimation');
					} else {
						roiFigureAnimation.restart();
					}
				});

			}

		}());

	}


/* ------------------------------------------------*/
/* -------------- GENERAL ANIMATIONS --------------*/
/* ------------------------------------------------*/
/*
	//Mobile homepage animations

	if ( $('html.section-m.page-index').length === 1 ) {
		var fadingImages = $('.fading-image');
		var count = 1;
		var last = 0;

		$(fadingImages[last]).show();

		setInterval(function(){
			$(fadingImages[last]).fadeOut(400);
			setTimeout(function(){
				$(fadingImages[count]).fadeIn(400);
				count++;
				last++;
				if (count>=fadingImages.length) {count=0};
				if (last>=fadingImages.length) {last=0};
			}, 400);
		}, 3750);
	}

	//e-signature animation

	if ( $('html.section-how-it-works.page-index').length === 1 ) {
		var eSignatureFigure = $('#signature-animation:first');
		//var eSignatureFigure = $('#signature-animation','.howitworks-more-than:first');

		if ( eSignatureFigure.length > 0 && eSignatureFigure.isOnScreen(0.25, 0.25)) {
					eSignatureFigure.addClass("play");
		} else {
			$(window).on('scroll.eSignatureFigure',function(){
				if ( eSignatureFigure.length > 0 && eSignatureFigure.isOnScreen(0.25, 0.25)) {
					//if ($.checkKeyframeAnimationSupport()) {
						eSignatureFigure.addClass("play");
					// } else {
					// 	eSignatureFigure.addClass("unplayable");
					// }
				}
			});
		}
	}

	/* ------------------------------------------------*/
	/* ------------ iPad Popup animation --------------*/
	/* ------------------------------------------------*/
/*
	if ( $('html.section-consumer-events.page-index').length === 1 ||
		$('html.section-agencies.page-index').length === 1 ||
		$('html.section-l').length === 1 ) {

		var tabletPopupFigure = $('.figure','.ipad-pop-up:first');

		if ( tabletPopupFigure.length > 0 ) {

			var tabletPopupFigureAnimation = new TimelineLite();

			var tablets = $('img',tabletPopupFigure);

			tabletPopupFigureAnimation
			.staggerTo(tablets, 1, {top:0, ease: Power1.easeOut}, .15, '+=.5');

			tabletPopupFigureAnimation.pause();

			// Play animations in view
			$(window).on('scroll.tabletPopupFigureAnimation',function(){
				if ( tabletPopupFigure.isOnScreen(0.5, 0.5) ) {
					tabletPopupFigureAnimation.play();
					$(window).unbind('scroll.tabletPopupFigureAnimation');
				} else {
					tabletPopupFigureAnimation.restart();
				}
			});

			tabletPopupFigureAnimation.play();
		}
	}


	}


	/* ------------------------------------------------*/
	/* ------------ ROI Animation 1 (Expo) ------------*/
	/* ------------------------------------------------*/
/*
	if ( $('html.section-b2b-events.page-index').length === 1 ||
		$('html.section-consumer-events.page-index').length === 1 ||
		$('html.section-l').length === 1 ||
		$('html.section-agencies.page-index').length === 1 ) {

		(function(){

			var analysisFigure = $('.figure','.roi-animation:first').css('position','relative');

			if ( analysisFigure.length > 0 ) {

				var analysisFigureChart = $('<div />',{'class':'animated-chart'});

				var expoBar1 = window.barGraphFactory({label: 'Global Tech Summit <span>2<sup>nd</sup> Jan</span>', firstValue: 90, secondValue: 60, secondValueColor: '#ff5441', xPos: 10});
				var expoBar2 = window.barGraphFactory({label: 'Eastern Tech Show <span>23<sup>rd</sup> Apr</span>', firstValue: 120, secondValue: 80, secondValueColor: '#ff5441', xPos: 120});
				var expoBar3 = window.barGraphFactory({label: 'Tech Live 2015 <span>31<sup>st</sup> May</span>', firstValue: 180, secondValue: 90, secondValueColor: '#ff5441', xPos: 230});
				var expoBar4 = window.barGraphFactory({label: 'Tokyo Tech Congress <span>10<sup>th</sup> Jun</span>', firstValue: 110, secondValue: 160, secondValueColor: '#ff5441', xPos: 340});
				var expoBar5 = window.barGraphFactory({label: 'Tech World 2015 <span>31<sup>st</sup> Jul</span>', firstValue: 100, secondValue: 200, secondValueColor: '#ff5441', xPos: 450});
				var expoBar6 = window.barGraphFactory({label: 'Techmate <span>7<sup>th</sup> Dec</span>', firstValue: 30, secondValue: 290, secondValueColor: '#ff5441', xPos: 560});

				var xAxis = $('<div />',{'class':'x-axis'}),
					xGridLine1 = xAxis.clone().css({top:'60px'}),
					xGridLine2 = xAxis.clone().css({top:'140px'}),
					xGridLine3 = xAxis.clone().css({top:'220px'}),
					xGridLine4 = xAxis.clone().css({top:'300px'});


				var qualifiedLeadsKey = $("<div />",{html: '<span></span> Qualified Leads','class':'qualified-leads-key'});
				var salesKey = $("<div />",{html: '<span></span> Completed Sales','class':'sales-key'});

				// Add to DOM
				analysisFigureChart
				.append(expoBar1.bar)
				.append(expoBar2.bar)
				.append(expoBar3.bar)
				.append(expoBar4.bar)
				.append(expoBar5.bar)
				.append(expoBar6.bar)
				.append(xAxis)
				.append(xGridLine1)
				.append(xGridLine2)
				.append(xGridLine3)
				.append(xGridLine4)
				.append(qualifiedLeadsKey)
				.append(salesKey);

				analysisFigure.append(analysisFigureChart);

				var analysisFigureAnimation = new TimelineLite({paused:true});

				analysisFigureAnimation
				.insert(TweenLite.from(xGridLine1, .75, {top:"370px", ease: Expo.easeOut}),0)
				.insert(TweenLite.from(xGridLine2, .75, {top:"370px", ease: Expo.easeOut}),.15)
				.insert(TweenLite.from(xGridLine3, .75, {top:"370px", ease: Expo.easeOut}),.30)
				.insert(TweenLite.from(xGridLine4, .75, {top:"370px", ease: Expo.easeOut}),.45)
				.insert(expoBar1.tl,.75)
				.insert(expoBar2.tl,1)
				.insert(expoBar3.tl,1.25)
				.insert(expoBar4.tl,1.5)
				.insert(expoBar5.tl,1.75)
				.insert(expoBar6.tl,2);

				analysisFigureAnimation.pause();

				// Play animations in view
				$(window).on('scroll.analysisFigureAnimation',function(){
					if ( analysisFigureChart.isOnScreen(0,0) ) {
						analysisFigureAnimation.play();
						//$(window).unbind('scroll.analysisFigureAnimation');
					} else {
						analysisFigureAnimation.restart();
					}
				});
			}
		})();
	}
*/
