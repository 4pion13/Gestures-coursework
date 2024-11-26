let REPORT = [];

console.log(localStorageUtil.getToken())
if (localStorageUtil.getToken().length == 0){
    window.location.replace(`${window.location.origin}`);
} else {
    let main = 'http://localhost:8000/chat-report/';
    let test = 'utils/test.json'
    let bearer = 'Bearer ' + localStorageUtil.getToken();
    fetch(main, {
        method: 'GET',
        withCredentials: true,
        credentials: 'include',
        headers: {
            'Authorization': bearer,
        }
        })
        .then(
            res => {
                if(!res.ok) {
                    chatModal.openModal(chatModal._modalError);
                    return res.text().then(text => { throw new Error(text) })
                }
                else {
                    return res.json();
            } 
            }   

        // }
        )

        .then(body => {
            //console.log(response);
            REPORT = body.chat_report;
            console.log(REPORT);
            report.render();
            }
        // }
        )
        .catch(error => {
            console.log(error);
        })

}