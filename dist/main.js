
//get Elements

const registerForm = document.getElementById('register');
const usernameEl = document.getElementById('username');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const confirmPass = document.getElementById('confirmPassword');
const emailError = document.getElementById('emailErr');
const usernameError = document.getElementById('userErr');
const passwordError = document.getElementById('passError');
const confirmPassError = document.getElementById('confirmError');






 function redirect() {
    window.location.href="./signUp.html";
}

// check user name 
const checkUsername = (nameErr) => {

    let valid = false;
    const usernameVal = usernameEl.value.trim();
   

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    const min = 5,
        max = 15;


    if (!isRequired(usernameVal)) {
        const error = document.getElementById('userErr');
        error.textContent = nameErr? nameErr : 'Username can’t be empty.';
        } else if (!isBetween(usernameVal.length, min, max)) {
            const error = document.getElementById('emailErr');
            error.textContent =nameErr? nameErr : `Username must be between ${min} and ${max} characters.`;
    } else if (/^\d/.test(usernameVal)){
        const error = document.getElementById('userErr');
        error.textContent = nameErr? nameErr :'Username can’t start with digits.';
    }else if (/[0-9]+$/.test(usernameVal)){
        const error = document.getElementById('userErr');
        error.textContent = nameErr? nameErr : 'Username can’t end with digits.';
    }else if (specialChars.test(usernameVal)){
        const error = document.getElementById('userErr');
        error.textContent = nameErr? nameErr :'Username can’t contain symbols only letters and numbers are allowed.';
    }
    else {
        const error = document.getElementById('userErr');
        error.textContent = ' ';
                valid = true;
    }
    return valid;
};


const checkEmail = (emailValid) => {
    let valid = false;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const emailVal = emailEl.value.trim();
    if (!isRequired(emailVal)) {
        const error = document.getElementById('emailErr');
        error.textContent = emailValid? emailValid :'Email can’t be empty.';
           } else if (!re.test(emailVal)) {
        const error = document.getElementById('emailErr');
        error.textContent = emailValid? emailValid :'Email is not valid.';
    } else {
        const error = document.getElementById('emailErr');
        error.textContent = ' ';
                valid = true;
    }
    return valid;
};

const checkPassword = (passErr) => {
    let valid = false;
    const re = new RegExp("^(?=.{8,})");

    const passwordVal = passwordEl.value.trim();

    if (!isRequired(passwordVal)) {
        const error = document.getElementById('passError');
        error.textContent = passErr? passErr:'Password can’t be empty.';
    } else if (!re.test(passwordVal)) {
        const error = document.getElementById('passError');
        error.textContent = passErr? passErr:'Password must has at least 8 characters ';
    } else {
        const error = document.getElementById('passError');
        error.textContent = passErr? passErr :' ';
        valid = true;
    }

    return valid;
};
const checkConfirmPassword = (confirmErr) => {
    let valid = false;
    const confirmPassVal = confirmPass.value.trim();
    const passwordVal = passwordEl.value.trim();

    if (!isRequired(confirmPassVal)) {
        const error = document.getElementById('confirmError');
        error.textContent = confirmErr?confirmErr:'Please enter the password again';
    
    } else if (passwordVal !== confirmPassVal) {
        const error = document.getElementById('confirmError');
        error.textContent = confirmErr?confirmErr:'The password does not match';
      }else {
        const error = document.getElementById('confirmError');
        error.textContent = confirmErr?confirmErr:' ';
        valid = true;
    }

    return valid;
};
const isRequired = value => value === '' ? false : true;


const isBetween = (length, min, max) => length < min || length > max ? false : true;


// register form validation
registerForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const username = usernameEl.value;
    const email = emailEl.value;
    const password = passwordEl.value;
    const  password_confirmation  = confirmPass.value; 
      const message = {
        username : username,
         email: email,
          password: password,
           password_confirmation: password_confirmation,
      }
   fetch('https://goldblv.com/api/hiring/tasks/register', {
    method: 'POST',
     headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
   
  })
    .then((res) =>{ 
            return res.text();              
    }
     ).then((response)=>{
        const data = JSON.parse(response);
             localStorage.setItem("email", email);
             if (data.errors){
                checkUsername( data.errors.username);
                 checkEmail(data.errors.email);
                checkPassword(data.errors.password[0]);
                 checkConfirmPassword(data.errors.password[1]);
            } else {
                 window.location.href="./login.html" ;
              
             }
           return response; 
     }
   ).catch(error => console.log(error));
   
});




