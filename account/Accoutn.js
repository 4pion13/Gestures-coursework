class Account {


    


    signUp(){
        let password = document.getElementById('signUpPassword').value;
        let email = document.getElementById('signUpEmail').value;
        this.render(false, true);
        console.log(password, email)
        setTimeout(function(){
            console.log('Сработало');
            console.log(window.location.origin);
            window.location.replace(`${window.location.origin}/app.html`);
        }, 1500);
        


    }


    registration(){

    }



    render(registration, loading){
        let htmlInner = '';


        if(!registration) {
            htmlInner += `
                <div class="modal-header p-3 pb-4 border-bottom-0">
                    <h1 class="fw-bold mb-0 fs-2">Вход</h1>
                    </div>
            
                    <div class="modal-body p-3 pt-0">
                    <form class="">
                        <div class="form-floating mb-3">
                        <input type="email" class="form-control rounded-3" id="signUpEmail" placeholder="user@yandex.ru">
                        <label for="signUpEmail">Email</label>
                        </div>
                        <div class="form-floating mb-1">
                        <input type="password" class="form-control rounded-3" id="signUpPassword" placeholder="Пароль">
                        <label for="signUpPassword">Пароль</label>
                        </div>
                        <button type="button" class="btn btn-link p-0 mb-2" onclick="account.render(true)">Регистрация</button>
                        <button id='subButton' class="w-100 mb-2 btn btn-lg rounded-3 btn-primary btn-custom-color shadow" onclick="account.signUp()" disabled>Вход</button>
                    </form>
                </div>
            
            `
        } else {
            htmlInner += `
                <div class="modal-header p-3 pb-4 border-bottom-0">
                    <h1 class="fw-bold mb-0 fs-2">Регистрация</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="account.render()"></button>
                    </div>
                    <div class="modal-body p-3 pt-0">
                    <form class="">
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control rounded-3" id="floatingInput" placeholder="name@example.com">
                            <label for="floatingInput">Email</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Пароль">
                            <label for="floatingPassword">Пароль</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control rounded-3" id="floatingPassword2" placeholder="Пароль (повтор)">
                            <label for="floatingPassword2">Пароль (повтор)</label>
                        </div>
                        <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary btn-custom-color shadow" type="submit">Регистрация</button>
                    </form>
                </div>

            
            `
        }



        if(loading) {
            htmlInner = `
                <div class="d-flex justify-content-center p-5">
                    <div class="spinner-border spinner-color" role="status">
                    </div>
                <div>
            
            `
        }


        let html = `

            <div class="modal modal-sheet position-static d-block bg-dark p-4 py-md-5" tabindex="-1" role="dialog" id="modalSignin" style="position: static; padding:0px !important;">
                <div class="modal-dialog" role="document">
                    <div class="modal-content bg-secondary-subtle rounded-4 shadow">
                        ${htmlInner}
                    </div>
                </div>
            </div>
        
        `

        ROOT_ACCOUNT.innerHTML = html;
    }


}

const account = new Account();