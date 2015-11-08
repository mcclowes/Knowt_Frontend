// ------------------------------------------------------------------------------ //
// © TrevsLads MMXV --------------------------------------------------------------- //
// ------------------------------------------------------------------------------ //
// ------------------------------------------------------------------------------ //

var homepage = new RegExp("\/index\.html");
var newDocumentPage = new RegExp("\/new\_document\.html");
var cvDocumentPage = new RegExp("\/cv\_document\.html");
var oldDocumentPage = new RegExp("\/old\_document\.html");
var oldDocument2Page = new RegExp("\/old\_document2\.html");
var onboardingDocumentPage = new RegExp("\/onboarding\_document\.html");

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
		setInterval( changeBackground , 5000);
	})();

	//Animate squares
	(function(){
		function createSquare() {
			var container = $('.container:first');
			var plusBox = $('.plus-box:first');
			//var plusBoxes = $('.plus-box');
			var newBox = $('<div class="plus-box">');

			var spawnSquareIndex = Math.floor(Math.random() * $('.plus-box', container[0]).length);
			var spawnSquare = $('.plus-box', container[0])[spawnSquareIndex];

			var directionVal = Math.random();
			$(newBox).css({top: $(spawnSquare).offset().top, left: $(spawnSquare).offset().left, opacity: 1, position: 'absolute'});
			/*if(directionVal < 0.25 && !(document.elementFromPoint($(spawnSquare).offset().top, $(spawnSquare).offset().left))){
				$(newBox).animate({top: "+=00", left: "+=100", opacity: 0.5 }, 500, function(){});
			} */
			/*if (plusBox.offset().top == $(newBox).offset().top + 100){
				console.log('Top: ' + plusBox.offset().top + ', Left: '+ plusBox.offset().left);
			}*/

			if((directionVal < 0.26) && (plusBox.offset().top !== $(newBox).offset().top + 100 ) && (plusBox.offset().left !== $(newBox).offset().left)){ //Up
				$(newBox).animate({top: "+=100", left: "+=00", opacity: 0.5 }, 500, function(){});
			} else if((directionVal < 0.74) && (plusBox.offset().top !== $(newBox).offset().top) && (plusBox.offset().left !== $(newBox).offset().left )){ //Left
				$(newBox).animate({top: "+=00", left: "-=100", opacity: 0.5 }, 500, function(){});
			} else if((plusBox.offset().top !== $(newBox).offset().top ) && (plusBox.offset().left !== $(newBox).offset().left)){ //Down
				$(newBox).animate({top: "-=100", left: "+=00", opacity: 0.5 }, 500, function(){});
			} else { //No free square
				createSquare();
			}
			container.append(newBox);
		}

		setInterval( createSquare , 1500);
	})();
}

if (newDocumentPage.test(window.location.pathname) || cvDocumentPage.test(window.location.pathname) || oldDocumentPage.test(window.location.pathname) || oldDocument2Page.test(window.location.pathname) || onboardingDocumentPage.test(window.location.pathname)) {
	(function(){
		//Make modules sortable
		function makeSortable() {
			var modules = $('.sortable-list');
			for (var i = 0; i < modules.length; i++) {
				$(modules[i]).sortable();
				//$(modules[i]).draggable();
			}
		}

		makeSortable();

		//Add text editing functionality
		function enableTextBoxes(){
			var textBoxes = $('.testbox');

			for (var i = 0; i < textBoxes.length; i++) {
			    $(textBoxes[i]).elastic();
			}
		}

		enableTextBoxes();

		//Creating new modules
		(function enableAddModule(){
			var addModuleButton = $('.add-module');
			addModuleButton.click(function(){
				$(this).replaceWith('<div class="module-grid"><div class="col-xs-2 module-button text-module-button">Text</div><div class="col-xs-2 module-button header-module-button">Header</div><div class="col-xs-2 module-button image-module-button">Image</div><div class="col-xs-2 module-button cancel-module-button">Cancel</div></div>' );

				//Text module
				var textModuleButtons = $('.module-button.text-module-button');
				textModuleButtons.click(function(){
					$(this).parent().replaceWith('<li class="module add-module"><img src="./img/plus-icon.png"></li><li class="module"><form role="form"><textarea class="testbox" placeholder="Start typing..."></textarea></form></div><li class="module add-module"><img src="./img/plus-icon.png"></li>' );
					makeSortable();
					enableTextBoxes();
					enableAddModule();
				});

				//Header
				var headerModuleButtons = $('.module-button.header-module-button');
				headerModuleButtons.click(function(){
					$(this).parent().replaceWith('<li class="module add-module"><img src="./img/plus-icon.png"></li><li class="module"><form role="form"><!--<label for="email">Header</label>--><input type="textbox" class="header-module" id="header" placeholder="Header"></form></li><li class="module add-module"><img src="./img/plus-icon.png"></li>' );
					makeSortable();
					enableTextBoxes();
					enableAddModule();
				});

				//Image
				var imageModuleButtons = $('.module-button.image-module-button');
				imageModuleButtons.click(function(){
					$(this).parent().replaceWith('<li class="module add-module"><img src="./img/plus-icon.png"></li><li class="module"><div class="module image empty">+ Drag an image to upload</div><li class="module add-module"><img src="./img/plus-icon.png"></li>' );

					var dropImages = $('.module.image.empty');
					for (var i = 0; i < dropImages.length; i++) {
						dropImages[i].addEventListener("dragover", function(e){e.preventDefault();}, true);
						dropImages[i].addEventListener("drop", function(e){
							e.preventDefault();
							if (e.dataTransfer.files && e.dataTransfer.files[0]) {
								e.preventDefault(); 
								if (e.dataTransfer.files && e.dataTransfer.files[0]) {

								    var reader = new FileReader();
						            reader.onload =  function(e) {
						            	var dropImages = $('.module.image.empty');
						            	$(dropImages).html('<img src="' + reader.result + '">');
						            	$(dropImages).removeClass('empty');
								    };
						            reader.readAsDataURL(e.dataTransfer.files[0]);
						        }
					        }
						}, true);
					}
					makeSortable();
					enableTextBoxes();
					enableAddModule();
				});

				//Bullet list

				//To Do list

				//Cancel
				var cancelModuleButtons = $('.module-button.cancel-module-button');
				cancelModuleButtons.click(function(){
					$(this).parent().replaceWith('<li class="row module add-module"></li>' );
					makeSortable();
					enableAddModule();
				});

			});
		})();
	})();
}
