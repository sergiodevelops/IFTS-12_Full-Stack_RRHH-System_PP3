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

export default function MainTabs() {
    const mainTabValueStore = useSelector((state: RootState) => state.layoutReducers.mainTabValueStore);
    const currentUser = useSelector((state: RootState) => state?.userReducers.currentUser);
    const classes = useStyles();

    const [menuTab, setMenuTab] = useState("0");
    useEffect(() => {
        setMenuTab(mainTabValueStore);
    }, [mainTabValueStore]);

    return (
        <Box className={classes.root} sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={menuTab}>
                {
                    singlePageContentList
                        .map((content: ISinglePageContentDto, index: number) => {
                            return <TabPanel value={index.toString()}>
                                <Typography variant={"h6"} noWrap component={"div"} textAlign={'center'}>
                                    {index === 0 ? `${content.title} ${currentUser?.nombre_completo}!` : content.title}
                                </Typography>
                                <p>{content.body}</p>
                            </TabPanel>
                        })
                }
            </TabContext>
        </Box>
    );
}
