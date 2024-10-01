function render(){
    chatHistory.render();
    dialogue.render();
    fileUploadBtn.render();
    dialogueElement.render();
};
spinner.render();
let CHATS = [];


fetch('http://localhost:8000/chat-history/')
    .then(res => res.json())
    .then(body => {
        CATALOG = body;
        console.log(CATALOG);
        setTimeout(function(){
            spinner.rootClear();
            render();
        }, 2000);
    })
    .catch(error => {
        console.log(error);
    })
