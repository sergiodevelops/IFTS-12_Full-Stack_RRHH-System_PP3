// 1 - REGISTRAR NUEVO USUARIO
const saveNewUser = (user) => {
    return {
        type:'SAVE_NEW_USER',
        payload: {
            user,
        },
    };
}

// 2 - ESTABLECER ESTADO DE SESION USUARIO ACTUAL (true es userLoggedIn y false userLoggedOut)
const setUserAccountStatus = (status) => {
    return {
        type:'SET_USER_ACCOUNT_STATUS',
        payload: {
            status,
        },
    };
}

export default {
    saveNewUser,
    setUserAccountStatus,
};
