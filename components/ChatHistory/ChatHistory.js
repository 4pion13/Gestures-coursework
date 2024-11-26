class ChatHistory {
  getChatId(id, index) {
    console.log(id, index);
    dialogue.render(true);
    let bearer = "Bearer " + localStorageUtil.getToken();
    fetch("http://localhost:8000/chat-data/", {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data.chat_data);
        CHAT_DATA = data.chat_data;
        setTimeout(function () {
          dialogue.render(false, index);
          fileUploadBtn.render();
          dialogueElement.render();
          localStorageUtil.putChatId(id);
          dialogue.chatScroll();
          console.log(localStorageUtil.getChatId());
        }, 1500);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  chatScroll() {
    setTimeout(function () {
      let chat = document.getElementById("history");
      chat.scrollTop = chat.scrollHeight;
    }, 1);
  }

  render(loading, mobile) {
    let htmlChat = "";

    if (loading) {
      console.log("Загрузка чатов");
      htmlChat = `
                <div>
                    <div class="d-flex justify-content-between align-items-center p-3">
                        <h5>Чаты</h5>
                    </div>
                    <div class="d-flex justify-content-center p-5">
                        <div class="spinner-border spinner-color" role="status">
                        </div>
                    <div>
                </div>
                `;
    } else {
      let htmlChats = "";
      if (Array.isArray(CHATS)) {
        CHATS.forEach((el, index) => {
          console.log(el.id, index + 1);
          htmlChats += `
                            <div class="btn-group col-12 mb-2" role="group" aria-label="Простой пример" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Подсказка внизу">
                                <button type="button" id="btn-example" class="btn border d-flex justify-content-start col-8" onclick="chatHistoryMobile.testFunk(${
                                  el.id
                                }, ${index + 1})">
                                    <div class="fw-bold" style="margin-right: 5px;">${
                                      index + 1
                                    }:</div> 
                                    <div class="fw-lighter text-custom" style="text-align: start;">${
                                      el.name
                                    }</div>
                                </button>
                                <button class="btn border" style="" onclick="chatModal.openModal(chatModal._modalDelete, ${
                                  el.id
                                }, '${
            el.name
          }')"><i class="fa-regular fa-trash-can" style="color: #ffffff;"></i></button>
                            </div>
                        `;
          console.log("Чат добавлен!");
        });
      } else {
        console.error("CHATS is not an array:", CHATS);
      }
      htmlChat = `
                <div class="d-flex justify-content-between align-items-center p-3 border-bottom">
                    <button class="btn btn-dark border" onclick="chatModal.openModal(chatModal._modalExit)">Выход</button>
                    <button type="button" class="btn border" onclick="chatModal.openModal(chatModal._modalCreate)"><i class="fa-brands fa-rocketchat fa-regular" style="color: #ffffff;"></i></button>
                </div>
                <div id='history' class="dialogue p-3" style = "height: 85%; width: 100%; padding-left: 2px;">
                    <a class="mb-2" href="/report.html" class="docs-creator">Ваши обращения</a>
                    <h5 class="py-2 mb-0">Чаты</h5>
                    <div>
                        ${htmlChats}
                    </div>
                </div>
                `;
    }
    //<div type="button" onclick="chatHistory.requestChatHistory()">Кнопка<div></div>

    const html = `
                <div class = "h-100 w-100 bg-secondary-subtle chat-history chat-history-custom shadow" style="position: relative;">
                    ${htmlChat}       
                </div>
                
            `;

    ROOT_CHAT_HISTORY.innerHTML = html;
  }
}

const chatHistory = new ChatHistory();
