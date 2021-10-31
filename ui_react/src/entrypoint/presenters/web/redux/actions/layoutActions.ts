import {ActionProps} from "@redux/reducers/layoutReducers";

export const TYPES = {
    SET_SUBMENU_TAB_VALUE: 'SET_SUBMENU_TAB_VALUE',
    SET_MAIN_TAB_VALUE: 'SET_MAIN_TAB_VALUE',
}

const setSubMenuTabValue = (subMenuTabValueStore: string): ActionProps => {
    return {
        type: TYPES.SET_SUBMENU_TAB_VALUE,
        payload: {
            subMenuTabValueStore,
        },
    };
}
const setMainTabValue = (mainTabValueStore: string): ActionProps => {
    return {
        type: TYPES.SET_MAIN_TAB_VALUE,
        payload: {
            mainTabValueStore,
        },
    };
}

export default {
    setSubMenuTabValue: setSubMenuTabValue,
    setMainTabValue: setMainTabValue,
};
