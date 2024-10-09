function render(){
    chatHistory.render(false);
    dialogue.render();
    chatHistoryMobile.render();
};


function loading(){
    chatHistory.render(true);
    dialogue.render(true);
}

loading();
//spinner.render();

let CHATS = [];
let CHAT_DATA = [];
let main = 'http://localhost:8000/chat-history/';
let test = 'utils/test.json'
fetch(test)
    .then(res => res.json())
    .then(body => {
        console.log(body.chat_history);
        //CHATS = body.chat_history;
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
