////Contains the control Flow for the program
//Runs Function on window load
window.onload = function (){
    //call function to include the header and footer
    w3.includeHTML(); //this calls the w3 function to inject the header.html and footer.html
    window.onclick = function (){ //listens for a click then calls the accessibility buttons to see if selected
        accessibilityButtons()
    }
    window.onscroll = function () { //listens for scroll then calls the scrollbar function
        progressBarScroll();
        buttonShow();
      };
    selectFormOption()

    };
