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