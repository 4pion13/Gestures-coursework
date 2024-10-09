class Dialogue{

    chatScroll(){
        setTimeout(function(){
            let chat = document.getElementById('chat');
            chat.scrollTop = chat.scrollHeight;
        }, 100);
    }


    render(loading, id){
        let html = '';
        if (loading) {
            console.log('Загрузка чатов')
            html = `
                <div class = "w-100 h-100 bg-secondary-subtle chat-history shadow" style = "position:relative;">
                    <div class="d-flex justify-content-center">
                        <h5 class="py-2 mb-0">Диалог</h5>
                    </div>
                    <div class = "d-flex justify-content-center p-5">
                        <div class="spinner-border spinner-color" role="status">
                        </div>
                    <div>
                </div>
            `;

        } else {
            if (!id) {
                id = ''
            }else{
                id = ` | ID: ${id}`
            }
            this.chatScroll
            console.log(fileUploadBtn.processingStatus)
            html = `

                    <div class = "w-100 h-100 bg-secondary-subtle chat-history shadow" style = "position:relative;">
                        <div class="d-flex justify-content-between align-items-center py-2 mb-0">
                            <h5 class="mb-0" style="margin: 0 auto">Диалог ${id}</h5>
                            <button class="btn open-chat-btn nav-custom" style="position:absolute;" onclick="chatHistoryMobile.openChat()"><i class="fa-solid fa-list" style="color: #ffffff;"></i></button>

                        </div>
                        <div id='chat' class="dialogue" style = "overflow-y: scroll; height: 80%; width: 100%">
                            <div id="dialogueElement">
                                <div id="dialogue-history"></div>
                            <div>
                        </div>
                        <div id="btnDialogue"><div>
                    </div>
            `;
        }
        ROOT_DIALOGUE.innerHTML = html;
    }
}

const dialogue = new Dialogue();


