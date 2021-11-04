import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {InputAdornment} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import Container from "@material-ui/core/Container";
import userActions from "../../redux/actions/userActions";
import userTypes from "../../constants/userTypes";
import UsuarioService from "../../services/UsuarioService";
import useStyles from "./styles";
import IUserCreateReqDto
    from "@application/usecases/user/create/IUserCreateReqDto";
import IUserUpdateReqDto
    from "@application/usecases/user/update/IUserUpdateReqDto";

export default function UserModDeleteForm(props: {
    registerFormTitle: string,
    currentQueryUser: IUserUpdateReqDto,
}) {
    const {registerFormTitle, currentQueryUser} = props;
    const usuarioService = new UsuarioService();

    const dispatch = useDispatch();
    // const usersListStore = useSelector((state) => state?.userReducers.usersList);
    const classes = useStyles();
    const emptyUserModify: IUserUpdateReqDto = {
        id: undefined,
        tipo_usuario: undefined,
        nombre_completo: undefined,
        username: undefined,
        password: undefined,
        fecha_alta: undefined,
    }
    const [replaceOrDeleteUser, setReplaceOrDeleteUser] = useState<IUserUpdateReqDto>(emptyUserModify);

    const [password2, setPassword2] = useState("");
    const [userExistInDB, setUserExistInDB] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    // const currentUserType = React.useState(userTypes.map((userType) => userType.id === currentQueryUser?.tipo_usuario && userType) || userTypes[0]);
    const currentUserType = userTypes.find(element => element.id === currentQueryUser?.tipo_usuario);

    const handleClickShowPassword1 = () => setShowPassword1(!showPassword1);
    const handleClickShowPassword2 = () => setShowPassword2(!showPassword2);

    const handleClickReplaceRow = async () => {
        let message;
        if (!replaceOrDeleteUser?.tipo_usuario ||
            !replaceOrDeleteUser.nombre_completo ||
            !replaceOrDeleteUser.username ||
            !replaceOrDeleteUser.password) {
            message = "Por favor complete los campos requeridos";
            alert(message);
            // store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
            return;
        }
        const userToReplace: IUserCreateReqDto = {
            tipo_usuario: replaceOrDeleteUser?.tipo_usuario, // mapeo para la base, envia un number
            nombre_completo: replaceOrDeleteUser?.nombre_completo,
            username: replaceOrDeleteUser?.username,
            password: replaceOrDeleteUser?.password,
        };

        usuarioService
            .replace(userToReplace)
            .then(createdUser => {
                console.log("createdUser en FE ", createdUser);
                dispatch(userActions.setCurrentAuthenticatedUser(createdUser));
                alert(`El usuario "${replaceOrDeleteUser.username}" se persistió correctamente`);
                // cleanInputValues();
            })
            .catch(err => {
                err.then((err: Error) => {
                        console.error("ERROR en FE", err.message);
                        alert(`${err.message}`);
                        setUserExistInDB(true);
                    }
                )
            });
    };

    const handleClickDeleteRow = async () => {
        let message;
        if (!replaceOrDeleteUser?.tipo_usuario ||
            !replaceOrDeleteUser?.nombre_completo ||
            !replaceOrDeleteUser?.username ||
            !replaceOrDeleteUser?.password) {
            message = "Por favor complete los campos requeridos";
            alert(message);
            // store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
            return;
        }
        const userToDelete: IUserCreateReqDto = {
            tipo_usuario: replaceOrDeleteUser?.tipo_usuario, // mapeo para la base, envia un number
            nombre_completo: replaceOrDeleteUser?.nombre_completo,
            username: replaceOrDeleteUser?.username,
            password: replaceOrDeleteUser?.password,
        };

        usuarioService
            .delete(userToDelete)
            .then(createdUser => {
                console.log("createdUser en FE ", createdUser);
                dispatch(userActions.setCurrentAuthenticatedUser(createdUser));
                alert(`El usuario "${replaceOrDeleteUser.username}" se persistió correctamente`);
                // cleanInputValues();
            })
            .catch(err => {
                err.then((err: Error) => {
                        console.error("ERROR en FE", err.message);
                        alert(`${err.message}`);
                        setUserExistInDB(true);
                    }
                )
            });
    };

    useEffect(() => {
        const newState = !!currentQueryUser ? currentQueryUser : emptyUserModify;
        setReplaceOrDeleteUser(newState);
    }, [currentQueryUser])


    return (
        <Container className={classes.container} maxWidth="xs">
            <Grid>
                <Grid item xs={12}>
                    <h1 className={classes.titulo}>{registerFormTitle}</h1>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl variant="outlined"
                                         className={classes.formControl}>
                                <Autocomplete
                                    className={`tipo_usuario`}
                                    disabled={!replaceOrDeleteUser}
                                    options={userTypes || []}
                                    getOptionLabel={(option) => option.description || ""}
                                    defaultValue={currentUserType ? currentUserType : userTypes[0]}
                                    onChange={(e: React.ChangeEvent<{}>, selectedOption) => setReplaceOrDeleteUser({
                                        ...replaceOrDeleteUser,
                                        tipo_usuario: selectedOption?.id || 0,
                                    })}
                                    style={{width: 300}}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            error={!replaceOrDeleteUser?.tipo_usuario}
                                            label="Seleccionar una opción"
                                            variant="outlined"
                                        />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={`nombre_completo`}
                                autoComplete={"off"}
                                fullWidth
                                disabled={!replaceOrDeleteUser?.tipo_usuario}
                                value={!!replaceOrDeleteUser?.tipo_usuario && replaceOrDeleteUser?.nombre_completo || ""}
                                error={!!replaceOrDeleteUser?.tipo_usuario && !replaceOrDeleteUser?.nombre_completo}
                                onChange={(e) => setReplaceOrDeleteUser({
                                    ...replaceOrDeleteUser,
                                    nombre_completo: e.target.value.toLowerCase()
                                })}
                                label="Nombres y apellidos"
                                name="nombre_completo"
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
                                disabled={!replaceOrDeleteUser?.nombre_completo}
                                value={!!replaceOrDeleteUser?.nombre_completo && replaceOrDeleteUser?.username || ""}
                                error={!!replaceOrDeleteUser?.nombre_completo && !replaceOrDeleteUser?.username || userExistInDB}
                                helperText={userExistInDB && "Este usuario ya existe, ingrese otro por favor"}
                                onChange={(e) => {
                                    setReplaceOrDeleteUser({
                                        ...replaceOrDeleteUser,
                                        username: e.target.value.toLowerCase()
                                    });
                                    setUserExistInDB(false);
                                }}
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
                                disabled={!replaceOrDeleteUser?.username}
                                value={!!replaceOrDeleteUser?.username && !!replaceOrDeleteUser?.password ? replaceOrDeleteUser.password : ""}
                                error={!!replaceOrDeleteUser?.username && (!replaceOrDeleteUser?.password || replaceOrDeleteUser?.password !== password2)}
                                label="Contraseña"
                                name="password1"
                                size="small"
                                variant="outlined"
                                onChange={(e) => setReplaceOrDeleteUser({
                                    ...replaceOrDeleteUser,
                                    password: e.target.value
                                })}
                                type={showPassword1 ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword1}
                                                disabled={!replaceOrDeleteUser?.username}
                                            >
                                                {showPassword1 ? <Visibility/> :
                                                    <VisibilityOff/>}
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
                                disabled={!replaceOrDeleteUser?.username}
                                value={replaceOrDeleteUser?.username && replaceOrDeleteUser?.password && password2 ? password2 : ""}
                                error={!!replaceOrDeleteUser?.username && (!replaceOrDeleteUser?.password || replaceOrDeleteUser?.password !== password2)}
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
                                                disabled={!replaceOrDeleteUser?.username}
                                            >
                                                {showPassword2 ? <Visibility/> :
                                                    <VisibilityOff/>}
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
                            disabled={!replaceOrDeleteUser?.tipo_usuario || !replaceOrDeleteUser?.nombre_completo || !replaceOrDeleteUser?.username || !replaceOrDeleteUser.password || replaceOrDeleteUser.password !== password2}
                            onClick={handleClickReplaceRow}
                        >
                            modificar
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color={"primary"}
                            fullWidth type="submit" variant="contained"
                            disabled={!replaceOrDeleteUser?.tipo_usuario || !replaceOrDeleteUser?.nombre_completo || !replaceOrDeleteUser?.username || !replaceOrDeleteUser?.password || replaceOrDeleteUser.password !== password2}
                            onClick={handleClickDeleteRow}
                        >
                            eliminar
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
