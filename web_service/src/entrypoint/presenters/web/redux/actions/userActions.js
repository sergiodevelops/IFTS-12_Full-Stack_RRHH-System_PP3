// 1 - REGISTRAR NUEVO USUARIO
const addNewUser = (user) => {
    return {
        type:'ADD_NEW_USER',
        payload: {
            user,
        },
    };
}

// 2 - USUARIO AUTENTICADO
const setCurrentAuthenticatedUser = (user) => {
    return {
        type:'SET_CURRENT_AUTHENTICATED_USER',
        payload: {
            user,
        },
    };
}

export default {
    addNewUser,
    setCurrentAuthenticatedUser,
};
