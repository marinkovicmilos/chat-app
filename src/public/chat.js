// const socket = io.connect('http://localhost:3000');
const socket = io();

const messageForSending = document.getElementById('message-input'),
    username = document.getElementById('username-input'),
    btnSend = document.getElementById('btnSend'),
    receivedMessage = document.getElementById('received-message'),
    typing = document.getElementById('typing'),
    log = document.getElementById('log');

btnSend.addEventListener('click', function () {
    socket.emit('chat-req', {
        message: messageForSending.value,
        username: username.value
    });
    messageForSending.value = "";
});

messageForSending.addEventListener('keypress', function () {
    socket.emit('typing-req', username.value);
});

socket.on('chat-res', function (data) {
    typing.innerHTML = '';
    log.innerHTML += '<p>Received: ' + JSON.stringify(data) + '</p>';
    receivedMessage.innerHTML += '<p><strong>' + data.username + ': </strong>' + data.message + '</p>';
});

socket.on('typing-res', function (data) {
    typing.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});
