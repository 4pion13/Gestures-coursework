class LocalStorageUtil {
    constructor() {
        this.keyName = 'chatId';
    }

    getChatId(){
        const productsLocalStorage = localStorage.getItem(this.keyName);
        if (productsLocalStorage !== null) {
            //console.log(JSON.parse(productsLocalStorage));
            return JSON.parse(productsLocalStorage);
            //return productsLocalStorage;
        }
        return [];
    }

    putChatId(id){
        let chatId = this.getChatId();
        chatId.splice(0);
        chatId.push(id);
        localStorage.setItem(this.keyName, JSON.stringify(chatId));
        return {
            chatId: chatId
        }

    }
}


const localStorageUtil = new LocalStorageUtil();

