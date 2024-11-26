class Report{

    render(loading, id){
        let html = '';
        if (Array.isArray(REPORT)) {
            REPORT.forEach((el, index) => {
              console.log(el.id, index + 1);
              if (el.status){
                html += `
                                <div class="d-flex text-body-secondary pt-3" style="align-items:center;">
                                    <i class="fa-solid fa-check fa-lg" style="color: #00ffb3;margin-right: 20px;"></i>
                                    <p class="pb-3 mb-0 small lh-sm border-bottom">
                                        <strong class="d-block text-gray-dark">${el.owner_name}</strong>
                                        <span>Ваше обращение:</span> ${el.message}<br>
                                        <span>Текст ответа:</span> ${el.answer_text}<br>
                                        <span>Статус:</span> Выполнено<br>
                                        <span>Комментарий:</span> ${el.comment}
                                    </p>
                                </div>
                            `;
              }else{
                html += `
                                <div class="d-flex text-body-secondary pt-3" style="align-items:center;">
                                    <i class="fa-solid fa-xmark fa-lg" style="color: #ff0000;margin-right: 20px;"></i>
                                    <p class="pb-3 mb-0 small lh-sm border-bottom">
                                        <strong class="d-block text-gray-dark">${el.owner_name}</strong>
                                        <span>Ваше обращение:</span> ${el.message}<br>
                                        <span>Текст ответа:</span> ${el.answer_text}<br>
                                        <span>Статус:</span> В работе
                                    </p>
                                </div>
                            `;
              }
              
              console.log("Чат добавлен!");
            });
          } else {
            console.error("CHATS is not an array:", REPORT);
        }

        ROOT_REPORT.innerHTML = html;
        }
        
        
    }


const report = new Report();



