import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import allActions from "../../redux/actions";
import PieDePagina from "../PieDePagina/PieDePagina";
import * as PropTypes from "prop-types";

const drawerWidth = 240;
//functional component <AppBar/>
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, openLeft, openRight}) => ({
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
//functional component <Main/>
const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, openLeft, openRight}) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
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
//functional component <DrawerHeaderLeft/>
const DrawerHeaderLeft = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));
//functional component <DrawerHeaderRight/>
const DrawerHeaderRight = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    // ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

function Footer(props) {
    return null;
}

Footer.propTypes = {children: PropTypes.node};
export default function DoubleSideBar() {
    const theme = useTheme();

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.userReducers.currentUser);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openLeft, setOpenLeft] = React.useState(true);
    const [openRight, setOpenRight] = React.useState(true);

    const handleLogOut = () => {
        handleClose();
        dispatch(allActions.userActions.setCurrentAuthenticatedUser(null));
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    // controls LEFT drawer open close
    const handleDrawerOpenLeft = () => {
        setOpenLeft(true);
        // setOpenRight(true);
    };
    const handleDrawerCloseLeft = () => {
        setOpenLeft(false);
        // setOpenRight(false);
    };
    // controls RIGHT drawer open close
    const handleDrawerOpenRight = () => {
        setOpenRight(true);
    };
    const handleDrawerCloseRight = () => {
        setOpenRight(false);
    };

    return (
        <Box>

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
                <AppBar position="fixed" openLeft={openLeft} openRight={openRight}>
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
                            {currentUser?.fullname}
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
                                    <MenuItem
                                        onClick={handleLogOut}
                                    >
                                        LogOut
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpenRight}
                            edge="end"
                            sx={{ml: 2, ...(openRight && {display: 'none'})}}
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
                            {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </DrawerHeaderLeft>
                    <Divider/>

                    {
                        (currentUser?.type === "postulante") &&
                        <List>
                            {[
                                'Datos Personales',
                                'Experiencia',
                                'Estudios formales',
                                'Idiomas',
                                'Conocimientos',
                            ].map((text, index) => (
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
                        (currentUser?.type === "selector") &&
                        <List>
                            {[
                                'Ofertas',
                                'Solicitantes',
                                'Seleccionados',
                            ].map((text, index) => (
                                <ListItem button key={text}>
                                    {/*<ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}
                                </ListItemIcon>*/}
                                    <ListItemText primary={text}/>
                                </ListItem>
                            ))}
                        </List>
                    }

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
                <Main openLeft={openLeft} openRight={openRight} style={{paddingBottom: '150px'}}>
                    {/*separador para que el appBar no tape el main*/}
                    <DrawerHeaderLeft/>
                    <DrawerHeaderRight/>
                    {/*contenido del main*/}

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
                            {theme.direction === 'rtl' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </IconButton>
                    </DrawerHeaderRight>

                    {/*<Divider/>*/}
                    <List>
                        {['Objetivo', 'Vision', 'Misión', 'fafafa'].map((text, index) => (
                            <ListItem button key={text}>
                                {/*<ListItemIcon>*/}
                                {/*    {index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}*/}
                                {/*</ListItemIcon>*/}
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>

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
        </Box>
    );
}
