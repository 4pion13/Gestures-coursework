class DialogueElement {

    render (url, result){
        let htmlDialogue = '';
        let videoUrl = url;
        let videoPlayer = '';
        let resultHtml = '';
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
        



        htmlDialogue += `
        <div>
            ${videoPlayer}
            ${resultHtml}
        </div>
        `


        document.getElementById('dialogueElement').innerHTML += htmlDialogue;
        }
}


const dialogueElement = new DialogueElement();