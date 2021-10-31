import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useDispatch, useSelector} from "react-redux";
import layoutActions from "../../redux/actions/layoutActions";
import List from '@mui/material/List';
import {ListItem, ListItemText/*, Tab*/} from "@material-ui/core";
// import {TabList} from "@material-ui/lab";
// import layoutReducers from "../../redux/reducers/layoutReducers";
import {RootState} from "../../redux/reducers/allReducers";

export default function SubMenuTabs() {
    const dispatch = useDispatch();

    const subMenuTabValueStore = useSelector((state:RootState) => state.layoutReducers.subMenuTabValueStore);
    // const currentUser = useSelector((state) => state?.userReducers.currentUser);
    const [subMenuTab, setSubMenuTab] = useState("0");
    useEffect(() => {
        setSubMenuTab(subMenuTabValueStore);
    }, [subMenuTabValueStore]);

    const [mainTabValue, setMainTabValue] = React.useState("0");
    useEffect(() => {
        dispatch(layoutActions.setMainTabValue(mainTabValue))
    }, [mainTabValue]);

    return (
        <Box sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={subMenuTab}>

                {/*SubMenues BIENVENIDO*/}
                <TabPanel value="0">
                    {/*Bienvenido*/}
                </TabPanel>

                {/*SubMenues de CONSULTAS*/}
                <TabPanel value="1">
                    <List>
                        {[
                            'Postulantes',
                            'Solicitantes',
                            'Solicitudes',
                            'Solicitudes-Postulantes',
                        ].map((text, index) => (
                            <ListItem
                                button
                                key={`${text}-${index}`}
                                onClick={() => setMainTabValue((index + 1).toString())}>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                </TabPanel>

                {/*SubMenues de ABM*/}
                <TabPanel value="2">
                    <List>
                        {[
                            'Solicitudes',
                            'Datos',
                            'Antecedentes',
                        ].map((text, index) => (
                            <ListItem
                                button
                                key={`${text}-${index}`}
                                onClick={() => setMainTabValue((index + 5).toString())}
                            >
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                </TabPanel>
            </TabContext>
        </Box>
    );
}
