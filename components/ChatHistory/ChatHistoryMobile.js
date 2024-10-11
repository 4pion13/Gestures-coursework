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
        console.log(id, index);
        dialogue.render(true);
        chatHistoryMobile.render();
        this.render();
        fetch('http://localhost:8000/chat-data/', {
            method: 'POST',
            headers: {
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

    render(activeStatus){
        console.log('Мобильная версия!!!!!!!!');
        let htmlChat = '';
        

        let htmlChats = '';
        if (Array.isArray(CHATS)) {
                CHATS.forEach((el, index) => {
                    htmlChats += `
                        <div class="mb-1 d-flex justify-content-center" style="padding-left: 5px; padding-right: 5px;">
                            <button class="btn col-3 border" style="margin-left:5px;" onclick="chatModal.openModal(chatModal._modalDelete, ${el.id})"><i class="fa-regular fa-trash-can" style="color: #ffffff;"></i></button>
                            <button type="button" class="btn border col-8 d-flex justify-content-end" onclick="chatHistory.getChatId(${el.id}, ${index+1})">
                                <div class="fw-lighter">${el.name}</div>
                                <div class="fw-bold" style="margin-right: 5px;">${index+1}</div> 
                            </button>
                        </div>
                    `;
                    console.log('Чат добавлен!')
        });

        htmlChat = `
            <div class="d-flex justify-content-end align-items-center px-3 py-1">
                <button class="btn btn-dark border" style="padding:0px 5px 0px 5px;" onclick="chatHistoryMobile.openChat()"><i class="fa-solid fa-xmark fa-regular mb-0" style="color: #ffffff;"></i></button>
            </div>
            <div class="d-flex justify-content-between align-items-center mb-2 p-3">
                <h5>Чаты</h5>
                <button type="button" class="btn border" onclick="chatModal.openModal(chatModal._modalCreate)"><i class="fa-brands fa-rocketchat fa-regular" style="color: #ffffff;"></i></button>
            </div>
            <div id='history' class="dialogue scroll-left d-flex flex-column" style = "width: 100%; height:500px; padding-left: 2px; margin-bottom: 55px;">

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
        ROOT_MOBILE_CHAT_HISTORY.innerHTML = html;
    }

}

const chatHistoryMobile = new ChatHistoryMobile();


