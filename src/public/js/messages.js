const socket = io();

let user;
const catbox =document.getElementById('chatBox')

Swal.fire({
    icon: "info",
    title:'Ingrese su nombre de usario por favor',
    input: 'text',
    text: 'Ingrese el username para poder ingresar en el chat.',
    color: "#716add",
    inputValidator: (value)=>{
        if(!value){
            return "Necesitas escribir tu nombre de usuario para continuar!"
        }else{

            socket.emit("userConnected", {user: value})
        }
    },
    allowOutsideClick: false // esto es para no dejar pasar al usuario si no completa el input, dando cli-ck afuera.
}).then( result =>{
    user = result.value

}
)


catbox.addEventListener('keyup', evt=>{
    if(evt.key === 'Enter'){
        if(catbox.value.trim().length > 0){
            socket.emit('message', {user: user, message: catbox.value})
            catbox.value = "";
        }else{
            alert("Por favor escribir un mensaje, no se pueden enviar mensajes vacios")
        }
    }
})

socket.on('messageLogs', data=>{
    const messageLogs = document.getElementById('messageLogs');
    let logs='';
    data.forEach(log=>{
        logs += `${log.user} dice: ${log.message}<br/>`
    })
    messageLogs.innerHTML=logs;
})

//Alerta de ingreso de otro usuario

socket.on ('userConnected', data =>{
    let message = `Nuevo usuario conectado: ${data.user}`

    Swal.fire({
        icon: "info",
        title: "Ingreso un nuevo usuario al chat",
        text: message,
        toast: true,
        color: "#716add"
    })
})

