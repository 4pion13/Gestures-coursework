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
let CHATS = [];
let CHAT_DATA = [];
//spinner.render();

console.log(localStorageUtil.getToken())
if (localStorageUtil.getToken().length == 0){
    window.location.replace(`${window.location.origin}`);
} else {
    let main = 'http://localhost:8000/chat-history/';
    let test = 'utils/test.json'
    let bearer = 'Bearer ' + localStorageUtil.getToken();
    fetch(main, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': bearer,
        }
        })
        .then(
            res => {
                if(!res.ok) {
                    chatModal.openModal(chatModal._modalError);
                    return res.text().then(text => { throw new Error(text) })
                }
                else {
                    return res.json();
            } 
            }   

        // }
        )

        .then(body => {
            //console.log(response);
            console.log(body);
            console.log(body.chat_history);
            CHATS = body.chat_history;
            console.log(typeof(CHATS));
            setTimeout(function(){
                spinner.rootClear();
                render();
                chatHistory.chatScroll();
            }, 1500);
            }
        // }
        )
        .catch(error => {
            console.log(error);
        })

}

