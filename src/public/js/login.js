const form = document.getElementById('loginForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/sessions/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status === 201) {
            // Redirigir al usuario a la página de productos
            window.location.replace('/products');
        } else if(result.status === 401) {
            // Mostrar una alerta de SweetAlert si se ingresaron datos incorrectos
            Swal.fire({
              icon: 'error',
              title: 'Error de inicio de sesión',
              text: 'Los datos ingresados son incorrectos. Por favor, inténtelo de nuevo.'
            });
        }
    })
});







