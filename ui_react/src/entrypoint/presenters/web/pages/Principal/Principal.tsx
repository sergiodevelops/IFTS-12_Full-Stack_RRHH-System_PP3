import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import UserAuthForm
    from '@components/UserAuthForm/UserAuthForm';
import UserLoginForm from '@components/UserLoginForm/UserLoginForm';
import DoubleSideBar from "../../components/DoubleSideBar/DoubleSideBar";
import PieDePagina from "../../components/PieDePagina/PieDePagina";
import {RootState} from "@redux/reducers/allReducers";
import {AuthLoginSwitch} from "@components/AuthLoginSwitch/AuthLoginSwitch";

export default function Principal() {
    const userIsLoggedIn: boolean = !!useSelector((state: RootState) => state?.userReducers.currentUser);
    // usuario esta logueado o no?
    const [sesionActiva, setSesionActiva] = useState<boolean>(userIsLoggedIn);
    // pantalla de login o de autenticación?
    const [authMode, setAuthMode] = useState<boolean>(true);

    const handleClick = () => {
        setAuthMode(!authMode)
    };

    useEffect(() => {
        setSesionActiva(userIsLoggedIn);
    }, [userIsLoggedIn]);

    return (
        <>
            {sesionActiva ?
                <DoubleSideBar/> :
                (<div>
                    {authMode ? <UserAuthForm/> : <UserLoginForm/>}
                    <div onClick={handleClick}>
                        <AuthLoginSwitch authMode={authMode}/>
                    </div>
                </div>)
            }
        </>
    );
};
