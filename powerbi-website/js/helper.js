//Underline Linked Text and high contrast for accessibility
function accessibilityButtons(){
    document.getElementById('linkUnderline').onclick = function(){
        document.body.classList.toggle('underline');}; //looks for button click then toggles the underline css element
    document.getElementById('toggleColour').onclick = function(){
        document.body.classList.toggle('highcontrast');//looks for the button click then toggles the high contrast css elements which assigns different set of colour vars
      };
}

//Scroll Progress bar
function progressBarScroll() {
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop, //gets the number of pixels scrolled on the body or the total on the page where body scroll is unavailable
        height = document.documentElement.scrollHeight - document.documentElement.clientHeight, //the total height of the window minus any padding height
        scrolled = (winScroll / height) * 100; //calculates the % scrolled
    document.getElementById("progressBar").style.width = scrolled + "%"; //sets the width of the green bar
  }

//Below are functions for each service element linking help
//topics to specific selection in the contact form

function selectElement(id, valueToSelect) {//set form value function
    let element = document.getElementById(id);
    element.value = valueToSelect;
}

function selectFormOption(){ //look in the url string for selection option then select form value
    let options = ["Training-Option","Dev-Option","ETL-Option","Modification-Option"] //all option values - this could likely be done dynamically via the dom
    for (let i = 0; i < options.length; i++) { //loop through options
        if(window.location.href.includes(options[i])) { //check the url
            selectElement('helpformselect', options[i]); //set selection
        }
        else{} //else use Join-Option set in default html
    }
}

//w3 library function that takes html and puts it into other
//HTML using <div w3-include-html="<filename>.html"></div>
//I did not write this function
 "use strict";
var w3 = {};
w3.includeHTML = function(cb) {
    var z, i, elmnt, file, xhttp;
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            elmnt.removeAttribute("w3-include-html");
            w3.includeHTML(cb);
            }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
        }
    }
    if (cb) cb();
    };

//Button to the top of the page from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
//Get the button:
mybutton = document.getElementById("myBtn");

function buttonShow() {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) { //if 40 pixels from the top
    mybutton.style.display = "block"; //then display as block
  } else {
    mybutton.style.display = "none"; //else hide the button
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}