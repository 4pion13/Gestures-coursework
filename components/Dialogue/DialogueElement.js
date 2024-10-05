class DialogueElement {

    render (url, result){
        let htmlDialogue = '';
        let videoUrl = url;
        let videoPlayer = '';
        let resultHtml = '';
        let history = '';
        console.log('res- ', CHAT_DATA, typeof(CHAT_DATA));

        if (CHAT_DATA) {
            CHAT_DATA.forEach((el, index) => {
                console.log(el);
                console.log(el.id, el.request, el.anser);
                    history += `
                        <div class="border-bottom">
                            <div class="d-flex justify-content-end p-3">
                                <div class="d-flex justify-content-end col-5">
                                    <video src="${el.request}" style="max-width:200px;" controls></video>
                                </div>
                            </div>
                            <div class="d-flex bg-dark justify-content-start p-3 col-5" style="border-radius: 0px 10px 10px 0px">
                                ${el.anser}
                            </div>
                            <div class="d-flex justify-content-end p-3 fw-light">
                                ${el.date}
                            </div>
                        </div>
                    `
     
            });
            document.getElementById('dialogue-history').innerHTML = history;
        }

        if (url){
            videoPlayer = `
            <div class="d-flex justify-content-end p-3">
                <div class="d-flex justify-content-end col-5">
                    <video src="${videoUrl}" style="max-width:200px;" controls></video>
                </div>
            </div>
            `
        } else {
            videoPlayer = '';
        };


        if (result){
            let text = '';
            result.forEach(element => {
                text += element + ' ';
            });
            console.log(text);
            resultHtml = `
            <div class="d-flex bg-dark justify-content-start p-3 col-5" style="border-radius: 0px 10px 10px 0px">
                ${text}
            </div>
            `
        } else {
            resultHtml = '';
        };
        



        htmlDialogue = `
        <div>
            ${videoPlayer}
            ${resultHtml}
        </div>
        `


        document.getElementById('dialogueElement').innerHTML += htmlDialogue;
        

        }
}


const dialogueElement = new DialogueElement();