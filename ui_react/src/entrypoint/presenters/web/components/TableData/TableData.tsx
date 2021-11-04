import * as React from 'react';
// import {alpha} from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
import {useEffect, useState} from "react";
// import {visuallyHidden} from '@mui/utils';
import UsuarioService from "@web/services/UsuarioService";
import IPaginationSetDto
    from "@application/usecases/pagination/set/IPaginationSetDto";
import IFilterSetDto from "@application/usecases/filter/add/IFilterSetDto";
import IUserFindResDto from "@application/usecases/user/find/IUserFindResDto";
import IUserLoginResDto
    from "@application/usecases/user/login/IUserLoginResDto";
import Grid from "@material-ui/core/Grid";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import useStyles from "@components/TableData/styles";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@redux/reducers/allReducers";
import useWindowDimensions from "@components/customHooks/useWindowDimensions";
import BasicModal from "@components/BasicModal/BasicModal";
import layoutActions from "@redux/actions/layoutActions";

export default function TableData(props: { valueTabQueryExec: string }) {
    const dispatch = useDispatch();

    const classes = useStyles();
    // const currentUser = useSelector((state: RootState) => state?.userReducers.currentUser);
    const {viewportHeight} = useWindowDimensions();
    const currentMainTabHeight = useSelector((state: RootState) => state.layoutReducers);
    const [minHeightTable, setMinHeightTable] = useState<number>(600);

    const {valueTabQueryExec} = props;
    // const [order, setOrder] = useState<Order>('asc');
    // const [orderBy, setOrderBy] = useState<string/*keyof Data*/>('calories');
    // const [selected, setSelected] = useState<readonly string[]>([]);
    // const [dense, setDense] = useState<boolean>(false);

    // const [headCells, setHeadCells] = useState<HeadCell[] | undefined>();
    const [rows, setRows] = useState<IUserLoginResDto[]>([]);
    const paginationDefault = {size: 1, page: -1};
    const [pagination, setPagination] = useState<IPaginationSetDto>(paginationDefault);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [arrowPage, setArrowPage] = useState<number>(0);
    const [intervalPage, setIntervalPage] = useState<number>(1);
    // const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);
    // const [filters, setFilters] = useState<IFilterSetDto[] | undefined>();
    const [currentQueryUser, setCurrentQueryUser] = useState<IUserLoginResDto | undefined>();

    const getUsersByFilters = (
        pagination?: IPaginationSetDto,
        filters?: IFilterSetDto[],
    ) => {
        const usuarioService = new UsuarioService();
        usuarioService.findAllByUserType(pagination, filters)
            .then((response: IUserFindResDto) => {
                console.log("response", response);
                const {users, totalPages, totalItems, currentPage} = response;
                if (!!users.length) {
                    setRows(users);
                    setTotalPages(totalPages);
                    console.log("totalPages", totalPages)
                    setTotalItems(totalItems);
                    setPagination({
                        size: users.length,
                        page: currentPage,
                    });
                }
            })
            .catch((err: any) => {
                err.then((err: any) => {
                        console.error("ERROR en FE", err.message);
                    }
                )
            });
    }
    const handleTableBodyRowClick = (row: any) => {
        console.log("registro click", row);
        setCurrentQueryUser(row);
        dispatch(layoutActions.setOpenModal(true));
    }
    const handleArrowChangePage = (intervalPage: number) => { // -5 , + 5 , +1 , -1
        const sumatoria = currentPage + intervalPage;
        const validateNewPage = (): boolean => {
            return (sumatoria >= 0 && sumatoria <= totalPages) // dentro del rango valido? [0,lim]
        };
        const calcNewPage = (): number => {
            if (!validateNewPage()) { // si se fue del rango poner al inicio o al final
                return (sumatoria < 0 ? 0 : totalPages);
            }
            return (sumatoria);
        };
        validateNewPage() && setCurrentPage(calcNewPage());
        console.log(
            "currentPageHook", currentPage,
            "intervalPage", intervalPage,
            "totalPages", totalPages,
            "validateNewPage?", validateNewPage(),
            "calcNewPage", calcNewPage()
        );
    };

    useEffect(() => {
        setMinHeightTable(currentMainTabHeight.footerDimensions.height - 64);
    }, [currentMainTabHeight])

    useEffect(() => {
        handleArrowChangePage(arrowPage); // si alguna flecha seteo el arrowPage
    }, [arrowPage])

    useEffect(() => {
        setCurrentPage(pagination.page);
    }, [pagination.page])

    useEffect(() => {
        if (currentPage !== pagination.page && currentPage >= 0) {
            let filters;
            let pagination;
            switch (valueTabQueryExec) {
                case '0':
                    // SP bienvenida !!
                    break;
                case '1':
                    // SP CONSULTAS (Postulantes)
                    pagination = {size: 3, page: currentPage };
                    filters = [{key: 'tipo_usuario', value: '3'}]; //Postulantes
                    getUsersByFilters(pagination, filters);
                    break;
                case '2':
                    // SP CONSULTAS (Solicitantes)
                    pagination = {size: 3, page: currentPage};
                    filters = [{key: 'tipo_usuario', value: '2'}]; //Solicitantes
                    getUsersByFilters(pagination, filters);
                    break;
                case '3':
                    // SP CONSULTAS (Administrativos)
                    pagination = {size: 3, page: currentPage};
                    filters = [{key: 'tipo_usuario', value: '1'}]; //Administrativos
                    getUsersByFilters(pagination, filters);
                    break;
                case '4':
                    // SP CONSULTAS (Solicitudes)

                    break;
                case '5':
                    // SP CONSULTAS (Solicitudes-Postulantes)

                    break;
                case '6':
                    // SP ABM (Solicitudes)

                    break;
                case '7':
                    // SP ABM (Datos)

                    break;
                case '8':
                    // SP ABM (Antecedentes)

                    break;
                default:
                    // default
                    setRows([]);
                    break;
            }
        }
    }, [currentPage]); // si cambio contenido de tabla se actualiza el mismo para mostrar en la tabla

    // const findAllUsers = (
    //     service: Function,
    //     pagination?: IPaginationSetDto,
    //     filters?: IFilterSetDto[]
    // ) => {
    //     service(pagination, filters)
    //         .then((response: IUserFindResDto) => {
    //             console.log("response", response);
    //             const {users, totalPages, totalItems, currentPage} = response;
    //             setRows(users);
    //             setTotalPages(totalPages.toString());
    //             setPagination({
    //                 size: totalItems.toString(),
    //                 page: currentPage.toString(),
    //             });
    //             setRowsPerPage(totalItems)
    //             setPage(currentPage);
    //         })
    //         .catch((err: any) => {
    //             console.log("err", err);
    //             err.then((err: any) => {
    //                     console.error("ERROR en FE", err.message);
    //                 }
    //             )
    //         });
    // }

    return (
        !!rows.length ? // si hay contenido para mostrar en la tabla
            <Grid container className={`${classes.root}`}>
                <Grid
                    className={`${classes.arrowChangeQueryPage}`}
                    onClick={() => handleArrowChangePage(-intervalPage)}
                    item xs={1}
                >
                    <ArrowLeftIcon fontSize={'large'}/>
                </Grid>

                <Grid
                    item xs={10}
                    style={{
                        minHeight: viewportHeight && minHeightTable ?
                            `${viewportHeight - minHeightTable - 64 * 2}px` :
                            '100vh'
                    }}
                    className={classes.queryTable}
                >
                    <Grid
                        key={`tableHeadRow`}
                        container
                        className={'tableHeadRow'}
                        style={{width: '100%', background: '#2a77d263'}}
                    >
                        {
                            Object
                                .keys(rows[0])
                                .map((cell: string, index: number) =>
                                    <Grid
                                        key={`tableHeadCell-${index}`}
                                        item
                                        style={{
                                            width: `${100 / Object.keys(rows[0]).length}%`,
                                        }}
                                        className={'tableHeadCell'}
                                    >{cell}</Grid>)
                        }
                    </Grid>

                    {
                        rows
                            .map((row: IUserLoginResDto, index: number) => {
                                return (
                                    <Grid
                                        key={`tableBodyRow-${index}`}
                                        onClick={() => {
                                            handleTableBodyRowClick(row)
                                        }}
                                        container
                                        className={'row'}
                                        style={{
                                            width: '100%',
                                            background: index % 2 == 0 ? '#b6b6b6' : '#eaeaea',
                                        }}
                                    >
                                        {Object
                                            .values(row)
                                            .map((cell: string, index: number) =>
                                                <Grid
                                                    key={`tableBodyCell-${index}`}
                                                    style={{width: `${100 / Object.keys(row).length}%`}}
                                                    className={'cell'}
                                                    item
                                                >{cell}</Grid>)}
                                    </Grid>
                                )
                            })
                    }
                </Grid>
                <Grid
                    className={`${classes.arrowChangeQueryPage}`}
                    onClick={() => handleArrowChangePage(+intervalPage)}
                    item xs={1}
                >
                    <ArrowRightIcon
                        onClick={() => setCurrentPage(currentPage - 1)}
                        fontSize={'large'}/>
                </Grid>
                {currentQueryUser &&
                <BasicModal currentQueryUser={currentQueryUser}/>}
            </Grid> : null
    );
}
