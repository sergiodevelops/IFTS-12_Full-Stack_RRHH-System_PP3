const usersList = [
    {
        type: "administrativo",
        fullname: "Rodrigo Lopez (administrativo)",
        username: "administrativo",
        password: "1234",
    },
    {
        type: "postulante",
        fullname: "Sandra Santini  (postulante)",
        username: "postulante",
        password: "1234",
    },
    {
        type: "solicitante",
        fullname: "Jose Glavic  (solicitante)",
        username: "solicitante",
        password: "1234",
    },
];

export default (state = {usersList: usersList}, action) => {
    switch (action.type) {
        // case "CHECK_USER_EXIST":
        //     if (!action.payload.user) return state;
        //     let userExist = state.usersList.findIndex((user) =>
        //         user.username === action.payload.user.username) !== -1; // si existe coincidencia
        //     return { ...state, usersList: [...state.usersList, action.payload.user] };
        case "SAVE_NEW_USER":
            const userExist = state.usersList.findIndex((user) =>
                user.username === action.payload.user.username) !== -1; // si existe coincidencia
            // si vino (vacio o null) o usuario ya existe en la DB
            if (!action.payload.user || userExist) return state; // no hace nada
            // si no existe aun el usuario a crear, lo crea
            if (!userExist) return { ...state, usersList: [...state.usersList, action.payload.user] };

        default:
            return state
    }
}
