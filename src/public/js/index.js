// Configuracion del socket del lado del cliente

const socket = io ();
socket.emit('mensaje', 'Hola soy el cliente!!')

socket.on('productos', products => {
  actualizarListaProductos(products);
})

function eliminarProducto(id) {
    // Enviar un mensaje de eliminación al servidor de sockets
    socket.emit('eliminar_producto', id);
  }


