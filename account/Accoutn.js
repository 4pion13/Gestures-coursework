class Account {
    formValidation(){
        const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
        const input = document.getElementById('signUpEmail');
        const inputPas = document.getElementById('signUpPassword');
        const subButton = document.getElementById('subButton');
        function isEmailValid(value) {
            return EMAIL_REGEXP.test(value);
        }
        function onInput() {
            if (isEmailValid(input.value)) {
                input.style.borderColor = 'green';
                input.style.border = '2px solid green';
                subButton.disabled = false;
            } else {
                input.style.borderColor = 'red';
                subButton.disabled = true;
            }


        }
        input.addEventListener('input', onInput);
    }

    logout(){
        localStorage.removeItem(localStorageUtil.keyToken);
        window.location.reload();
        // fetch('http://localhost:8000/start/authenticate/', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({email, password}),
        //     })
        //     .then(res => {
        //         if(!res.ok) {
        //             //account.render(false,false, `Ошибка`);
        //             return res.text().then(text => { throw new Error(text) })
        //         }
        //         else {
        //             return res.json();
        //        } 
        //     }) 
        //     .then(data => {
        //         setTimeout(function(){
        //             console.log('Success:', data.access);
        //             localStorageUtil.putToken(data.access);
        //             //localStorage.removeItem(localStorageUtil.keyToken);
        //             //localStorageUtil.getToken();
        //             window.location.replace(`${window.location.href}app.html`);
        //         }, 1500);
        //     })
        //     .catch((err) => {
        //         setTimeout(function(){
        //             console.log(typeof(err.message))
        //             var result = err.message.slice(10,-2);
        //             account.render(false,false, result);
        //         }, 1500);
        //     });
        
    }


    signUp(){
        let password = document.getElementById('signUpPassword').value;
        let email = document.getElementById('signUpEmail').value;
        this.render(false, true);
        console.log(password, email)
        fetch('http://localhost:8000/start/authenticate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
            })
            .then(res => {
                if(!res.ok) {
                    //account.render(false,false, `Ошибка`);
                    return res.text().then(text => { throw new Error(text) })
                }
                else {
                    return res.json();
               } 
            }) 
            .then(data => {
                setTimeout(function(){
                    console.log('Success:', data.access);
                    localStorageUtil.putToken(data.access);
                    //localStorage.removeItem(localStorageUtil.keyToken);
                    //localStorageUtil.getToken();
                    window.location.replace(`${window.location.href}app.html`);
                }, 1500);
            })
            .catch((err) => {
                setTimeout(function(){
                    console.log(typeof(err.message))
                    var result = err.message.slice(10,-2);
                    account.render(false,false, result);
                }, 1500);
            });
    }


    registration(){
        let password = document.getElementById('floatingPassword').value;
        let email = document.getElementById('floatingInput').value;
        let username = document.getElementById('login').value;
        this.render(false, true);
        console.log(email, password)
        fetch('http://localhost:8000/start/registration/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password, username}),
            })
            .then(response => response.json()) 
            .then(data => {
                setTimeout(function(){
                    console.log('Success:', data);
                    account.render(false, false);
                    account.formValidation();
                }, 1500);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    renderSignUp(){
        account.render();
        account.formValidation();
    }

    render(registration, loading, message){
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
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onclick="account.renderSignUp()"></button>
                    </div>
                    <div class="modal-body p-3 pt-0">
                    <form class="">
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control rounded-3" id="floatingInput" placeholder="name@example.com">
                            <label for="floatingInput">Email</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control rounded-3" id="login" placeholder="Roman">
                            <label for="login">Логин</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control rounded-3" id="floatingPassword" placeholder="Пароль">
                            <label for="floatingPassword">Пароль</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control rounded-3" id="floatingPassword2" placeholder="Пароль (повтор)">
                            <label for="floatingPassword2">Пароль (повтор)</label>
                        </div>
                        <button class="w-100 mb-2 btn btn-lg rounded-3 btn-primary btn-custom-color shadow" onclick="account.registration()">Регистрация</button>
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

        if(message){
            htmlInner = `
                <div class="modal-header p-3 pb-4 border-bottom-0">
                    <h1 class="fw-bold mb-0 fs-2">Ошибка входа</h1>
                    </div>
            
                    <div class="modal-body p-3 pt-0">
                    <p>${message}</p>
                    <button type="button" class="w-100 mb-2 btn btn-lg rounded-3 btn-primary btn-custom-color shadow" onclick="account.renderSignUp()"><i class="fa-solid fa-arrow-rotate-right" style="color: #ffffff;"></i></button>
                </div>
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