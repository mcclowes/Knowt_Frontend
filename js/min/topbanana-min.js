var homepage=new RegExp("/index.html"),documentPage=new RegExp("/new_document.html");homepage.test(window.location.pathname)&&(!function(){function e(){var e=["#0b1b2d","#0d2e11","gray"],o=e[Math.floor(Math.random()*e.length)];document.body.style.backgroundColor=o,$(".plus-ver:first")[0].style.backgroundColor=o,$(".plus-hor:first")[0].style.backgroundColor=o}$(document).ready(e())}(),function(){function e(){var e=$(".container:first"),o=$(".plus-box:first"),t=$('<div class="plus-box">');$(t).css({top:$(o[0]).offset().top+20,left:$(o[0]).offset().left+20,opacity:.5,position:"absolute"}),e.append(t)}setInterval(e(),3e3)}()),documentPage.test(window.location.pathname)&&($(function(){var e=$(".module");console.log(e);for(var o=0;o<e.length;o++)console.log($(e[o])),$(e)[o].sortable()}),function(){function e(){n.style.height="auto",n.style.height=n.scrollHeight+"px"}function o(){window.setTimeout(e,0)}for(var t=$(".testbox"),l=0;l<t.length;l++){var a;a=window.attachEvent?function(e,o,t){e.attachEvent("on"+o,t)}:function(e,o,t){e.addEventListener(o,t,!1)};var n=t[l];a(n,"change",e),a(n,"cut",o),a(n,"paste",o),a(n,"drop",o),a(n,"keydown",o),n.focus(),n.select(),e()}}(),function(){var e=$(".add-module");e.click(function(){console.log("clicked "+this),$(this).replaceWith('<div class="module-grid"><div class="col-xs-3 module-button text-module">Text</div><div class="col-xs-3 module-button image-module">Image</div><div class="col-xs-3 module-button">Chart</div><div class="col-xs-3 module-button">Chart</div></div>');var e=$(".module-button.text-module");e.click(function(){console.log("Made text "+this),$(this).parent().replaceWith('<div class="row module add-module"><img src="./img/plus-icon.png"></div><div class="row module"><form role="form"><textarea class="testbox" placeholder="Start typing..."></textarea></form></div><div class="row module add-module"><img src="./img/plus-icon.png"></div>')});var o=$(".module-button.image-module");o.click(function(){$(this).parent().replaceWith('<div class="row module add-module"><img src="./img/plus-icon.png"></div><div class="row module"><div class="module image empty">+ Drag an image to upload</div><div class="row module add-module"><img src="./img/plus-icon.png"></div>'),console.log("Made image "+this);var e=$(".module.image.empty");console.log(e);for(var o=0;o<e.length;o++)console.log(e[o]),e[o].addEventListener("dragover",function(e){e.preventDefault()},!0),e[o].addEventListener("drop",function(e){if(e.preventDefault(),e.dataTransfer.files&&e.dataTransfer.files[0]){console.log("got here");var o=new FileReader;o.onload=function(){o.readAsDataURL(e.dataTransfer.files[0]),console.log(reader),console.log(reader.result),$(this).append('<img src="'+reader.result+'">'),$(this).removeClass("empty")}}},!0)})})}());