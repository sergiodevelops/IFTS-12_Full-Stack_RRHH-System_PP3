import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@redux/reducers/allReducers";
import {useEffect} from "react";
import layoutActions from "@redux/actions/layoutActions";
import UserAuthForm from "@components/UserAuthForm/UserAuthForm";
import UserRegisterForm from "@components/UserRegisterForm/UserRegisterForm";
import UserModDeleteForm from "@components/UserModDeleteForm/UserModDeleteForm";
import IUserLoginResDto
    from "@application/usecases/user/login/IUserLoginResDto";
import IUserCreateReqDto
    from "@application/usecases/user/create/IUserCreateReqDto";
import IUserUpdateReqDto
    from "@application/usecases/user/update/IUserUpdateReqDto";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal(props:{currentQueryUser:IUserUpdateReqDto}) {
    const dispatch = useDispatch();
    const modalIsOpen = useSelector((state: RootState) => state?.layoutReducers.openModal);

    const [open, setOpen] = React.useState(false);
    const handleClose = () => dispatch(layoutActions.setOpenModal(false));

    useEffect(() => {
        setOpen(modalIsOpen);
    }, [modalIsOpen])

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <UserModDeleteForm registerFormTitle={"Modificar o eliminar"} {...props}/>
                </Box>
            </Modal>
        </div>
    );
}
