var homepage=new RegExp("/index.html"),documentPage=new RegExp("/new_document.html");homepage.test(window.location.pathname)&&(!function(){var o=$(".column:first");o.css("opacity",0),$(o).animate({opacity:1},2e3)}(),function(){function o(){var o=["#0b1b2d","#0d2e11","#b31217","gray"],e=o[Math.floor(Math.random()*o.length)];$(document.body).animate({backgroundColor:e},2500),$(".plus-ver:first").animate({backgroundColor:e},2500),$(".plus-hor:first").animate({backgroundColor:e},2500)}$(document).ready(o())}(),function(){function o(){var e=$(".container:first"),t=$(".plus-box:first"),l=$(".plus-box"),a=$('<div class="plus-box">'),n=Math.floor(Math.random()*$(".plus-box",e[0]).length),s=$(".plus-box",e[0])[n],i=Math.random();$(a).css({top:$(s).offset().top,left:$(s).offset().left,opacity:1,position:"absolute"}),console.log("Top: "+t.offset().top+", Left: "+t.offset().left),.34>i&&t.offset().top!=$(a).offset().top+100&&t.offset().left!=$(a).offset().left?(console.log("Did: Top: "+(t.offset().top+100)+", Left: "+t.offset().left),$(a).animate({top:"+=100",left:"+=00",opacity:.5},500,function(){})):.66>i&&t.offset().top!=$(a).offset().top&&t.offset().left!=$(a).offset().left-100?(console.log("Did: Top: "+t.offset().top+", Left: "+(t.offset().left-100)),$(a).animate({top:"+=00",left:"-=100",opacity:.5},500,function(){})):t.offset().top!=$(a).offset().top-100&&t.offset().left!=$(a).offset().left?(console.log("Did: Top: "+(t.offset().top-100)+", Left: "+t.offset().left),$(a).animate({top:"-=100",left:"+=00",opacity:.5},500,function(){})):(console.log("Else"),o()),e.append(a)}setInterval(o,3e3)}()),documentPage.test(window.location.pathname)&&!function(){function o(){var o=$("ul");console.log(o);for(var e=0;e<o.length;e++)console.log($(o[e])),$(o[e]).sortable()}function e(){function o(){n.style.height="auto",n.style.height=n.scrollHeight+"px"}function e(){window.setTimeout(o,0)}for(var t=$(".testbox"),l=0;l<t.length;l++){var a;a=window.attachEvent?function(o,e,t){o.attachEvent("on"+e,t)}:function(o,e,t){o.addEventListener(e,t,!1)};var n=t[l];a(n,"change",o),a(n,"cut",e),a(n,"paste",e),a(n,"drop",e),a(n,"keydown",e),n.focus(),n.select(),o()}}o(),e(),function t(){var e=$(".add-module");e.click(function(){$(this).replaceWith('<div class="module-grid"><div class="col-xs-2 module-button text-module">Text</div><div class="col-xs-2 module-button image-module">Image</div></div>');var e=$(".module-button.text-module");e.click(function(){console.log("Made text "+this),$(this).parent().replaceWith('<li class="row module add-module"><img src="./img/plus-icon.png"></li><li class="row module"><form role="form"><textarea class="testbox" placeholder="Start typing..."></textarea></form></div><li class="row module add-module"><img src="./img/plus-icon.png"></li>'),o(),t()});var l=$(".module-button.image-module");l.click(function(){$(this).parent().replaceWith('<li class="row module add-module"><img src="./img/plus-icon.png"></li><li class="row module"><div class="module image empty">+ Drag an image to upload</div><li class="row module add-module"><img src="./img/plus-icon.png"></li>'),console.log("Made image "+this);var e=$(".module.image.empty");console.log(e);for(var l=0;l<e.length;l++)console.log(e[l]),e[l].addEventListener("dragover",function(o){o.preventDefault()},!0),e[l].addEventListener("drop",function(o){if(o.preventDefault(),o.dataTransfer.files&&o.dataTransfer.files[0]){console.log("got here");var e=new FileReader;e.onload=function(){e.readAsDataURL(o.dataTransfer.files[0]),console.log(reader),console.log(reader.result),$(this).append('<img src="'+reader.result+'">'),$(this).removeClass("empty")}}},!0);o(),t()})})}()}();