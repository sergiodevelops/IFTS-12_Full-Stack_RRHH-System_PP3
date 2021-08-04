import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
    container: {
        padding: theme.spacing(3),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: '100%',
        '& .MuiInputBase-root':{
            minWidth: '100%',
        },
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },

}));
