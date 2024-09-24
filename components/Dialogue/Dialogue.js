class Dialogue{
    render(){
        let htmlDialogue = '';
        htmlDialogue += `
        <div>
            <div class="d-flex justify-content-center">
                <h2>Диалог</h2>
                <video src="http://localhost:8000/media/videos/f17a6060-6ced-4bd1-9886-8578cfbb864f_1.mp4" style="width: 300px;" controls></video>
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


