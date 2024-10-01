function render(){
    chatHistory.render();
    dialogue.render();
    fileUploadBtn.render();
    dialogueElement.render();
};


function loading(){
    chatHistory.render(true);
    dialogue.render(true);
}

loading();
//spinner.render();

let CHATS = [];


fetch('http://localhost:8000/chat-history/')
    .then(res => res.json())
    .then(body => {
        CATALOG = body;
        console.log(CATALOG);
        setTimeout(function(){
            spinner.rootClear();
            render();
        }, 1500);
    })
    .catch(error => {
        console.log(error);
    })
