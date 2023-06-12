const form = document.getElementById('TicketForm');

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => obj[key] = value);

  fetch('/api/extend/carts/:cid/purchase', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(result => {
    if (result.status === 200) {
      result.json().then(json => {
        Swal.fire({
          icon: 'success',
          title: 'Compra exitosa',
          text: 'En la brevedad, recivira un email a su direccion de correo que le confirmara, recuerde que la misma esta sujeta a la disponibildiad de stock, por lo cual le sugerimos que verifique los detalles de la compra',
          onClose: () => {
            // ...
          }
        });

        setTimeout(() => {
          window.location.href = '/api/extend/products';
        }, 4000);
      });
    } else if (result.status === 500) {
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Los datos ingresados son incorrectos. Por favor, inténtelo de nuevo.'
      });
    }
  });
});