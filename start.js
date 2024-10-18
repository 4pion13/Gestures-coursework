if (typeof localStorageUtil.getToken() === 'string' || localStorageUtil.getToken() instanceof String){
    window.location.replace(`${window.location.href}app.html`);
} else {
    account.render();
    account.formValidation();
    console.log(localStorageUtil.getToken());
}



