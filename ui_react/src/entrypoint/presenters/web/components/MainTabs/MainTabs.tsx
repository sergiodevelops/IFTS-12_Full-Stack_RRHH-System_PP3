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
import Building from "@components/Building/Building";
import Grid from "@material-ui/core/Grid";
import UserRegisterForm from "@components/UserRegisterForm/UserRegisterForm";

export default function MainTabs(props: { isWelcomePage: boolean }) {
    const [isWelcomePage, setIsWelcomePage] = useState(props.isWelcomePage);
    const classes = useStyles();
    const mainTabValueStore = useSelector((state: RootState) => state.layoutReducers.mainTabValueStore);
    const [menuTab, setMenuTab] = useState("0");
    const currentUser = useSelector((state: RootState) => state?.userReducers.currentUser);

    useEffect(() => {
        if (menuTab !== mainTabValueStore) {
            setMenuTab(mainTabValueStore);
        }
    }, [mainTabValueStore]);

    function WelcomeUserTitle(props: { fullnameUserAuth?: string }) {
        return (
            <Grid>
                <Typography variant={"h5"}
                            noWrap
                            className={classes.welcomeTitle}
                            component={"div"}
                            textAlign={'center'}
                            color={'grey'}
                            marginY={'2vh'}
                >
                    Bienvenid@
                    <br/>
                    {props.fullnameUserAuth?.toUpperCase()}
                </Typography>
            </Grid>
        )
    }

    return (
        <Box
            className={classes.root}
            // sx={{width: '100%', typography: 'body1'}}
        >
            <TabContext value={menuTab}>
                {
                    isWelcomePage ?
                        <div>
                            <WelcomeUserTitle
                                fullnameUserAuth={currentUser?.nombre_completo}
                            />
                        </div> :
                        singlePageContentList
                            .map((content: ISinglePageContentDto, index: number) => {
                                return (
                                    <TabPanel
                                        className={classes.singlePageContentList}
                                        key={`singlePageContentList-${index}`}
                                        value={index.toString()}
                                    >
                                        {!!content.title &&
                                        <Typography variant={"h3"}
                                                    noWrap
                                                    className={classes.spaTitle}
                                                    component={"div"}
                                                    textAlign={'center'}
                                                    marginY={'2vh'}
                                        >
                                            {content.title}
                                        </Typography>}

                                        {content.moduleName === 'Building' &&
                                        <Building/>}

                                        {content.moduleName === 'TableData' &&
                                        <TableData/>}

                                        {content.moduleName === 'UserRegisterForm' &&
                                        <UserRegisterForm/>}
                                    </TabPanel>
                                )
                            })
                }
            </TabContext>
        </Box>
    );
}
