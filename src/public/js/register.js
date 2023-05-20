const form = document.getElementById('registerForm');

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => obj[key] = value);

  fetch('/api/extend/users/register', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al registrar el usuario');
      }
    })
    .then(result => {
      Swal.fire({
        icon: 'success',
        title: 'Usuario creado exitosamente',
        text: '¡Gracias por registrarte!',
      }).then(() => {
        window.location.replace('/');
      });
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Error al registrar los datos',
        text: 'Los datos ingresados son incorrectos. Por favor, inténtelo de nuevo.'
      });
      console.error(error);
    });
});