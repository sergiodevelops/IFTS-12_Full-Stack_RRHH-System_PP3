import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
// import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
// import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {useDispatch, useSelector} from "react-redux";
import {TabList} from "@material-ui/lab";
import {Tab} from "@material-ui/core";
// import layoutActions from "../../redux/actions/layoutActions";

export default function MainTabs() {
    const mainTabValueStore = useSelector((state) => state.layoutReducers.mainTabValueStore);
    const currentUser = useSelector((state) => state?.userReducers.currentUser);

    const [menuTab, setMenuTab] = useState("0");
    useEffect(() => {
        setMenuTab(mainTabValueStore);
    }, [mainTabValueStore]);

    return (
        <Box sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={menuTab}>
                {/*<Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList aria-label="lab API tabs example">
                        <Tab label="Postulantes" value="0"/>
                        <Tab label="Postulantes" value="1"/>
                        <Tab label="Solicitantes" value="2"/>
                        <Tab label="Solicitudes" value="3"/>
                        <Tab label="Postulantes" value="4"/>
                        <Tab label="Postulantes" value="5"/>
                        <Tab label="Solicitantes" value="6"/>
                    </TabList>
                </Box>*/}

                {/*BIENVENIDO section*/}
                <TabPanel value="0">
                    Bienvenido {currentUser?.userFullname}!
                </TabPanel>

                {/*CONSULTAS sections*/}
                <TabPanel value="1">
                    Sección [Administrativo | CONSULTAS | Postulantes]
                </TabPanel>
                <TabPanel value="2">
                    Sección [Administrativo | CONSULTAS | Solicitantes]
                </TabPanel>
                <TabPanel value="3">
                    Sección [Administrativo | CONSULTAS | Solicitudes]
                </TabPanel>
                <TabPanel value="4">
                    Sección [Administrativo | CONSULTAS | Solicitudes-Postulantes]
                </TabPanel>

                {/*ABM sections*/}
                <TabPanel value="5">
                    Sección [Administrativo | ABM | Solicitudes]
                </TabPanel>
                <TabPanel value="6">
                    Sección [Administrativo | ABM | Datos]
                </TabPanel>
                <TabPanel value="7">
                    Sección [Administrativo | ABM | Antecedentes]
                </TabPanel>

            </TabContext>
        </Box>
    );
}
