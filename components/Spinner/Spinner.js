class Spinner{
    rootClear(){
        ROOT_SPINNER.innerHTML = '';
    }
    render(){
        let html = `


        
        <div class = "d-flex justify-content-center p-5">
            <div class="spinner-border spinner-color" role="status">
            </div>
        <div>
        `

        ROOT_SPINNER.innerHTML = html;
    }
}


const spinner = new Spinner();
