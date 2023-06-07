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
  }).then(result=>{
  if(result.status === 200) {
      result.json()
          Swal.fire({
              icon: 'success',
              title: 'Registro exitoso',
              text: 'Bienvenido.'
            });
          window.location.replace('/');
  } else if(result.status === 500) {
      Swal.fire({
        icon: 'error',
        title: 'Error de inicio de sesión',
        text: 'Los datos ingresados son incorrectos. Por favor, inténtelo de nuevo.'
      });
  }
})
});