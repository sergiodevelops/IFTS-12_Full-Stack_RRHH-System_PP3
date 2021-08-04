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


const PaginaLogin = () => {
    // const { handleSubmit, register } = useForm();

    const classes = useStyles();
    const [existeUsuario, setExisteUsuario] = useState(true);
    // const onSubmit = handleSubmit((data) => {
    //     console.log(data);
    // });
    const [state, setState] = React.useState({
        age: '',
        name: 'hai',
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };
    const handleClick = (event) => {
        setExisteUsuario(false)
    };

    return (
        <Container className={classes.container} maxWidth="xs">
            <form>
                {/*<form onSubmit={onSubmit}>*/}
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {
                            existeUsuario ?
                                <h1>Autenticación de usuario</h1> :
                                <h1>Creación de cuenta</h1>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2}>
                            {
                                !existeUsuario &&
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <Grid item xs={12}>
                                        <InputLabel htmlFor="outlined-age-native-simple">Seleccionar una opción</InputLabel>
                                        <Select
                                            native
                                            value={state.tipoDeUsuario}
                                            onChange={handleChange}
                                            label="Age"
                                            inputProps={{
                                                name: 'age',
                                                id: 'outlined-age-native-simple',
                                            }}
                                        >
                                            <option aria-label="None" value=""/>
                                            <option value={10}>Administrativo</option>
                                            <option value={20}>Postulante</option>
                                            <option value={30}>Solicitante</option>
                                        </Select>
                                    </Grid>
                                </FormControl>
                            }
                            {
                                !existeUsuario &&
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        // inputRef={register}
                                        label="Nombre"
                                        name="Nombre"
                                        size="small"
                                        type="text"
                                        variant="outlined"
                                    />
                                </Grid>
                            }
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    // inputRef={register}
                                    label="Usuario"
                                    name="Usuario"
                                    size="small"
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    // inputRef={register}
                                    label="Contraseña"
                                    name="Contraseña"
                                    size="small"
                                    type="password"
                                    variant="outlined"
                                />
                            </Grid>
                            {
                                !existeUsuario &&
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        // inputRef={register}
                                        label="Confirmar contraseña"
                                        name="Confirmar contraseña"
                                        size="small"
                                        type="password"
                                        variant="outlined"
                                    />
                                </Grid>
                            }

                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            existeUsuario &&
                            <Button color="primary" fullWidth type="submit" variant="contained">
                                {existeUsuario ? <p>ingresar</p> : <p>registrar</p>}
                            </Button>
                        }
                        {
                            existeUsuario &&
                            <Button color="secondary" fullWidth type="submit" variant="contained" onClick={handleClick}>
                                crear una cuenta
                            </Button>
                        }
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default PaginaLogin;