const socket = io('http://localhost:8000');
// const socket = io()



const form = document.getElementById('send-container');
const messageInp = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message')
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'center') {
        messageElement.classList.remove('message')
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInp.value;
    append(` ${message} : You`, 'right');
    socket.emit('send', message);
    messageInp.value = '';
})



const name = prompt("Enter Your Name to Join!");

socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    console.log(`${name} joined the chat `);
    append(`${name} joined the chat `, 'center');
});

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left')
});

socket.on('left', name => {
    append(`${name} left the chat`, 'center');
});