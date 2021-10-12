import {usersListExample} from '../../constants/usersListExample';

export default (
    state = {
        usersList: usersListExample,
        currentUser: null,
    },
    action) => {
    switch (action.type) {

        case "ADD_NEW_USER":
            const userExist = state.usersList.findIndex((user) =>
                user.username === action.payload.user.username
            ) !== -1;
            // si vino (vacio o null) o usuario ya existe en la DB
            if (!action.payload.user || userExist) return state; // no hace nada
            // si no existe aun el usuario a crear, lo crea
            if (!userExist) return {...state, usersList:[...state.usersList, action.payload.user]};

        case "SET_CURRENT_AUTHENTICATED_USER":
            if (!action.payload.user) return {...state, currentUser: null}; // no hace nada
            const currentUserData = state.usersList.find((user) =>
                user.username === action.payload.user.username && user.password === action.payload.user.password);
            return {...state,currentUser: currentUserData};
        default:
            return state;
    }
}
