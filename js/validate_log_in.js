document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {

        if(!validateForm()){
            console.log('Form not valid');
            event.preventDefault();
        }else{
            console.log('Form valid');
            //submit form
        }
        
    })
});

const validateForm = () => {
    let isEmailValid = validateEmail('email', 'Email not valid');
    let isFieldValid = validateField('password', 'Password is required');
    if(isEmailValid && isFieldValid){
        return true;
    }else{
        return false;
    }
}


const validateField = (fieldId, errorMessage) => {
    const field = document.getElementById(fieldId);
    const value = field.value.trim(); // Remove leading and trailing white spaces

    if (value === '') {
        setErrorFor(field, errorMessage);
        return false;
        
    }else{
        setSuccessFor(field);
        return true;
    }
}

const validateEmail = (emailId, errorMessage) => {
    const email = document.getElementById(emailId);
    const emailValue = email.value.trim();

    if (emailValue === '') {
        setErrorFor(email, 'Email is required');
        return false;

    }else if(!isEmail(emailValue)){
        setErrorFor(email, errorMessage);
        return false;

    }else{
        setSuccessFor(email);
        return true;
    }
}

const isEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

//error message
const setErrorFor = (input, message) => {
    const formControl = input.closest('div');
    
    const errorText = formControl.querySelector('.error-message');
    errorText.innerText = message;
    input.style.border = '2px solid var(--lightRed-color)';
}

const setSuccessFor = (input) => {
    const formControl = input.closest('div');
    const errorText = formControl.querySelector('.error-message');
    errorText.innerText = '';
    input.style.border = '2px solid green';
}