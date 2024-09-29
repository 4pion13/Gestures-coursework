class LocalStorageUtil {
    constructor() {
        this.keyChats = 'chats';
        this.keyActiveChat = 'activeChat'
    }

    getChats(data){
        const chatsLocalStorage = data;
        if (chatsLocalStorage !== null) {
        //     // let chatIdList = [];
        //     // chatsLocalStorage.forEach(element => {
        //     //   console.log(element.id);
        //     //   chatIdList.push(element.id);
        //     // });
        //     return chatIdList;
        //     //return productsLocalStorage;
        }
        return chatsLocalStorage;
    }

    putProducts(id){
        let chats = this.getChats();
        //let pushProduct = false;
        const index = chats.indexOf(id);
        if (index === -1) {
            chats.push(id);
            //pushProduct = true;
        } else {
            chats.splice(index, 1);
        }
        localStorage.setItem(this.keyName, JSON.stringify(products));
        return {
            pushProduct: pushProduct,
            chats: chats,
        }

    }
}


const localStorageUtil = new LocalStorageUtil();

