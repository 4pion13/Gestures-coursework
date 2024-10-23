class ChatModal{
    constructor(){
        this.modalStatus = 0;
        this.modalClass = 'modalClose';
        this.modalErrorMessage = '<p class = "error mb-1 fw-light">Введите название чата</p>';
        this.modalErrorDeleteChat = '<p class = "error mb-1 fw-light">Ошибка</p>';
        this._modalDelete = 'modalDelete';
        this._modalCreate = 'modalCreate';
        this._modalError = 'modalError';
        this._modalExit = 'modalExit';

    }


    accountPage(){
        localStorage.removeItem(localStorageUtil.keyToken);
        window.location.replace(`${window.location.origin}`);
    }

    openModal(modalStatus, chatId, chatName){
        let openModalClass = 'd-flex';
        console.log('click', this.modalStatus)
        if (modalStatus === this._modalCreate){
            document.getElementById('offcanvas-close').click();
        }
        if (this.modalStatus === 1){
            openModalClass = this.modalClass;
            this.render(openModalClass, false, modalStatus, chatId, chatName);
            this.modalStatus = 0;
        } else if(this.modalStatus === 0) {
            this.modalStatus = 1;
            console.log(chatName);
            this.render(openModalClass, false, modalStatus, chatId, chatName);
        }
        
    }


    deleteChat(id){
        console.log(id);
        fetch('http://localhost:8000/delete-chat/', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorageUtil.getToken(),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id}),
        })
        .then(response => {
            if (!response.ok) {
                chatModal.openModal(chatModal._modalError);
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data); 
            location.reload();     
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    createChat(){
        const inputData = document.getElementById('newChat');
        if (inputData.value !== ""){
            console.log(inputData.value);
            let data = inputData.value
            fetch('http://localhost:8000/new-chat/', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorageUtil.getToken(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data}),
            })
            .then(response => {
                if (!response.ok) {
                    chatModal.openModal(chatModal._modalError);
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data); 
                location.reload();     
            })
            .catch((error) => {
                console.error('Error:', error);
            });
            this.openModal(); 
        }else{
            this.render('d-flex', this.modalErrorMessage, this._modalCreate);
        }
    }

    render(modalState, modalClassError, modalType, chatId, chatName){
        let modalError = '';
        if (modalClassError){
            modalError = modalClassError;
        }

        let htmlInput = '';
        if(modalType == this._modalDelete) {
            htmlInput = `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label mb-0" style="margin-right:50px;">Удалить чат - <span class="fw-bold">(${chatName})</span></label>
                    <button class="btn btn-dark border" style="padding:0px 5px 0px 5px;" onclick="chatModal.openModal()"><i class="fa-solid fa-xmark fa-regular mb-0" style="color: #ffffff;"></i></button>
                </div>
                ${modalError}
                <button class="btn btn-dark border col-12" type="button" onclick = "chatModal.deleteChat(${chatId})"><i class="fa-regular fa-trash-can" style="color: #ffffff;"></i></button>
            
            `
        } else if(modalType == this._modalCreate) {
            htmlInput = `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label mb-0">Название чата</label>
                    <button class="btn btn-dark border" style="padding:0px 5px 0px 5px;" onclick="chatModal.openModal()"><i class="fa-solid fa-xmark fa-regular mb-0" style="color: #ffffff;"></i></button>
                </div>
                ${modalError}
                <input type="text" id="newChat" class="form-control mb-2" style="z-index:300;" required>
                <button class="btn btn-dark border col-12" type="button" onclick = "chatModal.createChat()"><i class="fa-solid fa-floppy-disk" style="color: #ffffff;"></i></button>
            
            `
        } else if(modalType == this._modalError){
            htmlInput = `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label mb-0" style="margin:0px 30px 0px 30px">Непредвиденная ошибка</label>
                </div>
                ${modalError}
                <button class="btn btn-dark border col-12" type="button" onclick="chatModal.accountPage()"><i class="fa-solid fa-arrow-rotate-right" style="color: #ffffff;"></i></button>
            `
        }else if(modalType == this._modalExit){
            htmlInput = `
                <div class="d-flex justify-content-between mb-2">
                    <label class="form-label mb-0" style="margin:0px 40px 0px 0px">Выход</label>
                    <button class="btn btn-dark border" style="padding:0px 5px 0px 5px;" onclick="chatModal.openModal()"><i class="fa-solid fa-xmark fa-regular mb-0" style="color: #ffffff;"></i></button>
                </div>
                ${modalError}
                <button class="btn btn-dark border col-12" type="button" onclick="account.logout()"><i class="fa-solid fa-right-from-bracket" style="color: #ffffff;"></i></button>
            `
        } else {
            htmlInput = `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <label class="form-label mb-0">Ошибка</label>
                    <button class="btn btn-dark border" style="padding:0px 5px 0px 5px;" onclick="chatModal.openModal()"><i class="fa-solid fa-xmark fa-regular mb-0" style="color: #ffffff;"></i></button>
                </div>
                <p>Ошибочка</p>
            `
        }

        let html = `
        
                <div class="vh-100 justify-content-center align-items-center modal modal-sheet position-absolute ${modalState}" tabindex="-1" role="dialog" id="modalSheet">
        <div class="modal-dialog" role="document">
            <div class="modal-content rounded-4 shadow-sm p-3" style="min-width: 350px;">
            <div class="d-flex flex-column">
                ${htmlInput}
                            
                        </div>
            </div>
        </div>
        </div>
        
        `
        ROOT_MODAL_CHAT.innerHTML = html;

    }



}

const chatModal = new ChatModal();