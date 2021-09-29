import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useStyles from "./styles";
import SignIn from "../../components/SignIn/SignIn";
import SignUp from "../../components/SignUp/SignUp";
import {useSelector} from "react-redux";
import DoubleSideBar from "../../components/DoubleSideBar/DoubleSideBar";

function SignInUpSwitch(props) {
    const {existeUsuario, onClick} = props;
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Button color="secondary" fullWidth type="submit" variant="contained" onClick={onClick}>
                    {existeUsuario ? "crear nueva cuenta" : "volver"}
                </Button>
            </Grid>
        </Grid>
    );
}

export default function Principal() {
    const classes = useStyles();

    const userIsLoggedIn = useSelector(state => state.userReducers.currentUser) ? true : false;
    console.log("userIsLoggedIn ", userIsLoggedIn)
    const [sesionActiva, setSesionActiva] = useState(userIsLoggedIn || false);
    const [existeUsuario, setExisteUsuario] = useState(true);

    const handleClick = () => {
        setExisteUsuario(!existeUsuario)
    };

    useEffect(() => {
        //para que vuelva al login cuando se desloguee
        setExisteUsuario(true);
        setSesionActiva(userIsLoggedIn);
        console.log("userIsLoggedIn", userIsLoggedIn);
    }, [userIsLoggedIn]);

    return (
        <div>
            {
                sesionActiva ?
                    <DoubleSideBar/> :
                    <Container className={classes.container} maxWidth="xs">
                        {existeUsuario ? <SignIn/> : <SignUp/>}
                        {!userIsLoggedIn && <SignInUpSwitch onClick={handleClick} existeUsuario={existeUsuario}/>}
                    </Container>
            }
        </div>
    );
};
