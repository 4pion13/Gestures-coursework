class Dialogue{
    render(url){
        
        console.log(fileUploadBtn.processingStatus)
        
        const html = `
            <div class = "w-100 h-100 bg-secondary-subtle chat-history shadow" style = "position:relative;">
                <div class="d-flex justify-content-center">
                    <h2>Диалог</h2>
                </div>
                <div style = "overflow-y: scroll; height: 85%; width: 100%">
                    <div id="dialogueElement"><div>
                </div>
                <div id="btnDialogue"><div>
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


