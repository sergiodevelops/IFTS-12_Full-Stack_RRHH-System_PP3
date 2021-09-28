import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useStyles from "./styles";
import Autenticacion from "../../components/Autenticacion/Autenticacion";
import NuevaCuenta from "../../components/NuevaCuenta/NuevaCuenta";
import {useSelector} from "react-redux";
import DoubleSideBar from "../../components/SideBar/DoubleSideBar";

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
    const userIsLoggedIn = useSelector(state => state.userReducers.sesionStatus);
    console.log("userIsLoggedIn",userIsLoggedIn)
    const [existeUsuario, setExisteUsuario] = useState(false);

    const handleClick = () => {
        setExisteUsuario(!existeUsuario)
    };

    useEffect(() => {
            setExisteUsuario(!userIsLoggedIn);
    }, [userIsLoggedIn]);

    return (
        <div>
            {
                userIsLoggedIn ?
                    <DoubleSideBar/> :
                    <Container className={classes.container} maxWidth="xs">
                        {existeUsuario ? <Autenticacion/> : <NuevaCuenta/>}
                        {!userIsLoggedIn && <SignInUpSwitch onClick={handleClick} existeUsuario={existeUsuario}/>}
                    </Container>
            }
        </div>
    );
};
