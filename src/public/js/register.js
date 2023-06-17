const form = document.getElementById('registerForm');

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => obj[key] = value);

  fetch('/api/extend/user/register', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(result => {
    if (result.ok) {
      result.json().then(data => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: 'Bienvenido.',
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      });
    } else {
      result.json().then(error => {
        Swal.fire({
          icon: 'error',
          title: 'Error de registro',
          text: error.msg || 'Ocurrió un error durante el registro.',
        });
      });
    }
  }).catch(error => {
    Swal.fire({
      icon: 'error',
      title: 'Error de registro',
      text: error.message || 'Faltan campos obligatorios',
    });
  });
});