
const ws = new WebSocket('ws://localhost:8085')
const user = {}

const sendMessage = ()=>{
    const chatArea = document.querySelector('.chat-area')
    const messageInput = document.querySelector('.inp-area input')
    const message = messageInput.value

    ws.send(JSON.stringify({ type: 'message', name: user.fullname, text: message, id: user.username }))

    messageInput.value = ''

    chatArea.innerHTML += `
        <div class="my-message_box">
            <div class="message">
                <div class="message-author">${user.fullname}</div>
                <div class="message-text">${message}</div>
            </div>
        </div>
    `
}

ws.onmessage = (event) =>{
    const chatArea = document.querySelector('.chat-area')

    // if(user.username !== event.data.id){
        
        chatArea.innerHTML += `
            <div class="message_box">
                <div class="message">
                    <div class="message-text">${event.data.message}</div>
                </div>
            </div>
        `
    // }
    const reader = new FileReader()
    // reader.onload = ()=>{
        

    //     // if(data.id !== userId){
    //         chatArea.innerHTML += `
    //             <div class="message_box">
    //                 <div class="message">
    //                     <div class="message-text">${reader.result.text}</div>
    //                 </div>
    //             </div>
    //         `
    //     // }
    // }

    chatArea.scrollTop = chatArea.scrollHeight
    reader.readAsText(event.data)
    // console.log(reader.result);
    
}

const openChat = (e) =>{
    e.preventDefault()
    
    const loginForm = document.getElementById('formcha')    
    const formData = new FormData(loginForm)
     
    formData.forEach((value, key) =>{
        console.log(`${key}: ${value}`);
        user[key] = value
    })

    window.location = 'index.html'
}