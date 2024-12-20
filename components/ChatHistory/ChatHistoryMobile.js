class ChatHistoryMobile {
    constructor(){
        this.chatOpenStatus = 0;
        this.chatClass = 'chatClose';
    }


    openChat(){
        let openModalClass = 'd-block';
        console.log('click', this.modalStatus)
        if (this.chatOpenStatus === 1){
            openModalClass = this.chatClass;
            this.render(openModalClass);
            this.chatOpenStatus = 0;
            ROOT_MOBILE_CHAT_HISTORY.classList.add(this.chatClass);
        } else if(this.chatOpenStatus === 0) {
            this.chatOpenStatus = 1;
            this.render(openModalClass);
            ROOT_MOBILE_CHAT_HISTORY.classList.remove(this.chatClass);
        }
    }

    chatScroll(){
        setTimeout(function(){
            let chat = document.getElementById('history');
            chat.scrollTop = chat.scrollHeight;
        }, 1);
    }

   
    getChatId(id, index){
        let bearer = 'Bearer ' + localStorageUtil.getToken();
        console.log(id, index);
        document.getElementById('offcanvas-close').click();
        dialogue.render(true);
        chatHistoryMobile.render();
        this.render();
        fetch('http://localhost:8000/chat-data/', {
            method: 'POST',
            headers: {
                'Authorization': bearer,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
            })
            .then(response => response.json()) 
            .then(data => {
                console.log('Success:', data.chat_data);
                CHAT_DATA = data.chat_data;
                setTimeout(function(){
                    dialogue.render(false, index);
                    fileUploadBtn.render();
                    dialogueElement.render();
                    localStorageUtil.putChatId(id);
                    dialogue.chatScroll();
                    console.log(localStorageUtil.getChatId());
                }, 1500);
                
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    testFunk(id, index) {
        document.getElementById('offcanvas-close').click();
        chatHistoryMobile.getChatId(id, index);
    }

    render(activeStatus){
        console.log('Мобильная версия!!!!!!!!');
        let htmlChat = '';
        

        let htmlChats = '';
        if (Array.isArray(CHATS)) {
                CHATS.forEach((el, index) => {
                    htmlChats += `
                        <div class="btn-group col-12 mb-2" role="group" aria-label="Простой пример">
                            <button type="button" class="btn border d-flex justify-content-start col-8" onclick="chatHistoryMobile.testFunk(${el.id}, ${index+1})">
                                <div class="fw-bold" style="margin-right: 5px;">${index+1}:</div> 
                                <div class="fw-lighter text-custom" style="text-align: start;">${el.name}</div>
                            </button>
                            <button class="btn border" style="" onclick="chatModal.openModal(chatModal._modalDelete, ${el.id}, '${el.name}')"><i class="fa-regular fa-trash-can" style="color: #ffffff;"></i></button>
                        </div>
                    `;
                    console.log('Чат добавлен!')
        });

        htmlChat = `
            <div class="d-flex justify-content-end align-items-center px-3 py-1">
            </div>
            <a class="mb-2" href="/report.html" class="docs-creator">Ваши обращения</a>
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h5>Чаты</h5>
                <button type="button" class="btn border" onclick="chatModal.openModal(chatModal._modalCreate)"><i class="fa-brands fa-rocketchat fa-regular" style="color: #ffffff;"></i></button>
            </div>
            <div id='history' class="dialogue" style = "width: 100%; height:500px; padding-left: 2px; margin-bottom: 55px;">
                ${htmlChats}
            </div>
            `
        }
        //<div type="button" onclick="chatHistory.requestChatHistory()">Кнопка<div></div>

        if (!activeStatus) {
            let activeStatus = this.chatClass
            
        }

        const html = `
            <div style="position: absolute; display:none;" class = "h-100 w-100 bg-secondary-subtle chat-history-mobile-custom shadow chat-history-border-top ${activeStatus}">
                ${htmlChat}           
            </div>
        `;
        //ROOT_MOBILE_CHAT_HISTORY.innerHTML = html;
        document.getElementById("offcanvas-body").innerHTML = htmlChat;
    }

}

const chatHistoryMobile = new ChatHistoryMobile();


