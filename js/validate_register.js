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
    let isNameValid = validateField('name', 'Name is required');
    let isEmailValid = validateEmail('email', 'Email not valid');
    let isFieldValid = validatePassword('password', 'Password is required');

    if(isEmailValid && isFieldValid && isNameValid){
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

const validatePassword = (passwordId, errorMessage) => {
    const password = document.getElementById(passwordId);
    const reapeatPassword = document.getElementById('repeat-pass');
    const passwordValue = password.value.trim();

    if (passwordValue === '') {
        setErrorFor(password, 'Password is required');
        return false;

    } 
    
    if(passwordValue.length < 6){
        setErrorFor(password, "Password must be at least 6 characters long");
        return false;
    }

    if(passwordValue !== reapeatPassword.value.trim()){
        setErrorFor(password, 'Passwords do not match');
        return false;
    
    }
    
    setSuccessFor(password);
    return true;
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