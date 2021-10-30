import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { useSelector} from "react-redux";
import {RootState} from "../../redux/reducers/allReducers";

export default function MainTabs() {
    const mainTabValueStore = useSelector((state:RootState) => state.layoutReducers.mainTabValueStore);
    const currentUser = useSelector((state:RootState) => state?.userReducers.currentUser);

    const [menuTab, setMenuTab] = useState("0");
    useEffect(() => {
        setMenuTab(mainTabValueStore);
    }, [mainTabValueStore]);

    return (
        <Box sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={menuTab}>

                {/*BIENVENIDO section*/}
                <TabPanel value="0">
                    Bienvenido {currentUser?.nombre_completo}!
                </TabPanel>

                {/*CONSULTAS sections*/}
                <TabPanel value="1">
                    CONSULTAS | Postulantes
                </TabPanel>
                <TabPanel value="2">
                    CONSULTAS | Solicitantes
                </TabPanel>
                <TabPanel value="3">
                    CONSULTAS | Solicitudes
                </TabPanel>
                <TabPanel value="4">
                    CONSULTAS | Solicitudes-Postulantes
                </TabPanel>

                {/*ABM sections*/}
                <TabPanel value="5">
                    ABM | Solicitudes
                </TabPanel>
                <TabPanel value="6">
                    ABM | Datos
                </TabPanel>
                <TabPanel value="7">
                    ABM | Antecedentes
                </TabPanel>

            </TabContext>
        </Box>
    );
}
