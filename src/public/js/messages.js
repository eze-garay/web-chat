

const socket = io();

let user;
const catbox = document.getElementById('chatBox');
const logoutButton = document.getElementById('logoutButton');
const messageLogs = document.getElementById('messageLogs');

Swal.fire({
    icon: "info",
    title: 'Ingrese su nombre de usuario por favor',
    input: 'text',
    text: 'Ingrese el username para poder ingresar en el chat.',
    color: "#716add",
    inputValidator: (value) => {
      if (!value) {
        return "Necesitas escribir tu nombre de usuario para continuar!";
      } else {
        socket.emit("userConnected", { user: value });
      }
    },
    allowOutsideClick: false, 
    showCancelButton: true, 
    cancelButtonText: 'Volver a la pagina de registro' 
  }).then(result => {
    if (result.isConfirmed) {
      user = result.value;
     
    } else {
      
      window.location.href = "/";
    }
  });


catbox.addEventListener('keyup', evt => {
  if (evt.key === 'Enter') {
    if (catbox.value.trim().length > 0) {
      socket.emit('message', { user: user, message: catbox.value });
      catbox.value = "";
    } else {
      alert("Por favor escribir un mensaje, no se pueden enviar mensajes vacios");
    }
  }
});

socket.on('messageLogs', data => {
  let logs = '';
  data.forEach(log => {
    logs += `${log.user} dice: ${log.message}<br/>`;
  });
  messageLogs.innerHTML = logs;
});

socket.on('userConnected', data => {
  let message = `Nuevo usuario conectado: ${data.user}`;

  Swal.fire({
    icon: "info",
    title: "Ingreso un nuevo usuario al chat",
    text: message,
    toast: true,
    color: "#716add"
  });
});

logoutButton.addEventListener('click', () => {
  // Emitir un evento al servidor para indicar que el usuario se desconectará
  socket.emit('logout');

  // Borrar los mensajes del chat en el cliente
  messageLogs.innerHTML = '';

  // Opcionalmente, puedes mostrar un mensaje o realizar otras acciones después del logout
  // ...
});
