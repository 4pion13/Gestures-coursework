class LocalStorageUtil {
    constructor() {
        this.keyName = 'chatId';
        this.keyToken = 'token'
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

    getToken(){
        try {
            const productsLocalStorage = localStorage.getItem(this.keyToken);
            if (productsLocalStorage !== null) {
                //console.log(JSON.parse(productsLocalStorage));
                return JSON.parse(productsLocalStorage);
                //return productsLocalStorage;
            }
            return [];

        } catch (err) {
            
            return [];
        }
    }
    putToken(token){
        let tokenKey = this.getToken();
        console.log(tokenKey);
        if(tokenKey === Array){
            localStorage.removeItem(localStorageUtil.keyToken);
        }
        localStorage.setItem(this.keyToken, JSON.stringify(token));
        return {
            tokenKey: tokenKey
        }

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

