const setSubMenuTabValue = (newSubMenuTabValue) => {
    return {
        type:'SET_SUBMENU_TAB_VALUE',
        payload: {
            newSubMenuTabValue,
        },
    };
}
const setMainTabValue = (newMainTabValue) => {
    return {
        type:'SET_MAIN_TAB_VALUE',
        payload: {
            newMainTabValue,
        },
    };
}

export default {
    setSubMenuTabValue: setSubMenuTabValue,
    setMainTabValue: setMainTabValue,
};
