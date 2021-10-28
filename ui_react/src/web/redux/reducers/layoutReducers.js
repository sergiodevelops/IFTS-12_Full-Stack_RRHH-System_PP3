export default (
    state = {
        subMenuTabValueStore: "0",
        mainTabValueStore: "0",
    },
    action) => {
    switch (action.type) {
        case "SET_SUBMENU_TAB_VALUE":
            if (!action.payload.newSubMenuTabValue) return state; // no hace nada
            return {...state, subMenuTabValueStore: action.payload.newSubMenuTabValue};
        case "SET_MAIN_TAB_VALUE":
            if (!action.payload.newMainTabValue ) return state; // no hace nada
            return {...state, mainTabValueStore: action.payload.newMainTabValue};
        default:
            return state;
    }
}
