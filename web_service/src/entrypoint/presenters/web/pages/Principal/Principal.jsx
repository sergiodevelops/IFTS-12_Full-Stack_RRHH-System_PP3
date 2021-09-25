import React, {useState} from 'react';
// import {useForm} from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
import useStyles from "./styles";
// import InputLabel from '@material-ui/core/InputLabel';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
import Autenticacion from "../../components/Autenticacion/Autenticacion";
import NuevaCuenta from "../../components/NuevaCuenta/NuevaCuenta";
import Tabs from "../../components/Tabs/Tabs";
import * as PropTypes from "prop-types";

// https://www.williamkurniawan.com/blog/building-a-simple-login-form-with-material-ui-and-react-hook-form

function SignInUpSwitch(props) {
    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <Button color="secondary" fullWidth type="submit" variant="contained" onClick={props.onClick}>
                {
                    props.existeUsuario ? "crear nueva cuenta" : "volver"
                }
            </Button>
        </Grid>
    </Grid>;
}

SignInUpSwitch.propTypes = {
    onClick: PropTypes.func,
    existeUsuario: PropTypes.bool
};

function Principal() {
    const [existeUsuario, setExisteUsuario] = useState(true);
    const [inicioSesion, setInicioSesion] = useState(false);
    const classes = useStyles();
    const handleClick = (event) => {
        setExisteUsuario(!existeUsuario)
    };

    return (
        <Container className={classes.container} maxWidth="xs">
            {
                inicioSesion ?
                    (<Tabs/>) :
                    (existeUsuario ?<Autenticacion/> : <NuevaCuenta/>)
            }
            {
                !inicioSesion && <SignInUpSwitch onClick={handleClick} existeUsuario={existeUsuario}/>
            }
        </Container>
    );
};

export default Principal;