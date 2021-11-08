import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import UserLoginForm
    from '@components/Forms/UserLoginForm/UserLoginForm';
import UserAddForm from '@components/Forms/UserAddForm/UserAddForm';
import DoubleSideBar from "../DoubleSideBar/DoubleSideBar";
import Footer from "@components/Footer/Footer";
import {RootState} from "@redux/reducers/allReducers";
import {ActionButton} from "@components/ActionButton/ActionButton";
import userActions from "@redux/actions/userActions";
import layoutActions from "@redux/actions/layoutActions";
import UsuarioService from "@web/services/UsuarioService";
import IUserFindResDto from "@application/usecases/user/find/IUserFindResDto";

export default function Principal() {
    const userIsLoggedIn: boolean = !!useSelector((state: RootState) => state?.userReducers.currentUser);
    // usuario esta logueado o no?
    const [sesionActiva, setSesionActiva] = useState<boolean>(userIsLoggedIn);
    // pantalla de login o de autenticación?
    const [loginMode, setLoginMode] = useState<boolean>(true);
    const [foundAnyUserInDb, setFoundAnyUserInDb] = useState<boolean>(true);

    const usuarioService = new UsuarioService();
    const checkIfExistAnyUserInDb = async () => {
        usuarioService
            .findAllByUserType()
            .then((response: IUserFindResDto) => {
                console.log("checkIfExistAnyUserInDb", response);
                !!response.users.length ?
                    console.log("ya existe al menos 1 user") :
                    console.log("no existe ningun usuario crea uno");
                setFoundAnyUserInDb(!!response.users.length);
                setLoginMode(!!response.users.length);

            })
            .catch((err: any) => {
                err.then((err: any) => {
                        setLoginMode(false);
                        console.error("ERROR en FE", err.message);
                    }
                );
            });
    };

    const handleClick = () => {
        setLoginMode(!loginMode)
    };

    useEffect(() => {
        checkIfExistAnyUserInDb();
    }, [userIsLoggedIn])

    useEffect(() => {
        setSesionActiva(userIsLoggedIn);
    }, [userIsLoggedIn]);

    return (
        <div style={{minHeight: '100vh'}}>
            {sesionActiva ?
                <DoubleSideBar/> :
                <div>
                    {loginMode ?
                        <UserLoginForm/> :
                        <UserAddForm
                            registerFormTitle={"Crear una nueva cuenta"}/>}
                </div>
            }
        </div>
    );
};
