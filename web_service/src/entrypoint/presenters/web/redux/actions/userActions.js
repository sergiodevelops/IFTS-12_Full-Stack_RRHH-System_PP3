// 1 - VERIFICAR EXISTENCIA USUARIO
const checkUserExist = (user) => {
    return {
        type:'CHECK_USER_EXIST',
        payload: {
            user
        }
    }
}

// 2 - REGISTRAR NUEVO USUARIO
const saveNewUser = (user) => {
    return {
        type:'SAVE_NEW_USER',
        payload: {
            user
        }
    }
}

// 3 - ESTABLECER ESTADO DE SESION
// const setSesionState = (isActive) => {
//     return {
//         type:'SET_SESION_STATE',
//         payload: {
//             isActive
//         }
//     }
// }

export default {
    checkUserExist,
    saveNewUser,
};
