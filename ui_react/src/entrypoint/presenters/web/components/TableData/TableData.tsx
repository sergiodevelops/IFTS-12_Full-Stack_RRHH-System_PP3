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
import {useEffect, useRef, useState} from "react";
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
import useWindowDimensions from "@components/Hooks/useWindowDimensions";
import BasicModal from "@components/BasicModal/BasicModal";
import layoutActions from "@redux/actions/layoutActions";
import Typography from "@mui/material/Typography";
import ModalSpinner from "@components/ModalSpinner/ModalSpinner";
import Spinner from "@components/ModalSpinner/Spinner/Spinner";

export default function TableData() {
    const dispatch = useDispatch();

    const classes = useStyles();
    const queryNumber = useSelector((state: RootState) => state?.layoutReducers.mainTabValueStore);
    const {viewportHeight} = useWindowDimensions();
    const currentMainTabHeight = useSelector((state: RootState) => state.layoutReducers);
    const [minHeightTable, setMinHeightTable] = useState<number>(600);
    // const rowRef = useRef<HTMLDivElement>();

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
    const [queryInProgress, setQueryInProgress] = useState<boolean>(false);

    const getUsersByFilters = (
        pagination?: IPaginationSetDto,
        filters?: IFilterSetDto[],
    ) => {
        const usuarioService = new UsuarioService();
        setQueryInProgress(true);
        usuarioService
            .findAllByUserType(pagination, filters)
            .then((response: IUserFindResDto) => {
                console.log("response", response);
                const {users, totalPages, totalItems, currentPage} = response;
                if (!!users.length) {
                    setRows(users);
                    setTotalPages(totalPages);
                    setTotalItems(totalItems);
                    setCurrentPage(currentPage);
                }
                setQueryInProgress(false);
            })
            .catch((err: any) => {
                err.then((err: any) => {
                        console.error("ERROR en FE", err.message);
                    }
                );
                setQueryInProgress(false);
            });
    }
    const handleTableBodyRowClick = (row: any) => {
        setCurrentQueryUser(row);
        dispatch(layoutActions.setOpenModal(true));
    }
    const handleArrowChangePage = (intervalPage: number) => { // -5 , + 5 , +1 , -1
        const sumatoria = currentPage + intervalPage;
        const validateNewPage = (): boolean => {
            return (sumatoria >= 0 && sumatoria <= totalPages - 1) // dentro del rango valido? [0,lim]
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
            // CONSULTAS segun TAB VALUE (Administrativos)
            switch (queryNumber) {
                case '0':
                    //getUsersByFilters []
                    pagination = {size: 3, page: currentPage};
                    filters = [{key: 'tipo_usuario', value: '3'}]; //Postulantes
                    getUsersByFilters(pagination, filters);
                    break;
                case '1':
                    pagination = {size: 3, page: currentPage};
                    filters = [{key: 'tipo_usuario', value: '2'}]; //Solicitantes
                    getUsersByFilters(pagination, filters);
                    break;
                case '2':
                    pagination = {size: 3, page: currentPage};
                    filters = [{key: 'tipo_usuario', value: '1'}]; //Administrativos
                    getUsersByFilters(pagination, filters);
                    break;
                case '3':
                    // CONSULTA segun TAB VALUE (Solicitudes)
                    break;
                case '4':
                    // CONSULTA segun TAB VALUE (Solicitudes-Postulantes)
                    break;
                case '5':
                    // CONSULTA segun TAB VALUE (Solicitudes)
                    break;
                case '6':
                    // CONSULTA segun TAB VALUE (Datos)
                    break;
                case '7':
                    // CONSULTA segun TAB VALUE (Antecedentes)
                    break;
                default:
                    // default
                    setRows([]);
                    break;
            }
        }
    }, [currentPage]); // si cambio contenido de tabla se actualiza el mismo para mostrar en la tabla

    return (
        !!rows.length ? // si hay contenido para mostrar en la tabla
            (
                <Grid
                    container
                    className={`${classes.root}`}
                >
                    <Grid
                        className={`${classes.arrowChangeQueryPage}`}
                        onClick={() => handleArrowChangePage(-intervalPage)}
                        item xs={1}
                        style={{opacity: currentPage > 0 ? '1' : '0.3'}}
                    >
                        <ArrowLeftIcon
                            fontSize={'large'}
                            style={{color: currentPage > 0 ? '#e8ffe9' : '#2a77d20d'}}
                        />
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
                            key={`tableHeaderRow`}
                            container
                            className={classes.tableHeaderRow}
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
                                        >{cell.toUpperCase()}</Grid>)
                            }
                        </Grid>
                        {
                            rows
                                .map((row: IUserLoginResDto, index: number) => {
                                    return (
                                        <Grid
                                            // ref={rowRef}
                                            key={`tableBodyRow-${index}`}
                                            onClick={() => {handleTableBodyRowClick(row)}}
                                            container
                                            className={classes.tableBodyRow}
                                            style={{background: index % 2 == 0 ? '#b6b6b6' : '#eaeaea'}}
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
                        style={{opacity: currentPage < totalPages - 1 ? '1' : '0.3'}}
                    >
                        <ArrowRightIcon
                            fontSize={'large'}
                            style={{color: currentPage < totalPages - 1 ? '#b3b3b3' : '#2a77d20d'}}
                        />
                    </Grid>
                    {currentQueryUser &&
                    <BasicModal currentOriginalUser={currentQueryUser}/>}
                </Grid>
            ) :
            (
                queryInProgress ?
                    <Spinner style={{
                        minHeight: viewportHeight && minHeightTable ?
                            `${viewportHeight - minHeightTable - 64 * 2}px` :
                            '100vh'
                    }}/>
                    : <Grid
                        container
                        className={`${classes.containerMsgQueryResults}`}
                    >
                        <Typography
                            className={`${classes.msgQueryResults}`}
                            variant={"h5"}
                            component={"div"}
                            textAlign={'center'}
                            justifyContent={'center'}
                            alignItems={'center'}
                        >
                            No existe aun registros en la base para esta solicitud
                        </Typography>
                    </Grid>
            )
    );
}
