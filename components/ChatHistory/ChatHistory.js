class ChatHistory {
   
        getChatId(id, index){
            console.log(id, index);
            dialogue.render(true);
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


        chatScroll(){
            setTimeout(function(){
                let chat = document.getElementById('history');
                chat.scrollTop = chat.scrollHeight;
            }, 1);
        }

        render(loading, mobile){
            let htmlChat = '';
            
            if (loading) {
                console.log('Загрузка чатов')
                htmlChat = `
                <div>
                    <div class="d-flex justify-content-between align-items-center p-3">
                        <h5>Чаты</h5>
                    </div>
                    <div class="d-flex justify-content-center p-5">
                        <div class="spinner-border spinner-color" role="status">
                        </div>
                    <div>
                </div>
                `

            } else {
                let htmlChats = '';
                if (Array.isArray(CHATS)) {
                    CHATS.forEach((el, index) => {
                        console.log(el.id, index+1);
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
                } else {
                    console.error("CHATS is not an array:", CHATS);
                }
                htmlChat = `
                <div class="d-flex justify-content-between align-items-center mb-2 p-3">
                    <h5>Чаты</h5>
                    <button type="button" class="btn border" onclick="chatModal.openModal(chatModal._modalCreate)"><i class="fa-brands fa-rocketchat fa-regular" style="color: #ffffff;"></i></button>
                </div>
                <div id='history' class="dialogue scroll-left" style = "height: 85%; width: 100%; padding-left: 2px;">
                    <div>
                        ${htmlChats}
                    </div>
                </div>
                `
            }
            //<div type="button" onclick="chatHistory.requestChatHistory()">Кнопка<div></div>


            const html = `
                <div class = "h-100 w-100 bg-secondary-subtle chat-history chat-history-custom shadow" style="position: relative;">
                    ${htmlChat}           
                </div>
                
            `;

            ROOT_CHAT_HISTORY.innerHTML = html;
        }

    

}

const chatHistory = new ChatHistory();


