class ChatHistory {
    // constructor(){
    //     this.loadingStatus = 0;
    //     this.loadingProcess = `<div class="d-flex justify-content-center">
    //                                 <div class="spinner-border text-light" role="status">
    //                                 </div>
    //                             </div>`;
    // }


    // loadingChats(htmlChatsButton){
    //     if (this.loadingStatus === 1){
    //         htmlChatsButton += this.loadingProcess;
    //     }
    // }

    // async requestChatHistory(){
    //     // fetch('http://localhost:8000/chat-history/',{
    //     //     method:'GET',
    //     //     headers: {
    //     //         'Content-Type': 'application/json',
    //     //     },
    //     // })
    //     // .then(response => response.json());
    //     const response = await fetch('http://localhost:8000/chat-history/');
    //     const data = await response.json();
    //     return data; // Возвращаем результат
    // }

    // async render(){
    //     let chatData = '';
    //     let list = [];
    //     let htmlChatsButton = '';
    //     this.loadingStatus = 1;
    //     if (this.loadingStatus === 1){
    //         htmlChatsButton += this.loadingProcess;
    //     }
    //     const result = await this.requestChatHistory();
    //     if (Object.values(result.chat_history).length !== 0){
    //         this.loadingStatus = 0;
    //         htmlChatsButton = ''
    //         for(var i in result.chat_history)
    //             for (const [k, v] of Object.entries(result.chat_history[i])) {
    //                 list.push(v);
    //             };
    //         list.forEach((element) => htmlChatsButton += `<div type="button" class = "d-flex justify-content-center">${element}</div>`);
    //     } else {
    //         htmlChatsButton += 'У вас нет чатов';
    //     }
    //     //<div type="button" onclick="chatHistory.requestChatHistory()">Кнопка<div></div>
    //     let htmlChat = '';
    //     htmlChat += `
    //     <div>
    //         <div class="d-flex justify-content-center">
    //             <h2>Чаты</h2>
    //         </div>
    //     </div>


    //     `

    //     const html = `
    //         <div class = "h-100 w-100 bg-secondary-subtle chat-history chat-history-custom shadow p-3">
    //             ${htmlChat}
    //             ${htmlChatsButton}
                
    //         </div>
           

        
        
    //     `;
    //     ROOT_CHAT_HISTORY.innerHTML = html;
    // }

        getChatId(id, index){
            console.log(id, index);
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
                    dialogue.render(false, index);
                    fileUploadBtn.render();
                    dialogueElement.render();
                    localStorageUtil.putChatId(id);
                    dialogue.chatScroll();
                    console.log(localStorageUtil.getChatId());
                    
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

        render(loading){
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
                if (Array.isArray(CHATS.chat_history)) {
                    CHATS.chat_history.forEach((el, index) => {
                        console.log(el.id, index+1);
                        htmlChats += `
                            <div class="mb-1" style="padding-left: 5px; padding-right: 5px;">
                                <button type="button" class="btn border col-12 d-flex justify-content-end" onclick="chatHistory.getChatId(${el.id}, ${index+1})">
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
                    <button type="button" class="btn border" onclick="chatModal.openModal()"><i class="fa-brands fa-rocketchat fa-regular" style="color: #ffffff;"></i></button>
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

