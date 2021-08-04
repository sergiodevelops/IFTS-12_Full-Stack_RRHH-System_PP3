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


// https://www.williamkurniawan.com/blog/building-a-simple-login-form-with-material-ui-and-react-hook-form

function Principal() {
    const [existeUsuario, setExisteUsuario] = useState(true);
    const classes = useStyles();
    const handleClick = (event) => {
        setExisteUsuario(false)
    };

    return (
        <Container className={classes.container} maxWidth="xs">
            {
                existeUsuario ? <Autenticacion/> : <NuevaCuenta/>
            }
            {
                existeUsuario &&
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Button color="secondary" fullWidth type="submit" variant="contained" onClick={handleClick}>
                            crear una cuenta
                        </Button>
                    </Grid>
                </Grid>
            }
        </Container>
    );
};

export default Principal;