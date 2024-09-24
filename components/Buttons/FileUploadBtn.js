class FileUploadBtn {
    constructor(){
        this.fileUploadBtnIn = `
            <div class="align-items-end p-2" style = "position:absolute; bottom:0; width:100%;">
                <input class="form-control" type="file" id="formFile" accept="video/mp4" onchange="fileUploadBtn.sendingFile(this)">
            </div>
        `;
        this.loadingBtn = `
            <div class="align-items-end p-2" style = "position:absolute; bottom:0; width:100%;">
                <button class="btn bg-secondary-subtle col-12" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
            </div> 
        `;
        this.dataBtn = '';

        this.loadingStatus = 0;


    }


    updateBtn(){
        if (this.loadingStatus === 1) {
            this.dataBtn = this.loadingBtn;
        }else{
            this.dataBtn = this.fileUploadBtnIn;
        }
        dialogue.render();
    }

    sendingFile(input){
        //const fileInput = document.getElementById('formFile');
        let file = input.files[0];
        const formData = new FormData();
        formData.append('file', file);
        this.loadingStatus = 1;
        this.updateBtn();
        fetch('http://localhost:8000/upload/', {
            method: 'POST',
            body: formData,
            //headers: {
                // Вы можете добавить заголовки, если это необходимо
                // 'Authorization': 'Bearer your_token',
            //}
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //console.log(response.json());
            return response.json();
        })
        .then(data => {
            console.log('Success:', data.file_url);
            var me = this;
            setTimeout(function(){
                me.loadingStatus = 0;
                me.updateBtn();
                dialogue.render();
            }, 1000);
        })
        .catch((error) => {
            console.error('Error:', error);
            this.loadingStatus = 0;
            dialogue.render();
        });
        
    }

    fileUploadBtnInner(){
        let html = '';
        if (this.loadingStatus === 0){
            html += this.fileUploadBtnIn;
        } else {
            html += this.loadingBtn;
        }
        return html;    
    }

}

const fileUploadBtn = new FileUploadBtn();



