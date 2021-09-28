import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import useStyles from "./styles";
import {useDispatch, useSelector} from "react-redux";
import allActions from "../../redux/actions";
import {InputAdornment} from "@material-ui/core";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function Autenticacion() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const usersListStore = useSelector(state => state.userReducers.usersList);
    const [currentUser, setCurrentUser] = useState({username: "", password: ""});
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleClick = async () => {
        const authIsCorrect = await usersListStore && usersListStore.findIndex((user) =>
            user.username === currentUser.username &&
            user.password === currentUser.password ) !== -1; // si existe coincidencia;
        const cleanInputValues = () => {
            setCurrentUser({username: "", password: ""});
        }

        if (!authIsCorrect) {
            const message = "El usuario o contraseña son invalidos, intente nuevamente";
            // dispatch(notificationActions.enqueueMessage(message));
            alert(message);
        }else {
            cleanInputValues();
            dispatch(allActions.userActions.setUserAccountStatus(true));
        }
    };

    return (
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <h1 className={classes.titulo}>Iniciar sesión</h1>
                </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                className={`user`}
                                autoComplete={"off"}
                                fullWidth
                                value={currentUser.username}
                                label="Usuario"
                                name="Usuario"
                                size="small"
                                variant="outlined"
                                onChange={(e) => setCurrentUser({...currentUser, username: e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={`password`}
                                autoComplete={"off"}
                                fullWidth
                                value={currentUser.password}
                                label="Contraseña"
                                name="Contraseña"
                                size="small"
                                type={showPassword ? "text" : "password"}
                                variant="outlined"
                                onChange={(e) => setCurrentUser({...currentUser, password: e.target.value})}
                                InputProps={{ // <-- This is where the toggle button is added.
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                    </Grid>
                <Grid item xs={12}>
                    <Button
                        color={"primary"}
                        fullWidth type="submit"
                        variant="contained"
                        disabled={!currentUser.username || !currentUser.password}
                        onClick={handleClick}
                    >
                        ingresar
                    </Button>
                </Grid>
            </Grid>
    );
};
