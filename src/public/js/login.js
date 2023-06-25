const form = document.getElementById('loginForm');

form.addEventListener('submit',e=>{
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};
    data.forEach((value,key)=>obj[key]=value);
    fetch('/api/extend/user/login',{
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
                debugger
                //localStorage.setItem('authToken', json.jwt);
                console.log("Cookies generadas:");
                console.log(document.cookie);
                Swal.fire({
                    icon: 'success',
                    title: 'inicio de sesión exitoso',
                    text: 'Bienvenido.'
                  });
                  setTimeout(() => {
                    window.location.href = '/api/extend/products';
                  }, 1000)
            });
        } else if (result.status === 500) {
            result.json().then(error => {
              Swal.fire({
                icon: 'error',
                title: 'Error de inicio de sesión',
                text: error.msg || 'Los datos ingresados son incorrectos. Por favor, inténtelo de nuevo.'
              });
            });
          }
    })
});







