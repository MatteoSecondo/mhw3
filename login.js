//Otp Authenticator api

function execute(event)
{
    event.preventDefault();

    const span = document.createElement('span');
    const access = document.querySelector('#access');

    if (x === 1)
        access.removeChild(access.firstElementChild);
        
    const code_input = document.querySelector('#code');
    const code_value = code_input.value;

    //3-validate
    const data2 = 'secret='+ secret + '&code=' + code_value;

    const xhr2 = new XMLHttpRequest();
    xhr2.withCredentials = true;

    xhr2.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) 
        {
            if (this.responseText === 'False')
                span.textContent = 'Accesso negato';
            else
                span.textContent = 'Accesso consentito';

            span.classList.add('access');
            access.appendChild(span);
            x = 1;
                
        }
    });

    xhr2.open("POST", "https://otp-authenticator.p.rapidapi.com/validate/");
    xhr2.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhr2.setRequestHeader("X-RapidAPI-Key", "87aa4bdb14msh8ba5475520ed7f6p16b075jsn6aa6bfa6f6e2");
    xhr2.setRequestHeader("X-RapidAPI-Host", "otp-authenticator.p.rapidapi.com");

    xhr2.send(data2);
}

function generate(event)
{
    event.preventDefault();

    window.open(authentication_url, "_blank");
}



let x = 0;


//1-ottengo il secret
let secret;

const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
        secret = this.responseText;
	}
});

xhr.open("POST", "https://otp-authenticator.p.rapidapi.com/new_v2/");
xhr.setRequestHeader("X-RapidAPI-Key", "87aa4bdb14msh8ba5475520ed7f6p16b075jsn6aa6bfa6f6e2");
xhr.setRequestHeader("X-RapidAPI-Host", "otp-authenticator.p.rapidapi.com");

xhr.send(data);

//2-enroll
let authentication_url;

const data1 = 'secret=' + secret + ' &account=MS&issuer=WebProgramming/mhw3';

const xhr1 = new XMLHttpRequest();
xhr1.withCredentials = true;

xhr1.addEventListener("readystatechange", function () {
	if (this.readyState === this.DONE) {
        authentication_url = this.responseText;
	}
});

xhr1.open("POST", "https://otp-authenticator.p.rapidapi.com/enroll/");
xhr1.setRequestHeader("content-type", "application/x-www-form-urlencoded");
xhr1.setRequestHeader("X-RapidAPI-Key", "87aa4bdb14msh8ba5475520ed7f6p16b075jsn6aa6bfa6f6e2");
xhr1.setRequestHeader("X-RapidAPI-Host", "otp-authenticator.p.rapidapi.com");

xhr1.send(data1);

//aggiungo i listener
const generate_qr_code = document.querySelector('#generate');
generate_qr_code.addEventListener('submit', generate);

const send_code = document.querySelector('#send');
send_code.addEventListener('submit', execute);

