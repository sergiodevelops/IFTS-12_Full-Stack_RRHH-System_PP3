import {usersList} from '../../constants/usersList';

export default (state = {usersList: usersList, sesionStatus: false}, action) => {
    switch (action.type) {
        case "SAVE_NEW_USER":
            const userExist = state.usersList.findIndex((user) =>
                user.username === action.payload.user.username
            ) === -1;
            console.log("userExist valor --> ", userExist)
            // si vino (vacio o null) o usuario ya existe en la DB
            if (!action.payload.user || userExist) return state; // no hace nada
            // si no existe aun el usuario a crear, lo crea
            if (!userExist) return {...state, usersList: [...state.usersList, action.payload.user]};
        case "SET_USER_ACCOUNT_STATUS":
            return {
                ...state,
                sesionStatus: action.payload.status,
            };
        default:
            return state;
    }
}
