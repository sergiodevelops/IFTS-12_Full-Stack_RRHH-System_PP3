import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useStyles from "./styles";
import Autenticacion from "../../components/Autenticacion/Autenticacion";
import NuevaCuenta from "../../components/NuevaCuenta/NuevaCuenta";
import Tabs from "../../components/Tabs/Tabs";


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

function Principal() {
    const [existeUsuario, setExisteUsuario] = useState(true);
    const [sesionActivada, setSesionActivada] = useState(false);

    const classes = useStyles();
    const handleClick = (event) => {
        setExisteUsuario(!existeUsuario)
    };

    return (
        <Container className={classes.container} maxWidth="xs">
            {
                sesionActivada ?
                    (<Tabs/>) :
                    (existeUsuario ? <Autenticacion/> : <NuevaCuenta/>)
            }
            {
                // !sesionActivada &&
                <SignInUpSwitch onClick={handleClick} existeUsuario={existeUsuario}/>
            }
        </Container>
    );
};

export default Principal;
