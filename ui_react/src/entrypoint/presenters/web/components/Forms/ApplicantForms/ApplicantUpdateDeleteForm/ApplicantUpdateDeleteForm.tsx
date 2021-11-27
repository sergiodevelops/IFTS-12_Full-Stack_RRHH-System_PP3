import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from "@material-ui/core/Container";
import UsuarioService from "../../../../services/UsuarioService";
import useStyles from "./styles";
import layoutActions from "@redux/actions/layoutActions";
import IApplicantCreateResDto
    from "@application/usecases/applicant/create/IApplicantCreateResDto";
import IApplicantCreateReqDto
    from "@application/usecases/applicant/create/IApplicantCreateReqDto";
import PostulanteService from "@web/services/PostulanteService";
// import { IsNumber, IsString, IsOptional, ValidateNested, IsNotEmpty, ArrayNotEmpty } from "class-validator";

export default function ApplicantUpdateDeleteForm(props: { row: IApplicantCreateResDto }) {

    const title = "Modificar o eliminar";
    const row = props;
    const {
        id,
        dni,
        apellido,
        nombres,
        tel,
        email,
    } = props.row as IApplicantCreateResDto;

    const usuarioService = new UsuarioService();

    const dispatch = useDispatch();
    // const applicantsListStore = useSelector((state) => state?.applicantReducers.applicantsList);
    const classes = useStyles();
    const emptyApplicantModify: IApplicantCreateReqDto = {
        dni: 0,
        apellido: "",
        nombres: "",
        tel: "",
        email: "",
    }

    const [updateQueryApplicant, setUpdateQueryApplicant] = useState<IApplicantCreateReqDto>(emptyApplicantModify);

    const [applicantExistInDB, setApplicantExistInDB] = useState(false);
    const [updateButtonDisable, setUpdateButtonDisable] = useState(false);

    const handleClickReplaceRow = async () => {
        const applicantToReplace: IApplicantCreateReqDto = {
            dni: updateQueryApplicant?.dni, // mapeo para la base, envia un number
            apellido: !!updateQueryApplicant?.apellido ? updateQueryApplicant?.apellido :  apellido,
            nombres: !!updateQueryApplicant?.nombres ? updateQueryApplicant?.nombres :  nombres,
            tel: updateQueryApplicant?.tel,
            email: updateQueryApplicant?.email,
        };
        const postulanteService = new PostulanteService();

        postulanteService
            .replace(applicantToReplace, id)
            .then(createdApplicant => {
                console.log("createdApplicant en FE ", createdApplicant);
                alert(`La información del postulante "${updateQueryApplicant.apellido}" se MODIFICÓ correctamente`);
                dispatch(layoutActions.setOpenModal(false));
            })
            .catch(err => {
                err.then((err: Error) => {
                        console.error("ERROR en FE", err.message);
                        alert(`${err.message}`);
                        setApplicantExistInDB(true);
                        dispatch(layoutActions.setOpenModal(false));
                    }
                )
            });
    };

    const handleClickDeleteRow = async () => {
        usuarioService
            .delete(id)
            .then(createdApplicant => {
                alert(`El usuario "${updateQueryApplicant.apellido}" se ELIMINÓ correctamente`);
                dispatch(layoutActions.setOpenModal(false));
            })
            .catch(err => {
                err.then((err: Error) => {
                        console.error("ERROR en FE", err.message);
                        alert(`${err.message}`);
                        setApplicantExistInDB(true);
                        dispatch(layoutActions.setOpenModal(false));
                    }
                )
            });
    };

    useEffect(() => {
        // !!currentOriginalApplicant && setOriginalApplicant(currentOriginalApplicant);
        setUpdateQueryApplicant({
            dni,
            apellido,
            nombres,
            tel,
            email,
        });
        // setPassword2("");
    }, [row])

    useEffect(() => {
        const originalAt = JSON.stringify({
            a: dni,
            b: apellido,
            c: nombres,
            d: tel,
            e: email,
        })
        const updateAt = JSON.stringify({
            a: updateQueryApplicant.dni,
            b: updateQueryApplicant.apellido,
            c: updateQueryApplicant.nombres,
            d: updateQueryApplicant.tel,
            e: updateQueryApplicant.email,

        });
        // const validateFieldsPass = (
        //     originalAt !==  updateAt ?
        //         (!!dni &&
        //             dni !== updateQueryApplicant.dni)
        //         ||
        //         (!!email &&
        //             email !== updateQueryApplicant.email)
        //         ||
        //         (!!tel && !!updateQueryApplicant.tel &&
        //             tel !== updateQueryApplicant.tel)
        //         ||
        //         (!!apellido && !!updateQueryApplicant.apellido &&
        //             apellido !== updateQueryApplicant.apellido)
        //         ||
        //         (!!nombres && !!updateQueryApplicant.nombres &&
        //             nombres !== updateQueryApplicant.nombres)
        //         :
        //         false
        // );
    }, [updateQueryApplicant, nombres])


    return (
        <Container className={classes.container} maxWidth="xs">
            <Grid>
                <Grid item xs={12}>
                    <h3 className={classes.titulo}>{title}</h3>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        {/*dni*/}
                        <Grid item xs={12}>
                            <TextField
                                className={`dni`}
                                style={{background: updateQueryApplicant.dni !== dni ? '#e8ffe9' : 'inherit'}}
                                autoComplete={"off"}
                                fullWidth
                                value={updateQueryApplicant?.dni || ""}
                                error={!updateQueryApplicant?.dni || applicantExistInDB}
                                helperText={applicantExistInDB && "Este usuario ya existe, ingrese otro por favor"}
                                onChange={(e) => {
                                    setUpdateQueryApplicant({
                                        ...updateQueryApplicant,
                                        dni:  parseInt(e.target.value),
                                    });
                                    setApplicantExistInDB(false);
                                }}
                                label="DNI"
                                name="dni"
                                size="small"
                                variant="outlined"
                            />
                        </Grid>

                        {/*apellido*/}
                        <Grid item xs={12}>
                            <TextField
                                className={`apellido`}
                                style={{background: updateQueryApplicant.apellido !== apellido ? '#e8ffe9' : 'inherit'}}
                                autoComplete={"off"}
                                fullWidth
                                disabled={!updateQueryApplicant?.nombres}
                                value={!!updateQueryApplicant?.nombres && updateQueryApplicant?.apellido || ""}
                                error={!!updateQueryApplicant?.nombres && !updateQueryApplicant?.apellido || applicantExistInDB}
                                helperText={applicantExistInDB && "Este usuario ya existe, ingrese otro por favor"}
                                onChange={(e) => {
                                    setUpdateQueryApplicant({
                                        ...updateQueryApplicant,
                                        apellido:  e.target.value === "" ? apellido : e.target.value.toLowerCase()
                                    });
                                    setApplicantExistInDB(false);
                                }}
                                label="Apellido"
                                name="apellido"
                                size="small"
                                variant="outlined"
                            />
                        </Grid>

                        {/*nombres*/}
                        <Grid item xs={12}>
                            <TextField
                                className={`nombres`}
                                style={{background: updateQueryApplicant.nombres !== nombres ? '#e8ffe9' : 'inherit'}}
                                autoComplete={"off"}
                                fullWidth
                                disabled={!updateQueryApplicant?.apellido}
                                value={!!updateQueryApplicant?.apellido && updateQueryApplicant?.nombres || ""}
                                error={!!updateQueryApplicant?.apellido && !updateQueryApplicant?.nombres || applicantExistInDB}
                                helperText={applicantExistInDB && "Este usuario ya existe, ingrese otro por favor"}
                                onChange={(e) => {
                                    setUpdateQueryApplicant({
                                        ...updateQueryApplicant,
                                        apellido:  e.target.value === "" ? apellido : e.target.value.toLowerCase()
                                    });
                                    setApplicantExistInDB(false);
                                }}
                                label="Nombres"
                                name="apellido"
                                size="small"
                                variant="outlined"
                            />
                        </Grid>

                        {/*tel*/}
                        <Grid item xs={12}>
                            <TextField
                                className={`tel`}
                                style={{background: updateQueryApplicant.tel !== tel ? '#e8ffe9' : 'inherit'}}
                                autoComplete={"off"}
                                fullWidth
                                disabled={!updateQueryApplicant?.nombres}
                                value={!!updateQueryApplicant?.nombres && updateQueryApplicant?.tel || ""}
                                error={!!updateQueryApplicant?.nombres && !updateQueryApplicant?.tel}
                                onChange={(e) => setUpdateQueryApplicant({
                                    ...updateQueryApplicant,
                                    tel: e.target.value === "" ? tel : e.target.value.toLowerCase()
                                })}
                                label="Teléfono"
                                name="email"
                                size="small"
                                type="text"
                                variant="outlined"
                            />
                        </Grid>

                        {/*email*/}
                        <Grid item xs={12}>
                            <TextField
                                className={`email`}
                                style={{background: updateQueryApplicant.email !== email ? '#e8ffe9' : 'inherit'}}
                                autoComplete={"off"}
                                fullWidth
                                disabled={!updateQueryApplicant?.tel}
                                value={!!updateQueryApplicant?.tel && updateQueryApplicant?.email || ""}
                                error={!!updateQueryApplicant?.tel && !updateQueryApplicant?.email}
                                onChange={(e) => setUpdateQueryApplicant({
                                    ...updateQueryApplicant,
                                    email: e.target.value === "" ? email : e.target.value.toLowerCase()
                                })}
                                label="Correo electrónico"
                                name="email"
                                size="small"
                                type="text"
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
                            onClick={handleClickReplaceRow}
                            disabled={updateButtonDisable}
                        >
                            modificar
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            color={"secondary"}
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
