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
import IUserUpdateReqDto
    from "@application/usecases/user/update/IUserUpdateReqDto";
import IUserLoginResDto
    from "@application/usecases/user/login/IUserLoginResDto";
import layoutActions from "@redux/actions/layoutActions";

export default function UserModDeleteForm(props: {
    registerFormTitle: string,
    currentQueryUser: IUserLoginResDto,
}) {
    const {registerFormTitle, currentQueryUser} = props;
    const usuarioService = new UsuarioService();

    const dispatch = useDispatch();
    // const usersListStore = useSelector((state) => state?.userReducers.usersList);
    const classes = useStyles();
    const emptyUserModify: any = {
        tipo_usuario: undefined,
        nombre_completo: undefined,
        username: undefined,
        password: undefined,
    }
    const [updateQueryUser, setUpdateQueryUser] = useState<IUserUpdateReqDto>(emptyUserModify);
    const [originalUser, setOriginalUser] = useState<IUserUpdateReqDto>(emptyUserModify);

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
        if (!updateQueryUser?.tipo_usuario ||
            !updateQueryUser.nombre_completo ||
            !updateQueryUser.username ||
            !updateQueryUser.password) {
            message = "Por favor complete los campos requeridos";
            alert(message);
            // store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
            return;
        }
        const userToReplace: IUserUpdateReqDto = {
            tipo_usuario: updateQueryUser?.tipo_usuario, // mapeo para la base, envia un number
            nombre_completo: updateQueryUser?.nombre_completo,
            username: updateQueryUser?.username,
            password: updateQueryUser?.password,
        };

        usuarioService
            .replace(userToReplace, currentQueryUser.id)
            .then(createdUser => {
                console.log("createdUser en FE ", createdUser);
                dispatch(userActions.setCurrentAuthenticatedUser(createdUser));
                alert(`El usuario "${updateQueryUser.username}" se persistió correctamente`);
                dispatch(layoutActions.setOpenModal(false));
            })
            .catch(err => {
                err.then((err: Error) => {
                        console.error("ERROR en FE", err.message);
                        alert(`${err.message}`);
                        setUserExistInDB(true);
                    dispatch(layoutActions.setOpenModal(false));
                    }
                )
            });
    };

    const handleClickDeleteRow = async () => {
        let message;
        if (!updateQueryUser?.tipo_usuario ||
            !updateQueryUser?.nombre_completo ||
            !updateQueryUser?.username ||
            !updateQueryUser?.password) {
            message = "Por favor complete los campos requeridos";
            alert(message);
            // store.dispatch(notifierActions.enqueueNotification(new Notification('error', 'Error', 'Por favor complete los campos requeridos')));
            return;
        }
        // const userToDelete: IUserCreateReqDto = {
        //     tipo_usuario: updateQueryUser?.tipo_usuario, // mapeo para la base, envia un number
        //     nombre_completo: updateQueryUser?.nombre_completo,
        //     username: updateQueryUser?.username,
        //     password: updateQueryUser?.password,
        // };

        usuarioService
            .delete(currentQueryUser.id)
            .then(createdUser => {
                console.log("createdUser en FE ", createdUser);
                dispatch(userActions.setCurrentAuthenticatedUser(createdUser));
                alert(`El usuario "${updateQueryUser.username}" se persistió correctamente`);
                dispatch(layoutActions.setOpenModal(false));
            })
            .catch(err => {
                err.then((err: Error) => {
                        console.error("ERROR en FE", err.message);
                        alert(`${err.message}`);
                        setUserExistInDB(true);
                    dispatch(layoutActions.setOpenModal(false));
                    }
                )
            });
    };

    useEffect(() => {
        setOriginalUser(currentQueryUser);
        const newState = !!currentQueryUser ? currentQueryUser : emptyUserModify;
        setUpdateQueryUser(newState);
        setPassword2(newState?.password || "");
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
                                    disabled={!updateQueryUser}
                                    options={userTypes || []}
                                    getOptionLabel={(option) => option.description || ""}
                                    defaultValue={currentUserType ? currentUserType : userTypes[0]}
                                    onChange={(e: React.ChangeEvent<{}>, selectedOption) => setUpdateQueryUser({
                                        ...updateQueryUser,
                                        tipo_usuario: selectedOption?.id || 0,
                                    })}
                                    style={{width: 300}}
                                    renderInput={(params) =>
                                        <TextField
                                            {...params}
                                            error={!updateQueryUser?.tipo_usuario}
                                            style={{background: updateQueryUser.tipo_usuario !== originalUser.tipo_usuario ? '#e8ffe9' : 'inherit'}}
                                            label="Seleccionar una opción"
                                            variant="outlined"
                                        />}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={`nombre_completo`}
                                style={{background: updateQueryUser.nombre_completo !== originalUser.nombre_completo ? '#e8ffe9' : 'inherit'}}
                                autoComplete={"off"}
                                fullWidth
                                disabled={!updateQueryUser?.tipo_usuario}
                                value={!!updateQueryUser?.tipo_usuario && updateQueryUser?.nombre_completo || ""}
                                error={!!updateQueryUser?.tipo_usuario && !updateQueryUser?.nombre_completo}
                                onChange={(e) => setUpdateQueryUser({
                                    ...updateQueryUser,
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
                                style={{background: updateQueryUser.username !== originalUser.username ? '#e8ffe9' : 'inherit'}}
                                autoComplete={"off"}
                                fullWidth
                                disabled={!updateQueryUser?.nombre_completo}
                                value={!!updateQueryUser?.nombre_completo && updateQueryUser?.username || ""}
                                error={!!updateQueryUser?.nombre_completo && !updateQueryUser?.username || userExistInDB}
                                helperText={userExistInDB && "Este usuario ya existe, ingrese otro por favor"}
                                onChange={(e) => {
                                    setUpdateQueryUser({
                                        ...updateQueryUser,
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
                                style={{background: updateQueryUser.password !== originalUser.password ? '#e8ffe9' : 'inherit'}}
                                autoComplete={"off"}
                                fullWidth
                                disabled={!updateQueryUser?.username}
                                value={!!updateQueryUser?.username && !!updateQueryUser?.password ? updateQueryUser.password : ""}
                                error={!!updateQueryUser?.username && (!updateQueryUser?.password || updateQueryUser?.password !== password2)}
                                label="Contraseña"
                                name="password1"
                                size="small"
                                variant="outlined"
                                onChange={(e) => setUpdateQueryUser({
                                    ...updateQueryUser,
                                    password: e.target.value
                                })}
                                type={showPassword1 ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword1}
                                                disabled={!updateQueryUser?.username}
                                            >
                                                {showPassword1 ? <Visibility/> :
                                                    <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} hidden={updateQueryUser.password === originalUser.password}>
                            <TextField
                                className={`password2`}
                                style={{
                                    background: updateQueryUser.tipo_usuario !== originalUser.tipo_usuario ? '#e8ffe9' : 'inherit'
                                }}
                                autoComplete={"off"}
                                fullWidth
                                disabled={!updateQueryUser?.username}
                                value={updateQueryUser?.username && updateQueryUser?.password && password2 ? password2 : ""}
                                error={!!updateQueryUser?.username && (!updateQueryUser?.password || updateQueryUser?.password !== password2)}
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
                                                disabled={!updateQueryUser?.username}
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
                            onClick={handleClickReplaceRow}
                            disabled={
                                !updateQueryUser?.tipo_usuario ||
                                updateQueryUser?.tipo_usuario !== updateQueryUser.tipo_usuario ||

                                !updateQueryUser?.nombre_completo ||
                                updateQueryUser?.nombre_completo !== updateQueryUser.nombre_completo ||

                                !updateQueryUser?.username ||
                                updateQueryUser?.username !== updateQueryUser.username ||

                                !updateQueryUser.password ||
                                updateQueryUser.password !== updateQueryUser.password ||

                                updateQueryUser.password !== password2
                            }
                        >
                            modificar
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color={"primary"}
                            fullWidth type="submit" variant="contained"
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
