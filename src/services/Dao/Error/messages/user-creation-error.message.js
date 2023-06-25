export const generateUserErrorInfo = (user) => {
    //return
    return `Uno o más campos se enviaron incompletos o inválidos.
      Lista de campos requeridos:
          * Nombre: Es necesario en letras, recibido: ${user.first_name}
          * email: Es necesario en letras, formato en mail. recibido: ${user.email}
          * Apellido: Es necesario en letras, recibido: ${user.last_name}
          * Edad: Un valor numerico, recibido: ${user.age}
          * password: , recibido: ${user.password}
      `;
  };

export const userError = (user) => {

    return `No existe usuario registrado con este mail:
        * email: recibido: ${user.email}, `
}