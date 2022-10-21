// шифрование по SHA256
const input2 = document.querySelector('.solution-input__sha');
const result2 = document.querySelector('.result-2');
const solutionBtn1 = document.querySelector('.solution-btn1');

solutionBtn1.addEventListener('click', () => {
    const encrypted = CryptoJS.SHA256(input2.value.toString());
    result2.innerHTML = encrypted;
})

// шифрование по AES
const input4 = document.querySelector('.solution-input__aes-in');
const inputInSecret = document.querySelector('.solution-input__aes-in-secret-word');
const result4 = document.querySelector('.result-4');
const solutionBtn2 = document.querySelector('.solution-btn2');

solutionBtn2.addEventListener('click', () => {
    const ciphertext = CryptoJS.AES.encrypt(input4.value, inputInSecret.value).toString();
    result4.innerHTML = ciphertext;
})

// шифрование по AES
const input5 = document.querySelector('.solution-input__aes-out');
const inputOutSecret = document.querySelector('.solution-input__aes-out-secret-word');
const result5 = document.querySelector('.result-5');
const solutionBtn3 = document.querySelector('.solution-btn3');

solutionBtn3.addEventListener('click', () => {
    const bytes = CryptoJS.AES.decrypt(input5.value, inputOutSecret.value).toString(CryptoJS.enc.Utf8);
    result5.innerHTML = bytes;
})

// iframe
const iframe = document.querySelector('.app-iframe');
// отображение всех приложений из json файла
async function appsJson() {
    let response = await fetch('apps.json');
    let jsonApps;
    if (response.ok) {
        jsonApps = await response.json();
    }
    const apps = document.querySelector('.apps')
    jsonApps.forEach(app => {
        apps.insertAdjacentHTML('beforeend', `
            <li class="app" data-url="${app['url']}">
                <img src="${app['src']}" alt="${app['alt']}">
            </li>
        `)
    });

    // открытие приложения в iframe
    const appAll = document.querySelectorAll('.app');

    appAll.forEach(app => {
        app.addEventListener('click', () => {
            const dataApp = app.getAttribute('data-url');
            iframe.classList.add('app-iframe-active');

            iframe.insertAdjacentHTML('afterbegin', `
            <iframe src="${dataApp}" frameborder="0"></iframe>
            `)
        })
    })
}
appsJson()

// iframe-btn
const iframeBtn = document.querySelector('.app-iframe-btn');

iframeBtn.addEventListener('click', () => {
    iframe.classList.remove('app-iframe-active');
    iframe.querySelector('iframe').remove();
})
