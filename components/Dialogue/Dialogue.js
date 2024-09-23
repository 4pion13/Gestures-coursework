class Dialogue{
    render(){
        let htmlDialogue = '';
        htmlDialogue += `
        <div>
            <div class="d-flex justify-content-center">
                <h2>Диалог</h2>
            </div>
        </div>
        
        `



        const html = `
            <div class = "w-100 h-100 bg-secondary-subtle chat-history shadow" style = "position:relative;">
                ${htmlDialogue}
                ${fileUploadBtnIn}
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

