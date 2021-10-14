import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AutenticaUsuarioForm from '../../components/AutenticaUsuarioForm/AutenticaUsuarioForm';
import AltaUsuarioForm from '../../components/AltaUsuarioForm/AltaUsuarioForm';
import DoubleSideBar from "../../components/DoubleSideBar/DoubleSideBar";
import useStyles from "./styles";
import PieDePagina from "../../components/PieDePagina/PieDePagina";

function SignInUpSwitch(props, classes) {
    const {existeUsuario, onClick} = props;
    return (
        <Container className={classes.container} maxWidth="xs">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button color="secondary" fullWidth type="submit" variant="contained" onClick={onClick}>
                        {existeUsuario ? "crear nueva cuenta" : "volver"}
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default function Principal() {
    const classes = useStyles();

    const userIsLoggedIn = !!useSelector((state) => state?.userReducers.currentUser);
    const [sesionActiva, setSesionActiva] = useState(userIsLoggedIn || false);
    const [existeUsuario, setExisteUsuario] = useState(true);

    const handleClick = () => {
        setExisteUsuario(!existeUsuario)
    };

    useEffect(() => {
        //para que vuelva al login cuando se desloguee
        setExisteUsuario(true);
        setSesionActiva(userIsLoggedIn);
    }, [userIsLoggedIn]);

    return (
        <div className={`${classes.root}`}>
            <div className={`${classes.content}`}>
                <div>
                    {sesionActiva && <DoubleSideBar/>}
                    {!sesionActiva && (existeUsuario ? <AutenticaUsuarioForm/> : <AltaUsuarioForm/>)}
                    {!userIsLoggedIn && <SignInUpSwitch onClick={handleClick} existeUsuario={existeUsuario}/>}
                </div>
                <div>
                    {sesionActiva && <PieDePagina/>}
                </div>
            </div>
        </div>
    );
};
