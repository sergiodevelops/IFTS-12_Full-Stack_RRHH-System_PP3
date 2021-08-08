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
import Autocomplete from '@material-ui/lab/Autocomplete';


// https://www.williamkurniawan.com/blog/building-a-simple-login-form-with-material-ui-and-react-hook-form


function NuevaCuenta() {
    // const { handleSubmit, register } = useForm();

    const classes = useStyles();
    const [existeUsuario, setExisteUsuario] = useState(true);

    const [selectedUserType, setSelectedUserType] = useState(null);
    const [nombre, setNombre] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [password1, setPassword1] = useState(null);
    const [password2, setPassword2] = useState(null);

    // const onSubmit = handleSubmit((data) => {
    //     console.log(data);
    // });

    const handleClick = (event) => {
        setExisteUsuario(false)
    };

    const userTypes = [
        {title: 'Administrativo'},
        {title: 'Solicitante'},
        {title: 'Postulante'},
    ];

    return (
        <form>
            {/*<form onSubmit={onSubmit}>*/}
            {/*<Grid container spacing={3}>*/}
            <Grid item xs={12}>
                <h1>Crear nueva cuenta</h1>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Autocomplete
                                id="combo-box-demo"
                                options={userTypes}
                                getOptionLabel={(option) => option.title}
                                value={selectedUserType}
                                onChange={(event, newValue) => setSelectedUserType(newValue)}
                                style={{width: 300}}
                                renderInput={(params) => <TextField {...params} error={!selectedUserType}
                                                                    label="Seleccionar una opción" variant="outlined"/>}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            // inputRef={register}
                            value={nombre}
                            error={!nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            label="Nombre"
                            name="Nombre"
                            size="small"
                            type="text"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            // inputRef={register}
                            error={!usuario}
                            onChange={(e) => setUsuario(e.target.value)}
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
                            error={!password1 || password1 !== password2}
                            onChange={(e) => setPassword1(e.target.value)}
                            label="Contraseña"
                            name="Contraseña"
                            size="small"
                            type="password"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            // inputRef={register}
                            error={!password2 || password1 !== password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            label="Confirmar contraseña"
                            name="Confirmar contraseña"
                            size="small"
                            type="password"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Button color={"secondary"} fullWidth type="submit" variant="contained"
                            disabled={!selectedUserType || !nombre || !usuario || !password1 || !password1 || !(password1 === password2)}
                    >
                        {"crear cuenta"}
                    </Button>
                </Grid>
            </Grid>

            {/*</Grid>*/}
        </form>
    );
};

export default NuevaCuenta;