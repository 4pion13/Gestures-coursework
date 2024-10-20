class Dialogue{

    chatScroll(){
        setTimeout(function(){
            let chat = document.getElementById('chat');
            chat.scrollTop = chat.scrollHeight;
        }, 100);
    }


    render(loading, id){
        let html = '';
        let openChatClass = '';
        let startMessage = '';
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
                openChatClass = '';
                startMessage = '<p style="text-align: center; margin-left: 5px;" class="mb-0">Для перевода видео с жестового языка выберите чат.</p>'
            }else{
                id = ` | ID: ${id}`;
                openChatClass = 'border bg-body';
                startMessage = '';
            }
            this.chatScroll
            console.log(fileUploadBtn.processingStatus)
            html = `

                    <div class = "w-100 h-100 bg-secondary-subtle chat-history shadow" style = "position:relative;">
                        <div class="d-flex justify-content-between align-items-center py-2 mb-0">
                            <h5 class="mb-0" style="margin: 0 auto">Диалог ${id}</h5>
                            <button class="btn open-chat-btn nav-custom" style="position:absolute;" data-bs-toggle="offcanvas" data-bs-target="#offcanvasResponsive" aria-controls="offcanvasResponsive"><i class="fa-solid fa-list" style="color: #ffffff;"></i></button>

                        </div>
                        <div id='chat' class="dialogue ${openChatClass}" style = "overflow-y: scroll; height: 80%; width: 100%">
                            ${startMessage}
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


