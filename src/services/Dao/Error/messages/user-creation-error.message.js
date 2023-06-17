export const generateUserErrorInfo = (user) => {
    //return
    return `Una o más propiedades fueron enviadas incompletas o no son válidas.
    Lista de propiedades requeridas:
        * fist_name: type String, recibido: ${user.first_name}
        * email: type String, recibido: ${user.email}
    `
};

export const userError = (user) => {

    return `No existe usuario registrado con este mail:
        * email: type String, recibido: ${user.email}, `
}