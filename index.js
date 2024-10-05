function render(){
    chatHistory.render();
    dialogue.render();
};


function loading(){
    chatHistory.render(true);
    dialogue.render(true);
}

loading();
//spinner.render();

let CHATS = [];
let CHAT_DATA = [];
fetch('http://localhost:8000/chat-history/')
    .then(res => res.json())
    .then(body => {
        CHATS = body;
        console.log(typeof(CHATS));
        setTimeout(function(){
            spinner.rootClear();
            render();
            chatHistory.chatScroll();
        }, 1500);
    })
    .catch(error => {
        console.log(error);
    })
