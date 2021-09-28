import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useStyles from "./styles";
import Autenticacion from "../../components/Autenticacion/Autenticacion";
import NuevaCuenta from "../../components/NuevaCuenta/NuevaCuenta";
import * as PropTypes from "prop-types";
import DoubleSideBar from "../../components/SideBar/DoubleSideBar";
import {useSelector} from "react-redux";

function SignInUpSwitch(props) {
    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <Button color="secondary" fullWidth type="submit" variant="contained" onClick={props.onClick}>
                {props.existeUsuario ? "crear nueva cuenta" : "volver"}
            </Button>
        </Grid>
    </Grid>;
}

SignInUpSwitch.propTypes = {
    onClick: PropTypes.func,
    existeUsuario: PropTypes.bool
};

function Principal() {
    const classes = useStyles();
    const userIsLoggedIn = useSelector(state => state.userReducers.sesionStatus);
    const [existeUsuario, setExisteUsuario] = useState(true);

    const handleClick = (event) => {
        setExisteUsuario(!existeUsuario)
    };

    // useEffect(() => {
    // }, []);

    return (
        <div>
            {
                userIsLoggedIn ?
                    (
                        <div>
                            {/*<MenuAppBar />*/}
                            <DoubleSideBar/>
                        </div>
                    ) :
                    (
                        <Container className={classes.container} maxWidth="xs">
                            {
                                (existeUsuario ? <Autenticacion/> : <NuevaCuenta/>)
                            }
                            {
                                !userIsLoggedIn && <SignInUpSwitch onClick={handleClick} existeUsuario={existeUsuario}/>
                            }
                        </Container>
                    )
            }
        </div>
    );
};

export default Principal;
