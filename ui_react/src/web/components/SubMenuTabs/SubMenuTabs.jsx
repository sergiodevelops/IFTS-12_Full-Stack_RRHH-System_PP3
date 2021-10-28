import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useDispatch, useSelector} from "react-redux";
import layoutActions from "../../redux/actions/layoutActions";
import List from '@mui/material/List';
import {ListItem, ListItemText, Tab} from "@material-ui/core";
import {TabList} from "@material-ui/lab";
import layoutReducers from "../../redux/reducers/layoutReducers";

export default function SubMenuTabs(){
    const dispatch = useDispatch();

    const subMenuTabValueStore = useSelector((state) => state.layoutReducers.subMenuTabValueStore);
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
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={subMenuTab}>
                {/*<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList aria-label="lab API tabs example">
                        <Tab label="Postulantes" value="0" />
                        <Tab label="Postulantes" value="1" />
                        <Tab label="Solicitantes" value="2" />
                    </TabList>
                </Box>*/}

                {/*SubMenues BIENVENIDO*/}
                <TabPanel value="0">
                    Bienvenido
                </TabPanel>

                {/*SubMenues de CONSULTAS*/}
                <TabPanel value="1">
                    <List>
                        {[
                            'CONSULTAS 1',
                            'CONSULTAS 2',
                            'CONSULTAS 3',
                            'CONSULTAS 4',
                        ].map((text, index) => (
                            <ListItem
                                button
                                key={`${text}-${index}`}
                                onClick={()=>setMainTabValue((index+1).toString())}                            >
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                </TabPanel>

                {/*SubMenues de ABM*/}
                <TabPanel value="2">
                    <List>
                        {[
                            'ABM 1',
                            'ABM 2',
                            'ABM 3',
                            'ABM 4',
                        ].map((text, index) => (
                            <ListItem
                                button
                                key={`${text}-${index}`}
                                onClick={()=>setMainTabValue((index+1).toString())}                            >
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                </TabPanel>
            </TabContext>
        </Box>
    );
}