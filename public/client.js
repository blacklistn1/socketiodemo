const socket = io();
const chatBox = document.getElementById('chatBox');
const joinRoom = document.getElementById('joinRoom');
let { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

if (!username) username = 'Anonymous user';

socket.emit('joinRoom', {username, room});

function showMessage(message) {
  const newMessage = document.createElement('div');
  newMessage.classList.add('message');
  newMessage.innerHTML = `<span class="secondary">${message.username} - ${message.time}</span><br>${message.text}`;
  chatBox.appendChild(newMessage)
}

//Receive and show message
socket.on('message', message => {
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

//Add the user to the room form as a hidden input attribute
const userHidden = document.createElement('input');
userHidden.setAttribute('type', 'hidden');
userHidden.setAttribute('name', 'username');
userHidden.value = username;
joinRoom.appendChild(userHidden);
