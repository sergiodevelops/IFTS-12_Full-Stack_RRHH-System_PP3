import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import useStyles from "./styles";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


// https://www.williamkurniawan.com/blog/building-a-simple-login-form-with-material-ui-and-react-hook-form


function Autenticacion() {
    // const { handleSubmit, register } = useForm();

    const classes = useStyles();
    const [existeUsuario, setExisteUsuario] = useState(true);

    // const onSubmit = handleSubmit((data) => {
    //     console.log(data);
    // });

    // const [state, setState] = React.useState({
    //     user: '',
    //     password: '',
    // });
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <form>
            {/*<form onSubmit={onSubmit}>*/}
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <h1 className={classes.titulo}>Iniciar sesión</h1>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                className={`user`}
                                fullWidth
                                // inputRef={register}
                                label="Usuario"
                                name="Usuario"
                                size="small"
                                variant="outlined"
                                onChange={(e) => setUser(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={`password`}
                                fullWidth
                                // inputRef={register}
                                label="Contraseña"
                                name="Contraseña"
                                size="small"
                                type="password"
                                variant="outlined"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button
                        color={"primary"}
                        fullWidth type="submit"
                        variant="contained"
                        disabled={!user || !password}
                    >
                        ingresar
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default Autenticacion;