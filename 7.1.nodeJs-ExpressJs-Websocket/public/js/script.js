let socket = io();
const spanUser = document.querySelector("#totalUserOnline");
const inpMessage = document.querySelector("#message");
const btnSend = document.querySelector("#sendMessage");
const messageList = document.querySelector("#message-list");
//saat online
socket.emit('join');//terhubung dengan socket.on('join')

socket.on('message', message => {
  alert(`New Message : ${message}`);
  const barisPesan = document.createElement('div');
  console.log(message);
  barisPesan.innerHTML = /*html*/ `
  <div class="card mt-1">
         <div class="card-body">
           ${message}
         </div>
       </div>
  `;
  messageList.append(barisPesan);
})//berfungsi mengambil isi dari socket.emit('message');

socket.on('online', countUserOnline => {
  spanUser.innerHTML = countUserOnline;
});//berfungsi menampilkan jumlah user online

const sendingMessage = () => {
  socket.emit("message", inpMessage.value);//berfungsi mengambil nilai value input
  //dan memasukkannya ke socket.emit('message)
  inpMessage.value = "";
}

inpMessage.addEventListener('keyup', (e) => {
  if (e.keyCode === 13 && inpMessage.value !== "") {
    sendingMessage();
  }
})
btnSend.addEventListener('click', () => {
  if (inpMessage.value !== "") {
    sendingMessage();
  }
})