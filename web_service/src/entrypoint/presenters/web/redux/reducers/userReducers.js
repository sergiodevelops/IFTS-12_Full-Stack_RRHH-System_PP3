// import { TYPES } from "@entrypoint/presenters/web/redux/actions/layerActions";
// import ILayerVisibilityDto from "@application/usecases/layer/ILayerVisibilityDto";
const usersList = [
    {
        username: "administrativo",
        password: "1234",
        fullname: "Rodrigo Lopez (administrativo)",
        type: "administrativo",
    },
    {
        username: "postulante",
        password: "1234",
        fullname: "Sandra Santini  (postulante)",
        type: "postulante",
    },
    {
        username: "solicitante",
        password: "1234",
        fullname: "Jose Glavic  (solicitante)",
        type: "solicitante",
    },
];

export default (state = {usersList: usersList, sesionStatus: false}, action) => {
    switch (action.type) {
        case "CHECK_USER_EXIST":
            if (!action.payload.user) return state;

            // const userExist = action.payload.user
            return {
                ...state,
                usersList: [...state.usersList, action.payload.user],
            }
        case "SAVE_NEW_USER":
            const userExist = state.usersList.findIndex((user) =>
                user.username === action.payload.user.username
            ) === -1;
            console.log("userExist valor --> ", userExist)
            // si vino (vacio o null) o usuario existe
            if (!action.payload.user) return state; // no hace nada
            // pasa de largo y SI GUARDA EL NUEVO USUARIO
            console.log("esta entrando? --> ", action.payload.user)
            if (userExist) return {
                ...state, usersList: [...state.usersList, action.payload.user],
            };
        case "SET_USER_ACCOUNT_STATUS":
            if (!action.payload.user) return state;
            console.log("SET_USER_ACCOUNT_STATUS --> ", action.payload);
            return {
                ...state,
                sesionStatus: action.payload,
            };
        default:
            return state;
    }
}
