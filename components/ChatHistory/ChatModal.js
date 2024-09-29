class ChatModal{
    constructor(){
        this.modalStatus = 0;
        this.modalClass = 'modalClose'
    }

    openModal(){
        let openModalClass = '';
        console.log('click')
        if (this.modalStatus === 1){
            openModalClass = this.modalClass;
            this.render(openModalClass);
            this.modalStatus = 0;
            //const shoppingCard = getElementById('shopping-card');
            //console.log(shoppingCard);
        } else if(this.modalStatus === 0) {
            this.modalStatus = 1;
            this.render(openModalClass);
        }
    }

    render(modalState){
        //let modalState = this.modalOpen();
        let html = `<div class="z-2 container position-absolute bg-dark shadow p-3 ${modalState}" style=" margin: auto;position: absolute;top: 0; left: 0; bottom: 0; right: 0; max-width:250px; height:150px; border-radius:5px;">
                        <div class="mb-3">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <label class="form-label mb-0">Название чата</label>
                                <button class="btn btn-dark border" style="padding:0px 5px 0px 5px;" onclick="chatModal.openModal()"><i class="fa-solid fa-xmark fa-regular mb-0" style="color: #ffffff;"></i></button>
                            </div>
                            <input type="text" class="form-control mb-2" required>
                            <button class="btn btn-dark border col-12" type="button"><i class="fa-solid fa-floppy-disk" style="color: #ffffff;"></i></button>
                        </div>

                    </div>`;

        ROOT_MODAL_CHAT.innerHTML = html;

    }



}

const chatModal = new ChatModal();