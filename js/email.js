let send= document.getElementById("sendMail")
function mailToSend(recev, msg) {
    
    emailjs.init('TCly1R_Yk1Z3Unf3l');

    let localStorageData = JSON.parse(localStorage.getItem('your_localstorage_key'));

    let details = {
        to: recev,
        subject: "WYSIWYG",
        message: msg,
        reply_to: recev,
        hotel: "WYSIWYG",
        
        localStorageData: localStorageData
    };

    let sericeId = 'service_1fn3i1x';
    let templateId = "template_guxeeik";

    emailjs.send(sericeId, templateId, details)
        .then(function () {
            alert('Mail envoyé avec succès !');
        }, function (error) {
            alert('ÉCHEC de l\'envoi du mail...', error);
        });
}
let localStorageData = localStorage.getItem('edit');

send.addEventListener("click", ()=>{
    resultat.innerHTML=localStorageData
    let email = window.prompt("Entrez votre email")
    console.log(email);
    let msg = resultat.textContent
    mailToSend(email, msg) 
    console.log(msg); 
})