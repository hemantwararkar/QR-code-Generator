const qrContainer = document.querySelector('#qr-code');
const qrText = document.querySelector('.text');
const download = document.querySelector('.download');

qrText.addEventListener("input", handleQRText);

const defaultURL =  "https://www.youtube.com/@NinjasHub";
let text = defaultURL;

function handleQRText(e){
    const value = e.target.value;
    text = value || defaultURL;
    generateQRCode();
}

async function generateQRCode(){
    qrContainer.innerHTML = "";
    new QRCode("qr-code", {
        text,
        height: 400,
        width: 400,
        colorLight: '#fff',
        colorDark: '#000',
    });
    download.href = await resolveDataURL();
}

function resolveDataURL(){
    return new Promise((resolve) => {
        setTimeout(() => {
            const img = document.querySelector('#qr-code img');
            if(img.currentSrc){
                resolve(img.currentSrc);
                return;
            }
            const canvas = document.querySelector("canvas");
            resolve(canvas.toDataURL());
        }, 50);
    });
}

generateQRCode();