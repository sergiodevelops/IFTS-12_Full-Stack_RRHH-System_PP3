// 1 - VERIFICAR EXISTENCIA USUARIO
const checkUserExist = (user) => {
    return {
        type:'CHECK_USER_EXIST',
        payload: {
            user,
        },
    };
}

// 2 - REGISTRAR NUEVO USUARIO
const saveNewUser = (user) => {
    return {
        type:'SAVE_NEW_USER',
        payload: {
            user,
        },
    };
}

// 3 - ESTABLECER ESTADO DE SESION PARA EL USUARIO ACTUAL true es userLoggedIn y false userLoggedOut
const setUserAccountStatus = (status) => {
    return {
        type:'SET_USER_ACCOUNT_STATUS',
        payload: {
            status,
        },
    };
}

export default {
    checkUserExist,
    saveNewUser,
    setUserAccountStatus,
};
