const socket = io();
const chatBox = document.getElementById('chatBox');


function showMessage(message) {
  const newMessage = document.createElement('div');
  newMessage.classList.add('message');
  newMessage.innerHTML = `<span class="secondary">${message.username} - ${message.time}</span><br>${message.text}`;
  chatBox.appendChild(newMessage)
}

//Receive and show message
socket.on('message', message => {
  console.log(message.text);
  showMessage(message);
  chatBox.scrollTop = chatBox.scrollHeight;
})

//Submit message
const chatForm = document.getElementById('chatForm');
chatForm.addEventListener('submit', e => {
  e.preventDefault();
  //Get message input
  const msg = e.target.elements.message.value;
  //Send message to the server
  if (msg) socket.emit('chat-message', msg);
  e.target.elements.message.value = '';
  e.target.elements.message.focus();
})
