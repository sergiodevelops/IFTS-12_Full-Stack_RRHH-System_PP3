import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
// import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import userActions from "@redux/actions/userActions";
import {RootState} from "@redux/reducers/allReducers";
import userTypes from "@web/constants/userTypes";
import MainTabs from "@web/components/MainTabs/MainTabs";
import layoutActions from "@redux/actions/layoutActions";
import SubMenuTabs from "@web/components/SubMenuTabs/SubMenuTabs";
import useStyles from "./styles";
import PieDePagina from "@components/PieDePagina/PieDePagina";
// import {useResizeDetector} from "react-resize-detector";


export default function DoubleSideBar() {

    const theme = useTheme();
    const classes = useStyles();
    // const onResize = useCallback(() => {
    // }, []);
    // const { ref, width, height } = useResizeDetector({ onResize });
    // useEffect(()=>{
    //     let newAppBarDimensions = {width: 600,height: 600};
    //     newAppBarDimensions = {
    //         ...newAppBarDimensions,
    //         width: width ? width: newAppBarDimensions.width,
    //         height: height ? height: newAppBarDimensions.height,
    //     };
    //     dispatch(layoutActions.setAppBarDimensions(newAppBarDimensions));
    // },[width, height])

    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.userReducers.currentUser);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const [openLeft, setOpenLeft] = React.useState(true);
    const [openRight, setOpenRight] = React.useState(true);
    const currentUserType = React.useState(userTypes.map(
        (userType) => {
            if (userType.id === currentUser?.tipo_usuario && !!userType.description) return (userType.description);
            return ("")
        }
    ));

    const [subMenuTabValue, setSubMenuTabValue] = React.useState("0");
    const drawerWidth = 240;

    interface AppBarProps extends MuiAppBarProps {
        openLeft?: boolean;
        openRight?: boolean;
    }

    const AppBar = styled(MuiAppBar, {
        // shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({theme, openLeft, openRight}) => ({
        left: 'auto',
        right: 'auto',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...((openLeft || openRight) && {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            width: `calc(100% - ${openLeft && openRight ? drawerWidth * 2 : drawerWidth}px)`,
        }),
        ...(openLeft ? {marginLeft: `${drawerWidth}px`} : {marginLeft: 0}),
        ...(openRight ? {marginRight: `${drawerWidth}px`} : {marginRight: 0}),
    }));

    const Main = styled('main', {
        // shouldForwardProp: (prop) => prop !== 'open'
    })<AppBarProps>(({theme, openLeft, openRight}) => ({
            flexGrow: 1,
            padding: theme.spacing(0),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            ...((openLeft || openRight) && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
            }),
            ...(openLeft ? {marginLeft: 0} : {marginLeft: `-${drawerWidth}px`}),
            ...(openRight ? {marginRight: 0} : {marginRight: `-${drawerWidth}px`}),
        }),
    );

    const DrawerHeaderLeft = styled('div')(({theme}) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const DrawerHeaderRight = styled('div')(({theme}) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    }));

    useEffect(() => {
        dispatch(layoutActions.setSubMenuTabValue(subMenuTabValue));
    }, [subMenuTabValue]);

    useEffect(() => {
        !openLeft && setOpenRight(false);
    }, [openLeft]);

    const handleClickMenu = (index: number) => {
        setSubMenuTabValue((index + 1).toString());
        dispatch(layoutActions.setMainTabValue(index > 0 ? '6' : '1'));
    };
    const handleLogOut = () => {
        handleClose();
        dispatch(userActions.setCurrentAuthenticatedUser(null));
    };
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDrawerOpenLeft = () => {
        setOpenLeft(true);
    };
    const handleDrawerCloseLeft = () => {
        setOpenLeft(false);
    };
    const handleDrawerOpenRight = () => {
        setOpenRight(true);
    };
    const handleDrawerCloseRight = () => {
        setOpenRight(false);
    };

    return (
        <Box className={classes.root}>
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                {/*<FormGroup>*/}
                {/*    <FormControlLabel*/}
                {/*        control={*/}
                {/*            <Switch*/}
                {/*                checked={currentUser}*/}
                {/*                onChange={handleChange}*/}
                {/*                aria-label="login switch"*/}
                {/*            />*/}
                {/*        }*/}
                {/*        label={currentUser ? 'Logout' : 'Login'}*/}
                {/*    />*/}
                {/*</FormGroup>*/}
                {/* BARRA AZUL DE ARRIBA*/}
                <AppBar
                    // ref={ref}
                    position="fixed"
                    openLeft={openLeft}
                    openRight={openRight}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpenLeft}
                            edge="start"
                            sx={{mr: 2, ...(openLeft && {display: 'none'})}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                                {currentUser?.nombre_completo} ({currentUserType})
                        </Typography>
                        {currentUser && (
                            <div>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle/>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    {/*<MenuItem onClick={handleClose}>Profile</MenuItem>*/}
                                    <MenuItem
                                        onClick={handleLogOut}>LogOut</MenuItem>
                                </Menu>
                            </div>
                        )}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpenRight}
                            edge="end"
                            sx={{ml: 2, ...((openRight || !openLeft) && {display: 'none'})}}
                        >
                            <MenuIcon/>
                        </IconButton>

                    </Toolbar>
                </AppBar>

                {/*Drawer IZQUIERDO*/}
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={openLeft}
                >
                    <DrawerHeaderLeft>
                        <IconButton onClick={handleDrawerCloseLeft}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon/> :
                                <ChevronRightIcon/>}
                        </IconButton>
                    </DrawerHeaderLeft>
                    <Divider/>
                    <div onClick={handleDrawerOpenRight}>
                        {
                            (currentUser?.tipo_usuario === 3 /*postulante*/) &&
                            <List>
                                {[
                                    'Datos Personales',
                                    'Experiencia',
                                    'Estudios formales',
                                    'Idiomas',
                                    'Conocimientos',
                                ].map((text: string/*, index: number*/) => (
                                    <ListItem button key={text}>
                                        {/*<ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>*/}
                                        <ListItemText primary={text}/>
                                    </ListItem>
                                ))}
                            </List>
                        }

                        {
                            (currentUser?.tipo_usuario === 1 || currentUser?.tipo_usuario === 2 /* administrativo (selector) o solicitante */) &&
                            <List>
                                {[
                                    'CONSULTAS',
                                    'ALTA',
                                ].map((text: string, index: number) => (
                                    <ListItem
                                        button
                                        key={`${text}-${index}`}
                                        onClick={() => handleClickMenu(index)}
                                    >
                                        {/*<ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>*/}
                                        <ListItemText primary={text}/>
                                    </ListItem>
                                ))}
                            </List>
                        }
                    </div>

                    {/*<Divider/>*/}
                    {/*<List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>*/}
                </Drawer>

                <Main style={{/*paddingBottom: '240px'*/}} openLeft={openLeft}
                      openRight={openRight}>
                    {/*header para cada drawer izq y der*/}
                    <DrawerHeaderLeft/>
                    <DrawerHeaderRight/>

                    {/*contenido del main*/}
                    <MainTabs/>
                </Main>

                {/*Drawer DERECHO*/}
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                        },
                    }}
                    variant="persistent"
                    anchor="right"
                    open={openRight}
                >
                    <DrawerHeaderRight>
                        <IconButton onClick={handleDrawerCloseRight}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon/> :
                                <ChevronRightIcon/>}
                        </IconButton>
                    </DrawerHeaderRight>
                    <Divider/>
                    <div>
                        <SubMenuTabs/>
                    </div>

                    {/*<List>*/}
                    {/*    {['Objetivo', 'Vision', 'Misión', 'Alcance'].map((text, index) => (*/}
                    {/*        <ListItem button key={text}>*/}
                    {/*            /!*<ListItemIcon>*!/*/}
                    {/*            /!*    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}*!/*/}
                    {/*            /!*</ListItemIcon>*!/*/}
                    {/*            <ListItemText primary={text}/>*/}
                    {/*        </ListItem>*/}
                    {/*    ))}*/}
                    {/*</List>*/}

                    {/*<Divider/>
                    <List>
                        {['All mail', 'Trash', 'Spam'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>*/}
                </Drawer>
            </Box>
            <PieDePagina {...{openLeft, openRight, drawerWidth}}/>
        </Box>
    );
}