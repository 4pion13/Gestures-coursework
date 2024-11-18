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
                            <div class="d-flex bg-secondary-subtle justify-content-between p-3 col-6 align-items-center" style="border-radius: 0px 10px 10px 0px;">
                                <p class="mb-0">${el.anser}</p>
                                <button class="btn" onclick="chatModal.openModal(chatModal._modalReport,false,false,${el.id})"><i class="fa-solid fa-triangle-exclamation" style="color: #ffffff;"></i></button>
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
            let currentDate = new Date();
            let date = `${currentDate.getFullYear()}-${currentDate.getMonth()+1}-${currentDate.getDate()}`
            resultHtml = `
            <div class="d-flex bg-secondary-subtle justify-content-start p-3 col-6" style="border-radius: 0px 10px 10px 0px">
                ${text}
            </div>
            <div class="d-flex justify-content-end p-3 fw-light border-bottom">
                ${date}
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