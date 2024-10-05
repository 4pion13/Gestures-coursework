class ChatModal{
    constructor(){
        this.modalStatus = 0;
        this.modalClass = 'modalClose';
        this.modalError = '<p class = "error mb-1 fw-light">Введите название чата</p>';
    }

    openModal(){
        let openModalClass = 'd-flex';
        console.log('click', this.modalStatus)
        if (this.modalStatus === 1){
            openModalClass = this.modalClass;
            this.render(openModalClass);
            this.modalStatus = 0;
        } else if(this.modalStatus === 0) {
            this.modalStatus = 1;
            this.render(openModalClass);
        }
    }

    createChat(){
        const inputData = document.getElementById('newChat');
        if (inputData.value !== ""){
            console.log(inputData.value);
            let data = inputData.value
            fetch('http://localhost:8000/new-chat/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data}),
            })
            .then(response => {
                if (!response.ok) {
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
            this.render('d-flex', this.modalError);
        }
    }

    render(modalState, modalClassError){
        let modalError = '';
        if (modalClassError){
            modalError = modalClassError;
        }


        let html = `
        
                <div class="vh-100 justify-content-center align-items-center modal modal-sheet position-absolute ${modalState}" tabindex="-1" role="dialog" id="modalSheet">
        <div class="modal-dialog p-3" role="document">
            <div class="modal-content rounded-4 border-color-custom shadow p-3">
            <div class="d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <label class="form-label mb-0">Название чата</label>
                                <button class="btn btn-dark border" style="padding:0px 5px 0px 5px;" onclick="chatModal.openModal()"><i class="fa-solid fa-xmark fa-regular mb-0" style="color: #ffffff;"></i></button>
                            </div>
                            ${modalError}
                            <input type="text" id="newChat" class="form-control mb-2" required>
                            <button class="btn btn-dark border col-12" type="button" onclick = "chatModal.createChat()"><i class="fa-solid fa-floppy-disk" style="color: #ffffff;"></i></button>
                        </div>
            </div>
        </div>
        </div>
        
        `
        ROOT_MODAL_CHAT.innerHTML = html;

    }



}

const chatModal = new ChatModal();