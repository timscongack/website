
  const name = document.getElementById('name'); //assigns name to var
  const email = document.getElementById('email');  //assigns email to var
  const message = document.getElementById('message');  //assigns message to var
  const contactForm = document.getElementById('contact-form');  //assigns form to var
  const errorElement = document.getElementById('error');  //assigns error message to var
  const successMsg = document.getElementById('success-msg');  //assigns succes message to var
  const submitBtn = document.getElementById('submit'); //submit bar

function joinContactForm() { //this is the validation function for the contact form
  const validate = (e) => { //use of ES6 function for form logic
    e.preventDefault();

    if (!emailIsValid(email.value)) {
      errorElement.innerHTML = 'Please enter a valid email address.';  //is there are value
      return false; //exits
    }

    if (!(email.value.includes('.') && (email.value.includes('@')))) { //if email contains . and @ if not the message
      errorElement.innerHTML = 'Please enter a valid email address.';
      return false; //exits
    }
    return alert ("Thank you for reaching out - one of our community members will get back to you shortly!");;

  }
//This tutorial assisted in validation https://tutorial.eyehunts.com/js/javascript-contact-form-validation-in-html-example-code/
  const emailIsValid = email => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); //ES6 inline function for validation checking string order
  }

  submitBtn.addEventListener('click', validate); //event listener to call validate on button click
}
joinContactForm();