import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import useStyles from "./styles";


export default function Autenticacion() {

    const classes = useStyles();
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);

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
                                autoComplete={"off"}
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
    );
};
