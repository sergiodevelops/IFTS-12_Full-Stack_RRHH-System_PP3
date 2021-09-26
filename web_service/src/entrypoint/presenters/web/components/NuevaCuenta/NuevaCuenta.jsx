import React, {useEffect, useState} from 'react';
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
import allActions from "../../redux/actions";
import {useDispatch} from "react-redux";


// https://www.williamkurniawan.com/blog/building-a-simple-login-form-with-material-ui-and-react-hook-form


function NuevaCuenta() {
    const dispatch = useDispatch();
    // const { handleSubmit, register } = useForm();

    const classes = useStyles();
    // const [existeUsuario, setExisteUsuario] = useState(true);
    const userEmpty = {
        type: "",
        fullname: "",
        username: "",
        password: "",
    };
    const [newUser, setNewUser] = useState(userEmpty);
    const [password2, setPassword2] = useState("");


    // const onSubmit = handleSubmit((data) => {
    //     console.log(data);
    // });

    const handleClick = () => {
        dispatch(allActions.userActions.saveNewUser(newUser));
        setNewUser(userEmpty);
    };

    const userTypes = [
        'administrativo',
        'solicitante',
        'postulante',
    ];

    return (
        <form>
            {/*<form onSubmit={onSubmit}>*/}
            {/*<Grid container spacing={3}>*/}
            <Grid item xs={12}>
                <h1 className={classes.titulo}>Crea tu nueva cuenta</h1>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Autocomplete
                                className={`selectedUserType`}
                                autoComplete={"off"}
                                options={userTypes}
                                getOptionLabel={(option) => option}
                                value={newUser.type}
                                onChange={(event, newValue) => setNewUser({...newUser, type: newValue})}
                                style={{width: 300}}
                                renderInput={(params) =>
                                    <TextField
                                        {...params}
                                        error={!newUser.type}
                                        label="Seleccionar una opción"
                                        variant="outlined"
                                    />}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={`nombre`}
                            autoComplete={"off"}
                            fullWidth
                            // inputRef={register}
                            disabled={!newUser.type}
                            error={newUser.type && !newUser.fullname}
                            value={newUser.fullname}
                            onChange={(e) => setNewUser({...newUser, fullname: e.target.value})}
                            label="Nombre"
                            name="Nombre"
                            size="small"
                            type="text"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={`usuario`}
                            autoComplete={"off"}
                            fullWidth
                            // inputRef={register}
                            disabled={!newUser.fullname}
                            error={newUser.fullname && !newUser.username}
                            onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                            label="Usuario"
                            name="Usuario"
                            size="small"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={`password1`}
                            autoComplete={"off"}
                            fullWidth
                            // inputRef={register}
                            disabled={!newUser.username}
                            error={newUser.username && (!newUser.password || newUser.password !== password2)}
                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                            label="Contraseña"
                            name="Contraseña"
                            size="small"
                            type="password"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={`password2`}
                            autoComplete={"off"}
                            fullWidth
                            // inputRef={register}
                            disabled={!newUser.username}
                            error={newUser.username && (!newUser.password || newUser.password !== password2)}
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
                    <Button
                        color={"primary"}
                        fullWidth type="submit" variant="contained"
                        disabled={!newUser.type || !newUser.fullname || !newUser.username || !newUser.password || newUser.password !== password2}
                        onClick={handleClick}
                    >
                        crear cuenta
                    </Button>
                </Grid>
            </Grid>

            {/*</Grid>*/}
        </form>
    );
};

export default NuevaCuenta;