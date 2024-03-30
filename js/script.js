import { MyWysiwyg } from '../modules/my_wysiwyg.js';

const bold = document.getElementById("bold");
const italic = document.getElementById("italic");
const underline = document.getElementById("underline");
const strike = document.getElementById("strikeThrough");
const link = document.getElementById("link");
const size = document.getElementById("size");
const color = document.getElementById("color");
const bg = document.getElementById("bgcolor");
const alignLeft = document.getElementById("alignLeft");
const alignRight = document.getElementById("alignRight");
const alignCenter = document.getElementById("alignCenter");
const alignJustify = document.getElementById("alignJustify");
const showCode = document.getElementById("showCode");
const myTextarea = document.getElementById("myTextarea");
const resultat = document.getElementById("resultat");
const saveCode = document.getElementById("saveCode")
const showSave = document.getElementById("showSave")
const insertMapButton = document.getElementById('insertMap');
const background = document.getElementById("labbg")
const col = document.getElementById("labcol")
const videoButton = document.getElementById('insertVideo');
const imgInputlab = document.getElementById("imglab");


let mw = new MyWysiwyg(myTextarea, {
    more: ["saveCode", "showSave", "insertMapButton", "resultat", "showCode", "image", "video"],
    color: ["background", "color"],
    align: ["start", "center", "justify", "end"]
});


console.log(mw.options);



myTextarea.addEventListener("input", convertBBCtoHTML);


bold.addEventListener("click", () => {

    let selection = window.getSelection();
    makeTag(selection, "[b]", "[/b]")


});

italic.addEventListener("click", () => {

    let selection = window.getSelection();
    makeTag(selection, "[i]", "[/i]")
})

underline.addEventListener("click", () => {

    let selection = window.getSelection();
    makeTag(selection, "[u]", "[/u]")
})

strike.addEventListener("click", () => {

    let selection = window.getSelection();
    makeTag(selection, "[s]", "[/s]")
})

link.addEventListener("click", () => {

    let selection = window.getSelection();
    let url = window.prompt("Quel est l'url de votre lien ?");
    let regex = /^(?:(?:https?|ftp):\/\/|www\.|\/\/)[^\s\/$.?#].[^\s]*\.[^\s\/$.?#]*[^\s\/$.?#]\S*$/i;
    let isUrl = regex.test(url);
    console.log(isUrl);
    if (isUrl) {

        if (url.trim() != '') {
            let start = `[a href = '${url}']`
            makeTag(selection, start, "[/a]")
        }
    } else {
        alert("Ceci n'est pas un lien")
    }
})

alignLeft.addEventListener("click", () => {
    alignLeft.classList.toggle('active')
    alignRight.classList.remove('active')
    alignCenter.classList.remove('active')
    alignJustify.classList.remove('active')
    let selection = window.getSelection();
    let start = `[span style="display:grid;width:100%;text-align:left;"]`
    makeTag(selection, start, "[/span]")
})

alignRight.addEventListener("click", () => {
    alignRight.classList.toggle('active')
    alignLeft.classList.remove('active')
    alignCenter.classList.remove('active')
    alignJustify.classList.remove('active')
    let selection = window.getSelection();
    let start = `[span style="display:grid;width:100%;text-align:right;"]`
    makeTag(selection, start, "[/span]")
})

alignCenter.addEventListener("click", () => {
    alignCenter.classList.toggle('active')
    alignRight.classList.remove('active')
    alignLeft.classList.remove('active')
    alignJustify.classList.remove('active')
    let selection = window.getSelection();
    let start = `[span style="display:grid;width:100%;text-align:center;"]`
    makeTag(selection, start, "[/span]")
})

alignJustify.addEventListener("click", () => {
    alignJustify.classList.toggle('active')
    alignRight.classList.remove('active')
    alignCenter.classList.remove('active')
    alignLeft.classList.remove('active')
    let selection = window.getSelection();
    let start = `[span style="display:grid;width:100%;text-align:justify;"]`
    makeTag(selection, start, "[/span]")
})

color.addEventListener("change", () => {
    let selection = window.getSelection();
    let start = `[span style="color: ${color.value}"]`
    makeTag(selection, start, "[/span]")
});

bg.addEventListener("change", () => {
    let selection = window.getSelection();
    let start = `[span style="background: ${bg.value};"]`
    makeTag(selection, start, "[/span]");
});

size.addEventListener("change", () => {
    let selection = window.getSelection();
    let start = `[span style="font-size: ${size.value}px;"]`
    makeTag(selection, start, "[/span]");
});

showCode.addEventListener("click", () => {
    showCode.classList.toggle('active');
    let verif = showCode.classList.contains("active")

    if (verif) {
        convertBBCtoHTML("code")

    } else {
        convertBBCtoHTML("html")
    }

});


saveCode.addEventListener("click", () => {

    let html = resultat.innerHTML
    let bbc = myTextarea.textContent
    console.log(resultat.textContent);
    localStorage.setItem("edit", html);
    localStorage.setItem("bbc", bbc);

})

showSave.addEventListener("click", () => {

    let edit = localStorage.getItem("edit")
    let bbc = localStorage.getItem("bbc")

    resultat.innerHTML = edit
    myTextarea.innerHTML = bbc
})


function convertBBCtoHTML(code = "html") {
    let bbcContent = myTextarea.innerHTML;


    let formattedContent = bbcContent
        .replace(/\[b\]/g, '<b>')
        .replace(/\[\/b\]/g, '</b>')
        .replace(/\[i\]/g, '<i>')
        .replace(/\[\/i\]/g, '</i>')
        .replace(/\[u\]/g, '<u>')
        .replace(/\[\/u\]/g, '</u>')
        .replace(/\[s\]/g, '<s>')
        .replace(/\[\/s\]/g, '</s>')
        .replace(/\[a\shref\s*=\s*'(.*?)'\](.*?)\[\/a\]/g, '<a href="$1">$2</a>')
        .replace(/\[span\sstyle="(.*?)"\](.*?)\[\/span\]/g, '<span style="$1">$2</span>')
        .replace(/\[span\sstyle="(.*?)"\](.*?)\[\/span\]/g, '<span style="$1">$2</span>')
        .replace(/\[span\sstyle="(.*?)"\](.*?)\[\/span\]/g, '<span style="$1">$2</span>')
        .replace(/\[span\sstyle="(.*?)"\](.*?)\[\/span\]/g, '<span style="$1">$2</span>')
        .replace(/\[span\sstyle="(.*?)"\](.*?)\[\/span\]/g, '<span style="$1">$2</span>')
        .replace(/\[span\sstyle="(.*?)"\](.*?)\[\/span\]/g, '<span style="$1">$2</span>')
        .replace(/\[span\sstyle="(.*?)"\](.*?)\[\/span\]/g, '<span style="$1">$2</span>')
        .replace(/\[span\sstyle="(.*?)"\](.*?)\[\/span\]/g, '<span style="$1">$2</span>')
        .replace(/\[span\sstyle="(.*?)"\](.*?)\[\/span\]/g, '<span style="$1">$2</span>')
        .replace(/\[span\sstyle="(.*?)"\](.*?)\[\/span\]/g, '<span style="$1">$2</span>')
        .replace(/\[span\sstyle="(.*?)"\](.*?)\[\/span\]/g, '<span style="$1">$2</span>')
        .replace(/\[span\sstyle="(.*?)"\](.*?)\[\/span\]/g, '<span style="$1">$2</span>');

    if (code == "code") {
        resultat.textContent = formattedContent;
    } else {
        resultat.innerHTML = formattedContent;
    }

}





function makeTag(selection, startTag, endTag) {

    if (selection.toString() !== '') {
        let range = selection.getRangeAt(0);
        let startNode = document.createTextNode(startTag);
        let endNode = document.createTextNode(endTag);
        range.insertNode(startNode);
        range.collapse(false);
        range.insertNode(endNode);
    } else {
        let cursorNode = window.getSelection().anchorNode;
        let cursorPosition = window.getSelection().anchorOffset;
        let textBeforeCursor = cursorNode.textContent.substring(0, cursorPosition);
        let textAfterCursor = cursorNode.textContent.substring(cursorPosition);

        let startNode = document.createTextNode(startTag);
        let endNode = document.createTextNode(endTag);

        let range = window.getSelection().getRangeAt(0);
        range.deleteContents();
        range.insertNode(startNode);
        range.collapse(false);
        range.insertNode(endNode);

        range.setStartAfter(startNode);
        range.setEndBefore(endNode);
    }
    convertBBCtoHTML("html")

}

function uploadImage() {
    const imgInput = document.getElementById("img");
    imgInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgData = e.target.result;
                const imgElement = document.createElement('img');
                imgElement.src = imgData;
                imgElement.style.maxWidth = "500px";
                imgElement.style.maxHeight = "300px";
                myTextarea.appendChild(imgElement);
                makeTag("", "", "");
            };
            reader.readAsDataURL(file);
        }
    });
}


function insertVideo() {

    videoButton.addEventListener('click', function () {
        const url = prompt('Entrez l\'URL de la vidéo YouTube ou Dailymotion :');
        if (url) {
            const videoEmbed = generateVideoEmbed(url);
            if (videoEmbed) {
                myTextarea.innerHTML += videoEmbed;
                resultat.innerHTML += videoEmbed;
                
            } else {
                alert('URL non valide. Assurez-vous d\'entrer une URL YouTube ou Dailymotion correcte.');
            }
        }
    });
}

function generateVideoEmbed(url) {
    let embedUrl;
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const youtubeId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
        embedUrl = `https://www.youtube.com/embed/${youtubeId}`;
    } else if (url.includes('dailymotion.com') || url.includes('dai.ly')) {
        const dailymotionId = url.split('/video/')[1]?.split('?')[0] || url.split('/').pop();
        embedUrl = `https://www.dailymotion.com/embed/video/${dailymotionId}`;
    }
    return embedUrl ? `<iframe width="560" height="315" src="${embedUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>` : null;
}


uploadImage();
insertVideo();


function insertMap() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const mapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&hl=fr&z=14&amp;output=embed`;

            const mapIframe = `<iframe width="560" height="315" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="${mapUrl}"></iframe>`;
            myTextarea.innerHTML += mapIframe;
        }, function () {
            alert('Impossible de récupérer votre localisation');
        });
    } else {
        alert("La géolocalisation n'est pas prise en charge par ce navigateur.");
    }
}


insertMapButton.addEventListener('click', insertMap);