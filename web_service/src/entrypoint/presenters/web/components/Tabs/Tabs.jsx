import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import React, {useState} from 'react';
import Principal from "../../pages/Principal/Principal";
import NuevaCuenta from "../NuevaCuenta/NuevaCuenta";
import Autenticacion from "../Autenticacion/Autenticacion";


function Tabs(){
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Sign In" value="1" />
                        <Tab label="Sign Up" value="2" />
                    </TabList>
                </Box>

                <TabPanel value="1">
                    <Autenticacion/>
                </TabPanel>
                <TabPanel value="2">
                    <Principal/>
                </TabPanel>
                <TabPanel value="3">
                    <NuevaCuenta/>
                </TabPanel>

            </TabContext>
        </Box>
    );
}
export default Tabs;