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

        render(loading){
            let htmlChat = '';
            if (loading) {
                console.log('Загрузка чатов')
                htmlChat = `
                <div>
                    <div class="d-flex justify-content-between align-items-center">
                        <h5>Чаты</h5>
                    </div>
                    <div class = "d-flex justify-content-center p-5">
                        <div class="spinner-border spinner-color" role="status">
                        </div>
                    <div>
                </div>
                `

            } else {
                htmlChat = `
                <div>
                    <div class="d-flex justify-content-between align-items-center">
                        <h5>Чаты</h5>
                        <button type="button" class="btn border" onclick="chatModal.openModal()"><i class="fa-brands fa-rocketchat fa-regular" style="color: #ffffff;"></i></button>
                    </div>
                </div>
                `
            }
            //<div type="button" onclick="chatHistory.requestChatHistory()">Кнопка<div></div>

    
            const html = `
                <div class = "h-100 w-100 bg-secondary-subtle chat-history chat-history-custom shadow p-3">
                    ${htmlChat} 
                                       
                </div>
               
            `;
            ROOT_CHAT_HISTORY.innerHTML = html;
        }

    

}

const chatHistory = new ChatHistory();

