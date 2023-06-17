export const generateUserErrorInfo = (user) => {
    //return
    return `One or more properties were sent incomplete or invalid.
    List of required properties:
        * first_name: type String, received: ${user.first_name}
        * email: type String, received: ${user.email}
        * last_name: type String, received: ${user.last_name}
        * age: type Number, received: ${user.age}
        * password: type String, received: ${user.password}
    `;
};

export const userError = (user) => {

    return `No existe usuario registrado con este mail:
        * email: type String, recibido: ${user.email}, `
}