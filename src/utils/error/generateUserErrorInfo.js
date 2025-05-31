export const generateUserErrorInfo = user => {
    return `
        listado de datos requerido: 
        * first_name: necestita ser un string, y recivimos: ${user.first_name}
        * last_name: necestita ser un string, y recivimos: ${user.last_name}
        * email: necestita ser un string, y recivimos: ${user.email}
    ` 
}