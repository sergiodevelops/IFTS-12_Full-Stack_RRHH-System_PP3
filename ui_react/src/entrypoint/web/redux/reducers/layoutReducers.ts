export type LayoutReducersState = {
    subMenuTabValueStore: string,
    mainTabValueStore: string,
}

export type ActionProps = {
    type: string,
    payload?: {
        subMenuTabValueStore: string,
        mainTabValueStore: string,
    }
}

export default (
    state: LayoutReducersState = {
        subMenuTabValueStore: "0",
        mainTabValueStore: "0",
    },
    action: ActionProps) => {
    switch (action.type) {
        case "SET_SUBMENU_TAB_VALUE":
            if (!action.payload?.subMenuTabValueStore) return state; // no hace nada
            return {...state, subMenuTabValueStore: action.payload.subMenuTabValueStore};
        case "SET_MAIN_TAB_VALUE":
            if (!action.payload?.mainTabValueStore ) return state; // no hace nada
            return {...state, mainTabValueStore: action.payload.mainTabValueStore};
        default:
            return state;
    }
}
