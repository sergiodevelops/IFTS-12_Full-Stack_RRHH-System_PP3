import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {InputAdornment} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import userActions from "../../redux/actions/userActions";
import {userTypes} from "../../constants/userTypes";
import useStyles from "./styles";
import Container from "@material-ui/core/Container";
import UsuarioService from "../../services/UsuarioService"

export default function SignUp() {
    const usuarioService = new UsuarioService();

    const dispatch = useDispatch();
    const usersListStore = useSelector((state) => state.userReducers.usersList);
    const classes = useStyles();
    const emptyUser = {
        type: "",
        fullname: "",
        username: "",
        password: "",
    };
    const [newUser, setNewUser] = useState(emptyUser);
    const [password2, setPassword2] = useState("");

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);
    const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);

    const cleanInputValues = () => {
        setNewUser(emptyUser);
        setPassword2("");
    }

    const handleClick = async () => {
        const userExist = await usersListStore && usersListStore.findIndex((user) =>
            user.username === newUser.username) !== -1;
        if (userExist) {
            const message = "El usuario ya existe, intente con un username diferente";
            // dispatch(notificationActions.enqueueMessage(message)); //TODO ver despues snackbar integration
            alert(message);
        } else {
            dispatch(userActions.addNewUser(newUser));
            dispatch(userActions.setCurrentAuthenticatedUser(newUser));
            cleanInputValues();
        }
    };

    const saveUser = async () => {
        let message;
        if (
            newUser.type === "" ||
            newUser.fullname === "" ||
            newUser.username === "" ||
            newUser.password === ""
        ) {
            message = "Por favor complete los campos requeridos";
            alert(message);
            // store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
            return;
        }

        const result = await usuarioService.create(newUser);

        if (result) {
            message = "Alta de alumno exitoso";
            alert(message);
            // store.dispatch(notifierActions.enqueueNotification(new Notification('success', 'Success', 'Alta de alumno exitoso')));
            // setTimeout(() => {
            //     window.location.href = '/#/users/create';
            // }, 5000);
        }
    };

    return (
        <Container className={classes.container} maxWidth="xs">
            <Grid>
                <Grid item xs={12}>
                    <h1 className={classes.titulo}>Crea tu nueva cuenta</h1>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <Autocomplete
                                    className={`userType`}
                                    autoComplete={"off"}
                                    options={userTypes}
                                    getOptionLabel={(option) => option}
                                    value={newUser.type ? newUser.type[0].toUpperCase() + newUser.type.toLowerCase().slice(1) : ""}
                                    onChange={(e, newVal) => setNewUser({
                                        ...newUser,
                                        type: newVal?.toString().toLowerCase()
                                    })}
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
                                className={`userFullname`}
                                autoComplete={"off"}
                                fullWidth
                                disabled={!newUser.type}
                                value={newUser.type && newUser.fullname ? newUser.fullname : "" && setNewUser({
                                    ...newUser,
                                    username: ""
                                })}
                                error={newUser.type && !newUser.fullname}
                                onChange={(e) => setNewUser({...newUser, fullname: e.target.value.toLowerCase()})}
                                label="Nombres y apellidos"
                                name="userFullname"
                                size="small"
                                type="text"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={`username`}
                                autoComplete={"off"}
                                fullWidth
                                disabled={!newUser.fullname}
                                value={newUser.fullname && newUser.username ? newUser.username : "" && setNewUser({
                                    ...newUser,
                                    password: ""
                                })}
                                error={newUser.fullname && !newUser.username}
                                onChange={(e) => setNewUser({...newUser, username: e.target.value.toLowerCase()})}
                                label="Usuario"
                                name="username"
                                size="small"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={`password`}
                                autoComplete={"off"}
                                fullWidth
                                disabled={!newUser.username}
                                value={newUser.username && newUser.password ? newUser.password : "" && setPassword2("")}
                                error={newUser.username && (!newUser.password || newUser.password !== password2)}
                                label="Contraseña"
                                name="password1"
                                size="small"
                                variant="outlined"
                                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                                type={showPassword1 ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword1}
                                                disabled={!newUser.username}
                                            >
                                                {showPassword1 ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={`password2`}
                                autoComplete={"off"}
                                fullWidth
                                disabled={!newUser.username}
                                value={newUser.username && newUser.password && password2 ? password2 : ""}
                                error={newUser.username && (!newUser.password || newUser.password !== password2)}
                                label="Confirmar contraseña"
                                name="password2"
                                size="small"
                                variant="outlined"
                                onChange={(e) => setPassword2(e.target.value)}
                                type={showPassword2 ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword2}
                                                disabled={!newUser.username}
                                            >
                                                {showPassword2 ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
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
                            onClick={saveUser}
                        >
                            crear cuenta
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
