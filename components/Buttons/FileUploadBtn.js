class FileUploadBtn {
    constructor(){
        this.fileUploadBtnIn = `
            <div class="align-items-end p-2" style = "position:absolute; bottom:0; width:100%; padding-bottom: 20px !important;"">
                <input class="form-control" type="file" id="formFile" accept="video/mp4" onchange="fileUploadBtn.sendingFile(this)">
            </div>
        `;
        this.loadingBtn = `
            <div class="align-items-end p-2" style = "position:absolute; bottom:0; width:100%; padding-bottom: 20px !important;"">
                <button class="btn bg-secondary-subtle col-12" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Загрузка видео
                </button>
            </div> 
        `;
        this.processingBtn = `
            <div class="align-items-end p-2" style = "position:absolute; bottom:0; width:100%; padding-bottom: 20px !important;"">
                <button class="btn bg-secondary-subtle col-12" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Обработка видео
                </button>
            </div> 
        
        `
        this.dataBtn = '';
        this.loadingStatus = 0;
        this.processingStatus = 0;
    }


    updateBtn(){
        if (this.loadingStatus === 1) {
            this.dataBtn = this.loadingBtn;
        }else if(this.processingStatus === 1){
            this.dataBtn = this.processingBtn;
        }else{
            this.dataBtn = this.fileUploadBtnIn;
        }
        this.render();
    }

    videoProcessing(id){
        this.processingStatus = 1;
        this.updateBtn();
        let chatId = localStorageUtil.getChatId()[0];
        let bearer = 'Bearer ' + localStorageUtil.getToken();
        fetch('http://localhost:8000/process/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer,
            },
            body: JSON.stringify({id, chatId}),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //console.log(response.json());
            return response.json();
        })
        .then(data => {
            this.loadingStatus = 0;
            this.processingStatus = 0;
            console.log('Success:', data);
            dialogueElement.render(data.file_url, data.message);
            this.updateBtn();
            dialogue.chatScroll();
            
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    sendingFile(input){
        let file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);
        this.loadingStatus = 1;
        this.updateBtn();
        let bearer = 'Bearer ' + localStorageUtil.getToken();
        fetch('http://localhost:8000/upload/', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': bearer,
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data.file_url, data.file_id);
            var me = this;
            setTimeout(function(){
                me.loadingStatus = 0;
                me.updateBtn();
                dialogueElement.render(data.file_url);
                dialogue.chatScroll();
                setTimeout(function(){
                    me.videoProcessing(data.file_id, data.file_url);
                }, 2000);
            }, 1000);
        })
        .catch((error) => {
            console.error('Error:', error);
            this.loadingStatus = 0;
            dialogue.render();
            this.updateBtn();
        });
        
    }

    fileUploadBtnInner(){
        let html = '';
        if (this.loadingStatus === 0 && this.processingStatus === 0){
            html += this.fileUploadBtnIn;
        } else if(this.processingStatus === 1 && this.loadingStatus === 0){
            html += this.processingBtn;
        } else if(this.loadingStatus === 1 && this.processingStatus === 0) {
            html += this.loadingBtn;
        }
        return html;    
    }

    render (){
        let htmlBtn = this.fileUploadBtnInner();
        let rootBtnDialogue = document.getElementById('btnDialogue');
        rootBtnDialogue.innerHTML = htmlBtn;
    }

}

const fileUploadBtn = new FileUploadBtn();



