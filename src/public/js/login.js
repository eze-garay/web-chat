const form = document.getElementById('loginForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/extend/users/login',{
        method:'POST',
        body:JSON.stringify(obj),
        headers:{
            'Content-Type':'application/json'
        }
    }).then(result=>{
        if(result.status===200){
            result.json()
            .then(json=>{
                console.log(json);
                //localStorage.setItem('authToken', json.jwt);
                console.log("Cookies generadas:");
                console.log(document.cookie);
                alert("Login realizado con exito!");
                window.location.replace('/products');
            });
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







