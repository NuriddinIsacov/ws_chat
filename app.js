const ws = new WebSocket('ws://localhost:8085')


const sendMessage = ()=>{
    const chatArea = document.querySelector('.chat-area')
    const messageInput = document.querySelector('.inp-area input')
    const message = messageInput.value
    const user = JSON.parse(localStorage.getItem('chat-user'))
    
    if(message === '')
        return false
    
    const msg = {
        type: 'message',
        name: `${user.fullname}`, 
        text: message, 
        id: `${user.username}`
    }
    
    ws.send(JSON.stringify(msg))

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

ws.onmessage = async (event) =>{
    const chatArea = document.querySelector('.chat-area')
    const user = JSON.parse(localStorage.getItem('chat-user'))

    
    let reader = new FileReader()
    reader.onload = ()=>{
        const msg = JSON.parse(reader.result)
        

        if(msg.id !== user.username){
            chatArea.innerHTML += `
                <div class="message_box">
                    <div class="message">
                        <div class="message-author">${msg.name}</div>
                        <div class="message-text">${msg.text}</div>
                    </div>
                </div>
            `
        }
    }

    chatArea.scrollTop = chatArea.scrollHeight
    reader.readAsText(event.data)
    // console.log(reader.result);
    
}

const openChat = (e) =>{
    e.preventDefault()
    
    const loginForm = document.getElementById('formcha')    
    const formData = new FormData(loginForm)
    const user = {}

    formData.forEach((value, key) =>{
        console.log(`${key}: ${value}`);
        user[key] = value
    })

    localStorage.setItem('chat-user', JSON.stringify(user))

    window.location = 'index.html'
}

addEventListener('keypress', (event) =>{
    if(event.key === 'Enter'){
        sendMessage()
    }
    
})
