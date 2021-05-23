const client = io()
        
username = '';

client.on('new_connected', users => {
    for(let user of users){
        const liElement = document.createElement('LI')
        liElement.dataset.id = user.user_id
        liElement.textContent = user.user_username
        usersElement.appendChild(liElement)
    }
})

client.on('reciev_message', ({message}) => {
    console.log( username, message)
})

usernameElement.onkeyup = (e) => {
    if(e.keyCode == 13){
        client.emit('new_user', e.target.value)
        username = e.target.value
    }
}
messageElement.onkeyup = (e) => {
    if(e.keyCode == 13){
        client.emit('new_message', {
            username: username,
            message: e.target.value
        })
    }
}