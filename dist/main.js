
//get Elements

const registerForm = document.getElementById('register');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPass = document.getElementById('confirmPassword');

// main page redirect to signup page
 function redirect() {
    window.location.href="./signUp.html";
}

// check user name 
const checkUsername = () => {

    let valid = false;
    const usernameVal = username.value.trim();
   

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const min = 5,
        max = 15;


    if (!isRequired(usernameVal)) {
        showError(username, 'Username can’t be empty.');
    } else if (!isBetween(usernameVal.length, min, max)) {
        showError(username, `Username must be between ${min} and ${max} characters.`)
    } else if (/^\d/.test(usernameVal)){
        showError(username, 'Username can’t start with digits.');
    }else if (/[0-9]+$/.test(usernameVal)){
        showError(username, 'Username can’t end with digits.');
    }else if (specialChars.test(usernameVal)){
        showError(username, 'Username can’t contain symbols only letters and numbers are allowed.');
    }
    else {
        showSuccess (username);
        valid = true;
    }
    return valid;
};


const checkEmail = () => {
    let valid = false;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailVal = email.value.trim();
    if (!isRequired(emailVal)) {
        showError(email, 'Email can’t be empty.');
    } else if (!re.test(emailVal)) {
        showError(email, 'Email is not valid.')
    } else {
        showSuccess (email);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    const re = new RegExp("^(?=.{8,})");

    const passwordVal = password.value.trim();

    if (!isRequired(passwordVal)) {
        showError(password, 'Password can’t be empty.');
    } else if (!re.test(passwordVal)) {
        showError(password, 'Password must has at least 8 characters ');
    } else {
        showSuccess(password);
        valid = true;
    }

    return valid;
};
const checkConfirmPassword = () => {
    let valid = false;
    const confirmPassVal = confirmPass.value.trim();
    const passwordVal = password.value.trim();

    if (!isRequired(confirmPassVal)) {
        showError(confirmPass, 'Please enter the password again');
    } else if (passwordVal !== confirmPassVal) {
        showError(confirmPass, 'The password does not match');
    }else {
        showSuccess(confirmPass);
        valid = true;
    }

    return valid;
};
const isRequired = value => value === '' ? false : true;


const isBetween = (length, min, max) => length < min || length > max ? false : true;


const showError = (input, message) => {
    const formField = input.parentElement;

    const error = formField.querySelector('small');
    error.textContent = message;
};

function showSuccess (input) {
    const formField = input.parentElement;
    const error = formField.querySelector('small');
    error.textContent = ' ';
}

// register form validation
registerForm.addEventListener('submit', (e)=>{
    const usernameVal = username.value;
    const emailVal = email.value;
    const passwordVal = password.value;
    const confirmPassVal = confirmPass.value;

//  const body = {
//     usernameVal,emailVal,passwordVal,confirmPassVal
//  }
   e.preventDefault();
   checkUsername();
   checkEmail();
   checkPassword();
   checkConfirmPassword();
   fetch('https://goldblv.com/api/hiring/tasks/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        usernameVal, emailVal, passwordVal, confirmPassVal,
      }),

  })
    .then((response) => response.json()).then((data) => {
        window.location.href="./login.html";

        return data;
      }).catch((err) => {
        console.log(err,555);
      });;
   
});


