import * as React from 'react';
import {alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import {useEffect, useState} from "react";
import {visuallyHidden} from '@mui/utils';
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
import ISinglePageContentDto
    from "@application/usecases/singlePage/list/ISinglePageContentDto";
import useWindowDimensions from "@components/customHooks/useWindowDimensions";
import BasicModal from "@components/BasicModal/BasicModal";
import layoutActions from "@redux/actions/layoutActions";
import userActions from "@redux/actions/userActions";


/*interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
}*/

/*function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
): Data {
    return {
        name,
        calories,
        fat,
        carbs,
        protein,
    };
}*/


// const rows =
// createData('Cupcake', 305, 3.7, 67, 4.3),
// createData('Donut', 452, 25.0, 51, 4.9),
// createData('Eclair', 262, 16.0, 24, 6.0),
// createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
// createData('Gingerbread', 356, 16.0, 49, 3.9),
// createData('Honeycomb', 408, 3.2, 87, 6.5),
// createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
// createData('Jelly Bean', 375, 0.0, 94, 0.0),
// createData('KitKat', 518, 26.0, 65, 7.0),
// createData('Lollipop', 392, 0.2, 98, 0.0),
// createData('Marshmallow', 318, 0, 81, 2.0),
// createData('Nougat', 360, 19.0, 9, 37.0),
// createData('Oreo', 437, 18.0, 63, 4.0),
// }

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array: IUserLoginResDto[], comparator: (a: any, b: any) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [IUserLoginResDto, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    // id: keyof Data;
    id: string;
    label: string;
    numeric: boolean;
}


// const headCells: readonly HeadCell[] = [
//     {
//         id: 'name',
//         numeric: false,
//         disablePadding: true,
//         label: 'Dessert (100g serving)',
//     },
//     {
//         id: 'calories',
//         numeric: true,
//         disablePadding: false,
//         label: 'Calories',
//     },
//     {
//         id: 'fat',
//         numeric: true,
//         disablePadding: false,
//         label: 'Fat (g)',
//     },
//     {
//         id: 'carbs',
//         numeric: true,
//         disablePadding: false,
//         label: 'Carbs (g)',
//     },
//     {
//         id: 'protein',
//         numeric: true,
//         disablePadding: false,
//         label: 'Protein (g)',
//     },
// ];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: string /*keyof Data*/) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    headCells: HeadCell[] | undefined;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
        headCells,
    } = props;
    const createSortHandler =
        (property: string/*keyof Data*/) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{
                            'aria-label': 'select all desserts',
                        }}
                    />
                </TableCell>
                {
                    headCells && headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span"
                                         style={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))
                }
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const {numSelected} = props;

    return (
        <Toolbar
            sx={{
                pl: {sm: 2},
                pr: {xs: 1, sm: 1},
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{flex: '1 1 100%'}}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Nutrition
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon/>
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

export default function TableData(props: { valueTabQueryExec: string }) {
    const dispatch = useDispatch();

    const classes = useStyles();
    const currentUser = useSelector((state: RootState) => state?.userReducers.currentUser);
    const {viewportHeight} = useWindowDimensions();
    const currentMainTabHeight = useSelector((state: RootState) => state.layoutReducers);
    const [minHeightTable, setMinHeightTable] = useState<number>(600);

    const {valueTabQueryExec} = props;
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<string/*keyof Data*/>('calories');
    const [selected, setSelected] = useState<readonly string[]>([]);
    const [dense, setDense] = useState<boolean>(false);

    const [headCells, setHeadCells] = useState<HeadCell[] | undefined>();
    const [rows, setRows] = useState<IUserLoginResDto[]>([]);
    const paginationDefault = {size: 1, page: -1};
    const [pagination, setPagination] = useState<IPaginationSetDto>(paginationDefault);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [arrowPage, setArrowPage] = useState<number>(0);
    const [intervalPage, setIntervalPage] = useState<number>(1);
    const [rowsPerPage, setRowsPerPage] = useState<number>(5);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [filters, setFilters] = useState<IFilterSetDto[] | undefined>();
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
                    const titles = Object.keys(users[0]);
                    const headCells = titles.map((title: string) => {
                        return {
                            id: title.toLowerCase().toString(),
                            numeric: false,
                            disablePadding: true,
                            label: title.toString(),
                        }
                    });

                    setHeadCells(headCells); // titulos header tabla columna  (header table)
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
                // console.log("err", err.message);
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

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: string/*keyof Data*/,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.nombre_completo);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        setSelected(newSelected);
    };
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
    const handleChangePage = (e: unknown, newPage: number) => {
        setCurrentPage(newPage);
    };
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
        setPagination({...pagination, page: 0})
    };
    const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDense(event.target.checked);
    };
    const isSelected = (name: string) => selected.indexOf(name) !== -1;
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = currentPage > 0 ? Math.max(0, (1 + currentPage) * rowsPerPage - rows.length) : 0;

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
                    pagination = {size: 2, page: currentPage };
                    // filters = [{key: 'tipo_usuario', value: '3'}];
                    getUsersByFilters(pagination, filters);
                    break;
                case '2':
                    // SP CONSULTAS (Solicitantes)
                    pagination = {size: 7, page: currentPage};
                    filters = [{key: 'tipo_usuario', value: '2'}];
                    getUsersByFilters(pagination, filters);
                    break;
                case '3':
                    // SP CONSULTAS (Solicitudes)

                    break;
                case '4':
                    // SP CONSULTAS (Solicitudes-Postulantes)

                    break;
                case '5':
                    // SP ABM (Solicitudes)

                    break;
                case '6':
                    // SP ABM (Datos)

                    break;
                case '7':
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
