import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import {useSelector} from "react-redux";
import {RootState} from "@redux/reducers/allReducers";
import Typography from "@mui/material/Typography";
import {singlePageContentList} from "@web/constants/mainTabsContent";
import ISinglePageContentDto
    from "@application/usecases/singlePage/list/ISinglePageContentDto";
import useStyles from "./styles";
import TableData from "@components/TableData/TableData";

export default function MainTabs() {
    const mainTabValueStore = useSelector((state: RootState) => state.layoutReducers.mainTabValueStore);
    const classes = useStyles();

    const [menuTab, setMenuTab] = useState("0");
    const currentUser = useSelector((state: RootState) => state?.userReducers.currentUser);

    useEffect(() => {
        setMenuTab(mainTabValueStore);
    }, [mainTabValueStore]);

    return (
        <Box className={classes.root} sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={menuTab}>
                {
                    singlePageContentList
                        .map((content: ISinglePageContentDto, index: number) => {
                            return (
                                <TabPanel
                                    className={classes.singlePageContentList}
                                    key={`singlePageContentList-${index}`}
                                    value={index.toString()}
                                >
                                    <Typography variant={"h6"} noWrap
                                                component={"div"}
                                                textAlign={'center'}>
                                        {
                                            content.title === 'Bienvenido' ?
                                                `${content.title} ${currentUser?.nombre_completo}!` :
                                                content.title
                                        }
                                    </Typography>
                                    <p>{content.body}</p>
                                    <TableData valueTabQueryExec={menuTab}/>
                                </TabPanel>
                            )
                        })
                }
            </TabContext>
        </Box>
    );
}
