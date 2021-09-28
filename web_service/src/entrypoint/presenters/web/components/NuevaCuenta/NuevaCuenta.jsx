import React, {useState} from 'react';
import {useDispatch,useSelector} from "react-redux";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import useStyles from "./styles";
import FormControl from '@material-ui/core/FormControl';
import Autocomplete from '@material-ui/lab/Autocomplete';
import allActions from "../../redux/actions";
import {userTypes} from '../../../../../constants/userTypes';
// import notificationActions from "../../redux/actions/notificationActions";


export default function NuevaCuenta() {
    const dispatch = useDispatch();
    const usersListStore = useSelector(state => state.userReducers.usersList);
    const classes = useStyles();
    const emptyUser = {
        type: "",
        fullname: "",
        username: "",
        password: "",
    };
    const [newUser, setNewUser] = useState(emptyUser);
    const [password2, setPassword2] = useState("");

    const cleanInputValues = () => {
        setNewUser(emptyUser);
        setPassword2("");
    }

    const handleClick = async () => {

        const userExist = await usersListStore && usersListStore.findIndex((user) =>
            user.username === newUser.username) !== -1; // si existe coincidencia;
        console.log("userExist", userExist)
        if (userExist) {
            const message = "El usuario ya existe, intente con un username diferente";
            // dispatch(notificationActions.enqueueMessage(message));
            console.log(message);
        }
        else {
            dispatch(allActions.userActions.saveNewUser(newUser));
            cleanInputValues();
        }
    };

    return (
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
                                onChange={(e, newVal) => setNewUser({...newUser, type: newVal?.toString().toLowerCase()})}
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
                            value={newUser.type && newUser.fullname ? newUser.fullname : "" && setNewUser({...newUser,username:""})}
                            error={newUser.type && !newUser.fullname}
                            onChange={(e) => setNewUser({...newUser, fullname: e.target.value.toLowerCase()})}
                            label="Nombres y apellidos"
                            name="userFullname"
                            size="small"
                            type="text"
                            variant="outlined"
                            // inputRef={register} // ??
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={`username`}
                            autoComplete={"off"}
                            fullWidth
                            disabled={!newUser.fullname}
                            value={newUser.fullname && newUser.username ? newUser.username : "" && setNewUser({...newUser,password:""})}
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
                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                            label="Contraseña"
                            name="password1"
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
                            disabled={!newUser.username}
                            value={newUser.username && newUser.password && password2 ? password2 : ""}
                            error={newUser.username && (!newUser.password || newUser.password !== password2)}
                            onChange={(e) => setPassword2(e.target.value)}
                            label="Confirmar contraseña"
                            name="password2"
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
        </Grid>
    );
};
