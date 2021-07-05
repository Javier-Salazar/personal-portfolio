const form = document.getElementById('form');
const inputs = document.querySelectorAll('#form input');
const options = document.getElementById('options');
const politics = document.getElementById('check');

const regularExpressions = {
    name: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, //Letras (pueden llevar a dentro), y espacios.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
}

const fields = {
    name: false,
    mail: false,
    options: false,
    name: false
}

const validForm = (e) => {
    switch(e.target.name){
        case 'name':
            validInput(regularExpressions.name, e.target, 'name');
            break;
        case 'mail':
            validInput(regularExpressions.email, e.target, 'mail');
            break;
    }
}

const validInput = (expression, input, field) => {
    if(input.value == ''){
        document.querySelector(`.form-control.${field}`).classList.remove('invalid');
        document.querySelector(`.invalid-label.${field}`).classList.remove('active');
        fields[field] = false;
    }
    else if(expression.test(input.value)){
        document.querySelector(`.form-control.${field}`).classList.remove('invalid');
        document.querySelector(`.invalid-label.${field}`).classList.remove('active');
        fields[field] = true;
    }
    else{
        document.querySelector(`.form-control.${field}`).classList.add('invalid');
        document.querySelector(`.invalid-label.${field}`).classList.add('active');
        fields[field] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validForm);
    input.addEventListener('blur', validForm);
});

options.addEventListener('change', () => {
    if(options.value == 0 || options.value == ''){
        fields['options'] = false;
    }
    else{
        fields['options'] = true;
    }
});

politics.addEventListener('change', () => {
    if(fields.name && fields.mail && fields.options && politics.checked){
        document.getElementById('submit').classList.add('allowed');
    }
    else{
        document.getElementById('submit').classList.remove('allowed');
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if(fields.name && fields.mail && fields.options && politics.checked){
        let xhr = new XMLHttpRequest(); // create a new XML objet.
        xhr.open("POST", "mail.php", true); // sendig post request to mail.php.
        xhr.onload = () => {
            if(xhr.readyState == 4 && xhr.status == 200){
                let response = xhr.response;
                if(response.indexOf("Your mail fail to send.") != -1){
                    document.querySelector('.submit').classList.add('error');
                    document.querySelector('.submit').innerHTML = 'Error al enviar el correo.'
                }
                else{
                    form.reset();
                    document.querySelector('.submit').classList.remove('error');
                    document.querySelector('.submit').classList.add('success');
                    document.querySelector('.submit').innerHTML = 'El correo se ha enviado correctamente.'

                    setTimeout(() => {
                        document.querySelector('.submit').classList.remove('allowed');
                        document.querySelector('.submit').classList.remove('success');
                    }, 5000);
                }
            }
        }
        let formData = new FormData();
        xhr.send(formData);

        // form.reset();
        // document.querySelector('.submit').classList.remove('error');
        // document.querySelector('.submit').classList.add('success');
        // document.querySelector('.submit').innerHTML = 'El correo se ha enviado correctamente.'

        // setTimeout(() => {
        //     document.querySelector('.submit').classList.remove('allowed');
        //     document.querySelector('.submit').classList.remove('success');
        // }, 5000);
    }
    else{
        document.querySelector('.submit').classList.add('error');
        document.querySelector('.submit').innerHTML = 'Error al enviar el correo.'
    }
});