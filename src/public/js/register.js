const form = document.getElementById('registerForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    console.log(data);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    console.log("Objeto formado:");
    console.log(obj);
    fetch('/api/sessions/register',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result => {
        if (result.status === 200) {
          // Mostrar una alerta de SweetAlert si se creó el usuario exitosamente
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado exitosamente',
            text: '¡Gracias por registrarte!',
          }).then(() => {
            window.location.replace('/');
          });
        } else {
            // Mostrar una alerta de SweetAlert si se ingresaron datos incorrectos
            Swal.fire({
              icon: 'error',
              title: 'Error de inicio de sesión',
              text: 'Los datos ingresados son incorrectos. Por favor, inténtelo de nuevo.'
            });
    }
})
})