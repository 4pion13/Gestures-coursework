class ChatHistory {
    render(){
        let htmlChat = '';
        htmlChat += `
        <div>
            <div class="d-flex justify-content-center">
                <h2>Чаты</h2>
            </div>
            <div type="button">Кнопка<div>
        </div>


        `

        const html = `
            <div class = "h-100 w-100 bg-secondary-subtle chat-history chat-history-custom shadow p-3">
                ${htmlChat}
                
            </div>
           

        
        
        `;
        ROOT_CHAT_HISTORY.innerHTML = html;
    }

}

const chatHistory = new ChatHistory();

