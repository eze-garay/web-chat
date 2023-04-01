// Configuracion del socket del lado del cliente

const socket = io ();
socket.emit('mensaje', 'Hola soy el cliente!!')


