class Dialogue{
    render(url){
        let htmlDialogue = '';
        let videoUrl = url;
        let videoPlayer = '';
        if (url){
            videoPlayer = `
            <div class="d-flex justify-content-end p-3">
                <video src="${videoUrl}" style="width: 60%;" controls></video>
            </div>
            `
        } else {
            videoPlayer = '';
        };


        htmlDialogue += `
        <div>
            <div class="d-flex justify-content-center">
                <h2>Диалог</h2>
            </div>
            <div style = "overflow-y: scroll; height: 400px; width: 100%">
                ${videoPlayer}
            </div>
        </div>
        
        `
        let htmlBtn = fileUploadBtn.fileUploadBtnInner();
        const html = `
            <div class = "w-100 h-100 bg-secondary-subtle chat-history shadow" style = "position:relative;">
                ${htmlDialogue}
                ${htmlBtn}
            </div>
            <div class = "nav-custom w-100 bg-secondary-subtle shadow p-3 mt-3">
                
            </div>
            <div class = "nav-fake-margin">
            
            </div>

        
        
        `;
        ROOT_DIALOGUE.innerHTML = html;
    }

}

const dialogue = new Dialogue();


