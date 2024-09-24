class FileUploadBtn {
    constructor(){
        this.fileUploadBtnIn = `
            <div class="align-items-end p-2" style = "position:absolute; bottom:0; width:100%;">
                <input class="form-control" type="file" id="formFile" accept="video/mp4" onchange="fileUploadBtn.sendingFile(this)">
            </div>
        `;
        this.loadingBtn = `
            <div class="align-items-end p-2" style = "position:absolute; bottom:0; width:100%;">
                <button class="btn btn-primary" type="button" disabled>
                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                </button>
            </div> 
        `

        this.loadingStatus = 0;


    }




    sendingFile(input){
        //const fileInput = document.getElementById('formFile');
        let file = input.files[0];
        alert(`File name: ${file.name}`); // например, my.png
        alert(`Last modified: ${file.lastModified}`);
        const formData = new FormData();
        formData.append('file', file);
        this.loadingStatus = 1;
        if (this.loadingStatus === 1) {
            this.fileUploadBtnIn = this.loadingBtn;
        }
        console.log(this.loadingStatus);
        dialogue.render();
        



    }

    fileUploadBtnInner(){
        let html = '';
        if (this.loadingStatus === 0){
            html += this.fileUploadBtnIn;
        } else {
            html += this.loadingBtn;
        }
        console.log(html);

        return html;


    

    
    }

}

const fileUploadBtn = new FileUploadBtn();



