import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import useStyles from "./styles";
import Autenticacion from "../../components/Autenticacion/Autenticacion";
import NuevaCuenta from "../../components/NuevaCuenta/NuevaCuenta";
// import Tabs from "../../components/Tabs/Tabs";
import MenuAppBar from "../../components/MenuAppBar/MenuAppBar";
import * as PropTypes from "prop-types";
import DoubleSideBar from "../../components/SideBar/DoubleSideBar";
// import {useDispatch} from "react-redux";
// import allActions from "../../redux/actions";


function SignInUpSwitch(props) {
    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <Button color="secondary" fullWidth type="submit" variant="contained" onClick={props.onClick}>
                {
                    props.existeUsuario ? "crear nueva cuenta" : "volver"
                }
            </Button>
        </Grid>
    </Grid>;
}

SignInUpSwitch.propTypes = {
    onClick: PropTypes.func,
    existeUsuario: PropTypes.bool
};

function Principal() {
    // const dispatch = useDispatch();

    const [existeUsuario, setExisteUsuario] = useState(true);
    const [sesionActivada, setSesionActivada] = useState(true);

    const classes = useStyles();
    const handleClick = (event) => {
        setExisteUsuario(!existeUsuario)
    };

    // useEffect(() => {
    //     dispatch(allActions.userActions.saveNewUser(
    //         {
    //             username: "administrativo",
    //             password: "1234",
    //             fullname: "Rodrigo Lopez (administrativo)",
    //             type: "administrativo",
    //         }
    //     ));
    // }, []);

    return (
        <div>
            {
                sesionActivada ?
                    (
                        <div>
                            {/*<MenuAppBar />*/}
                            <DoubleSideBar sesionActivada={sesionActivada}></DoubleSideBar>
                        </div>
                    ) :
                    (
                        <Container className={classes.container} maxWidth="xs">
                            {
                                (existeUsuario ? <Autenticacion/> : <NuevaCuenta/>)
                            }
                            {
                                !sesionActivada && <SignInUpSwitch onClick={handleClick} existeUsuario={existeUsuario}/>
                            }
                        </Container>
                    )
            }
        </div>
    );
};

export default Principal;
