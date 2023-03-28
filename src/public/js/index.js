// Configuracion del socket del lado del cliente

const socket = io ();
socket.emit('mensaje', 'Hola soy el cliente!!')

Swal.fire({
  icon: 'success',
  title: 'Usuario conectado',
  text: 'verifique los datos',
  footer: '<a href="">Why do I have this issue?</a>'
})

